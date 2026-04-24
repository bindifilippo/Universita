package unito.fsdd3.server.controllers;

import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import unito.fsdd3.server.dto.request.LoginRequest;
import unito.fsdd3.server.dto.response.LoginResponse;
import unito.fsdd3.server.model.User;
import unito.fsdd3.server.repository.UserRepository;
import unito.fsdd3.server.security.JwtService;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private static final String COOKIE_NAME = "auth_token";

    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final UserRepository userRepository;

    public AuthController(AuthenticationManager authenticationManager,
                          JwtService jwtService,
                          UserRepository userRepository) {
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
        this.userRepository = userRepository;
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

        String token = jwtService.generateToken(user.getUsername(), user.getRole().name());

        ResponseCookie cookie = ResponseCookie.from(COOKIE_NAME, token)
                .httpOnly(true)
                .secure(false) // in produzione: true con HTTPS
                .path("/")
                .sameSite("Lax")
                .maxAge(60 * 10)
                .build();

        LoginResponse response = new LoginResponse(
                user.getUsername(),
                user.getRole().name()
        );

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body(response);
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout() {
        ResponseCookie deleteCookie = ResponseCookie.from(COOKIE_NAME, "")
                .httpOnly(true)
                .secure(false) // in produzione: true con HTTPS
                .path("/")
                .sameSite("Lax")
                .maxAge(0)
                .build();

        return ResponseEntity.noContent()
                .header(HttpHeaders.SET_COOKIE, deleteCookie.toString())
                .build();
    }
}