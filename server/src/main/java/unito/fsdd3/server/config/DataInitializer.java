package unito.fsdd3.server.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import unito.fsdd3.server.model.User;
import unito.fsdd3.server.repository.UserRepository;
import unito.fsdd3.server.security.Role;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner initUsers(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            if (!userRepository.existsByUsername("preside")) {
                userRepository.save(new User(
                        "preside",
                        passwordEncoder.encode("preside123"),
                        Role.ROLE_PRESIDE
                ));
            }

            if (!userRepository.existsByUsername("insegnante")) {
                userRepository.save(new User(
                        "insegnante",
                        passwordEncoder.encode("insegnante123"),
                        Role.ROLE_INSEGNANTE
                ));
            }

            if (!userRepository.existsByUsername("studente")) {
                userRepository.save(new User(
                        "studente",
                        passwordEncoder.encode("studente123"),
                        Role.ROLE_STUDENTE
                ));
            }
        };
    }
}