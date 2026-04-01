package unito.fsdd3.server.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import unito.fsdd3.server.model.Insegnante;

public interface InsegnanteRepository extends JpaRepository<Insegnante, Integer> { 
}
