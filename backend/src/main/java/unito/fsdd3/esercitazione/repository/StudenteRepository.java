package unito.fsdd3.esercitazione.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import unito.fsdd3.esercitazione.model.Studente;

public interface StudenteRepository extends JpaRepository<Studente, Integer> {
}