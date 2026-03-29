// componente che parla con il database
package unito.fsdd3.esercitazione.repository;

//operazioni utili sul database
import org.springframework.data.jpa.repository.JpaRepository;
//il repository deve sapere su quale entità lavora
import unito.fsdd3.esercitazione.model.Corso;

//dichiarazione interfaccia/contratto
public interface CorsoRepository extends JpaRepository<Corso, Integer> {
}