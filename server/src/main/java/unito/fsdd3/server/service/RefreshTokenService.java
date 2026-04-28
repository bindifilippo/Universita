package unito.fsdd3.server.service;

import java.time.Instant;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import unito.fsdd3.server.model.RefreshToken;
import unito.fsdd3.server.model.User;
import unito.fsdd3.server.repository.RefreshTokenRepository;

@Service
public class RefreshTokenService {

    private final RefreshTokenRepository refreshTokenRepository;
    private final long refreshExpirationMs;

    public RefreshTokenService(
            RefreshTokenRepository refreshTokenRepository,
            @Value("${app.jwt.refresh-expiration-ms}") long refreshExpirationMs) {
        this.refreshTokenRepository = refreshTokenRepository;
        this.refreshExpirationMs = refreshExpirationMs;
    }

    public RefreshToken createRefreshToken(User user, String tokenValue) {
        Instant now = Instant.now();

        RefreshToken refreshToken = new RefreshToken(
                tokenValue,
                user,
                now,
                now.plusMillis(refreshExpirationMs),
                false
        );

        return refreshTokenRepository.save(refreshToken);
    }

    public Optional<RefreshToken> findByToken(String token) {
        return refreshTokenRepository.findByToken(token);
    }

    public boolean isUsable(RefreshToken token) {
        return !token.isRevoked() && token.getExpiresAt().isAfter(Instant.now());
    }

    public void revokeToken(RefreshToken token) {
        token.setRevoked(true);
        refreshTokenRepository.save(token);
    }

    public RefreshToken rotateToken(RefreshToken oldToken, String newTokenValue) {
        revokeToken(oldToken);
        return createRefreshToken(oldToken.getUser(), newTokenValue);
    }

    public Optional<RefreshToken> findByTokenWithUser(String token) {
        return refreshTokenRepository.findByTokenWithUser(token);
    }
}