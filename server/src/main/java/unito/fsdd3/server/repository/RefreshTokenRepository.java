package unito.fsdd3.server.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import unito.fsdd3.server.model.RefreshToken;
import unito.fsdd3.server.model.User;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Integer> {

    Optional<RefreshToken> findByToken(String token);

    @Query("""
        select rt
        from RefreshToken rt
        join fetch rt.user
        where rt.token = :token
    """)
    Optional<RefreshToken> findByTokenWithUser(@Param("token") String token);

    List<RefreshToken> findByUserAndRevokedFalse(User user);
}