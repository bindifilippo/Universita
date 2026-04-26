package unito.fsdd3.server.controllers;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import unito.fsdd3.server.dto.request.LoginRequest;
import unito.fsdd3.server.dto.response.LoginResponse;
import unito.fsdd3.server.dto.response.MeResponse;
import unito.fsdd3.server.model.RefreshToken;
import unito.fsdd3.server.model.User;
import unito.fsdd3.server.repository.UserRepository;
import unito.fsdd3.server.security.JwtService;
import unito.fsdd3.server.service.RefreshTokenService;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final UserRepository userRepository;
    private final RefreshTokenService refreshTokenService;

    private final String accessCookieName;
    private final String refreshCookieName;
    private final boolean cookieSecure;
    private final String cookieSameSite;
    private final String cookiePath;
    private final long accessCookieMaxAge;
    private final long refreshCookieMaxAge;

    public AuthController(
            AuthenticationManager authenticationManager,
            JwtService jwtService,
            UserRepository userRepository,
            RefreshTokenService refreshTokenService,
            @Value("${app.auth.access-cookie-name}") String accessCookieName,
            @Value("${app.auth.refresh-cookie-name}") String refreshCookieName,
            @Value("${app.auth.cookie-secure}") boolean cookieSecure,
            @Value("${app.auth.cookie-same-site}") String cookieSameSite,
            @Value("${app.auth.cookie-path}") String cookiePath,
            @Value("${app.auth.access-cookie-max-age}") long accessCookieMaxAge,
            @Value("${app.auth.refresh-cookie-max-age}") long refreshCookieMaxAge) {
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
        this.userRepository = userRepository;
        this.refreshTokenService = refreshTokenService;
        this.accessCookieName = accessCookieName;
        this.refreshCookieName = refreshCookieName;
        this.cookieSecure = cookieSecure;
        this.cookieSameSite = cookieSameSite;
        this.cookiePath = cookiePath;
        this.accessCookieMaxAge = accessCookieMaxAge;
        this.refreshCookieMaxAge = refreshCookieMaxAge;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()
                )
        );

        User user = userRepository.findByUsername(authentication.getName())
                .orElseThrow();

        String accessToken = jwtService.generateAccessToken(user.getUsername(), user.getRole().name());
        String refreshToken = jwtService.generateRefreshToken(user.getUsername());

        refreshTokenService.createRefreshToken(user, refreshToken);

        LoginResponse response = new LoginResponse(
                user.getUsername(),
                user.getRole().name()
        );

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, buildAccessCookie(accessToken).toString())
                .header(HttpHeaders.SET_COOKIE, buildRefreshCookie(refreshToken).toString())
                .body(response);
    }

    @PostMapping("/refresh")
    public ResponseEntity<Void> refresh(HttpServletRequest request) {
        String refreshTokenValue = readCookieValue(request, refreshCookieName);

        if (refreshTokenValue == null || refreshTokenValue.isBlank()) {
            return unauthorizedAndClearCookies();
        }

        RefreshToken storedToken = refreshTokenService.findByToken(refreshTokenValue)
                .orElse(null);

        if (storedToken == null) {
            return unauthorizedAndClearCookies();
        }

        if (!refreshTokenService.isUsable(storedToken)) {
            return unauthorizedAndClearCookies();
        }

        if (!jwtService.isTokenValid(refreshTokenValue)) {
            refreshTokenService.revokeToken(storedToken);
            return unauthorizedAndClearCookies();
        }

        if (!jwtService.isRefreshToken(refreshTokenValue)) {
            refreshTokenService.revokeToken(storedToken);
            return unauthorizedAndClearCookies();
        }

        String username = jwtService.extractUsername(refreshTokenValue);

        if (!storedToken.getUser().getUsername().equals(username)) {
            refreshTokenService.revokeToken(storedToken);
            return unauthorizedAndClearCookies();
        }

        User user = storedToken.getUser();

        String newAccessToken = jwtService.generateAccessToken(user.getUsername(), user.getRole().name());
        String newRefreshToken = jwtService.generateRefreshToken(user.getUsername());

        refreshTokenService.rotateToken(storedToken, newRefreshToken);

        return ResponseEntity.noContent()
                .header(HttpHeaders.SET_COOKIE, buildAccessCookie(newAccessToken).toString())
                .header(HttpHeaders.SET_COOKIE, buildRefreshCookie(newRefreshToken).toString())
                .build();
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout(HttpServletRequest request) {
        String refreshTokenValue = readCookieValue(request, refreshCookieName);

        if (refreshTokenValue != null && !refreshTokenValue.isBlank()) {
            refreshTokenService.findByToken(refreshTokenValue)
                    .ifPresent(refreshTokenService::revokeToken);
        }

        return ResponseEntity.noContent()
                .header(HttpHeaders.SET_COOKIE, buildDeleteAccessCookie().toString())
                .header(HttpHeaders.SET_COOKIE, buildDeleteRefreshCookie().toString())
                .build();
    }

    @GetMapping("/me")
    public ResponseEntity<MeResponse> me(Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        User user = userRepository.findByUsername(authentication.getName())
                .orElseThrow();

        MeResponse response = new MeResponse(
                user.getUsername(),
                user.getRole().name()
        );

        return ResponseEntity.ok(response);
    }

    private ResponseCookie buildAccessCookie(String token) {
        return ResponseCookie.from(accessCookieName, token)
                .httpOnly(true)
                .secure(cookieSecure)
                .path(cookiePath)
                .sameSite(cookieSameSite)
                .maxAge(accessCookieMaxAge)
                .build();
    }

    private ResponseCookie buildRefreshCookie(String token) {
        return ResponseCookie.from(refreshCookieName, token)
                .httpOnly(true)
                .secure(cookieSecure)
                .path(cookiePath)
                .sameSite(cookieSameSite)
                .maxAge(refreshCookieMaxAge)
                .build();
    }

    private ResponseCookie buildDeleteAccessCookie() {
        return ResponseCookie.from(accessCookieName, "")
                .httpOnly(true)
                .secure(cookieSecure)
                .path(cookiePath)
                .sameSite(cookieSameSite)
                .maxAge(0)
                .build();
    }

    private ResponseCookie buildDeleteRefreshCookie() {
        return ResponseCookie.from(refreshCookieName, "")
                .httpOnly(true)
                .secure(cookieSecure)
                .path(cookiePath)
                .sameSite(cookieSameSite)
                .maxAge(0)
                .build();
    }

    private String readCookieValue(HttpServletRequest request, String cookieName) {
        Cookie[] cookies = request.getCookies();

        if (cookies == null) {
            return null;
        }

        for (Cookie cookie : cookies) {
            if (cookieName.equals(cookie.getName())) {
                return cookie.getValue();
            }
        }

        return null;
    }

    private ResponseEntity<Void> unauthorizedAndClearCookies() {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .header(HttpHeaders.SET_COOKIE, buildDeleteAccessCookie().toString())
                .header(HttpHeaders.SET_COOKIE, buildDeleteRefreshCookie().toString())
                .build();
    }
}