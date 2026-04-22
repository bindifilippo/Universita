package unito.fsdd3.server.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import unito.fsdd3.server.model.User;

public interface UserRepository extends JpaRepository<User, Integer> {

    Optional<User> findByUsername(String username);

    boolean existsByUsername(String username);
}