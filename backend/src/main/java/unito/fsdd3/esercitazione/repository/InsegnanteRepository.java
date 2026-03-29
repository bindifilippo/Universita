package unito.fsdd3.esercitazione.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import unito.fsdd3.esercitazione.model.Insegnante;

public interface InsegnanteRepository extends JpaRepository<Insegnante, Integer> { 
}
