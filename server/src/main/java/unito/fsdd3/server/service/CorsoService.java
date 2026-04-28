package unito.fsdd3.server.service;

import org.springframework.stereotype.Service;

import unito.fsdd3.server.model.Corso;
import unito.fsdd3.server.model.Insegnante;
import unito.fsdd3.server.repository.CorsoRepository;
import unito.fsdd3.server.repository.InsegnanteRepository;

import java.util.List;
import java.util.Optional;

@Service
public class CorsoService {

    private final CorsoRepository corsoRepository;
    private final InsegnanteRepository insegnanteRepository;

    public CorsoService(
            CorsoRepository corsoRepository,
            InsegnanteRepository insegnanteRepository) {
        this.corsoRepository = corsoRepository;
        this.insegnanteRepository = insegnanteRepository;
    }

    public Corso creaCorso(Corso corso, Integer insegnanteId) {
        if (insegnanteId != null) {
            Insegnante insegnante = insegnanteRepository.findById(insegnanteId)
                    .orElseThrow(() -> new RuntimeException("Insegnante non trovato"));

            corso.setInsegnante(insegnante);
        }

        return corsoRepository.save(corso);
    }

    public List<Corso> trovaTuttiICorsi() {
        return corsoRepository.findAll();
    }

    public Corso trovaCorsoPerId(Integer id) {
        Optional<Corso> corsoTrovato = corsoRepository.findById(id);
        return corsoTrovato.orElse(null);
    }

    public void eliminaCorso(Integer id) {
        corsoRepository.deleteById(id);
    }

    public Corso aggiornaCorso(Integer id, Corso corsoAggiornato, Integer insegnanteId) {
        Corso corsoEsistente = trovaCorsoPerId(id);

        if (corsoEsistente == null) {
            return null;
        }

        corsoEsistente.setTitolo(corsoAggiornato.getTitolo());
        corsoEsistente.setAnnoCreazione(corsoAggiornato.getAnnoCreazione());
        corsoEsistente.setLivello(corsoAggiornato.getLivello());
        corsoEsistente.setStato(corsoAggiornato.getStato());
        corsoEsistente.setDescrizione(corsoAggiornato.getDescrizione());

        if (insegnanteId != null) {
            Insegnante insegnante = insegnanteRepository.findById(insegnanteId)
                    .orElseThrow(() -> new RuntimeException("Insegnante non trovato"));

            corsoEsistente.setInsegnante(insegnante);
        }

        return corsoRepository.save(corsoEsistente);
    }
}