package unito.fsdd3.server.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import unito.fsdd3.server.model.Studente;

public interface StudenteRepository extends JpaRepository<Studente, Integer> {
}