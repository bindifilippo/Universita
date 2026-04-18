package unito.fsdd3.server.service;

import org.springframework.stereotype.Service;

import unito.fsdd3.server.model.Corso;
import unito.fsdd3.server.repository.CorsoRepository;

import java.util.List;
import java.util.Optional;

@Service
public class CorsoService {

    private final CorsoRepository corsoRepository;

    public CorsoService(CorsoRepository corsoRepository) {
        this.corsoRepository = corsoRepository;
    }

    public Corso creaCorso(Corso corso) {
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

    public Corso aggiornaCorso(Integer id, Corso corsoAggiornato) {
    Corso corsoEsistente = trovaCorsoPerId(id);

        if (corsoEsistente == null) {
            return null;
        }

        corsoEsistente.setTitolo(corsoAggiornato.getTitolo());
        corsoEsistente.setAnnoCreazione(corsoAggiornato.getAnnoCreazione());
        corsoEsistente.setLivello(corsoAggiornato.getLivello());
        corsoEsistente.setStato(corsoAggiornato.getStato());
        corsoEsistente.setDescrizione(corsoAggiornato.getDescrizione());

        return corsoRepository.save(corsoEsistente);
    }
}