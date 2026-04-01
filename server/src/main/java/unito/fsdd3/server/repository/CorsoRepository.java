// componente che parla con il database
package unito.fsdd3.server.repository;

//operazioni utili sul database
import org.springframework.data.jpa.repository.JpaRepository;

import unito.fsdd3.server.model.Corso;

//dichiarazione interfaccia/contratto
public interface CorsoRepository extends JpaRepository<Corso, Integer> {
}