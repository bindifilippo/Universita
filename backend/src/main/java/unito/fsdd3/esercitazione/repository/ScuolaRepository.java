package unito.fsdd3.esercitazione.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import unito.fsdd3.esercitazione.model.Scuola;

public interface ScuolaRepository extends JpaRepository<Scuola, Integer> {
}