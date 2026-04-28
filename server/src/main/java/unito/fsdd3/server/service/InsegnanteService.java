package unito.fsdd3.server.service;

import org.springframework.stereotype.Service;

import unito.fsdd3.server.model.Insegnante;
import unito.fsdd3.server.repository.InsegnanteRepository;

import java.util.List;
import java.util.Optional;

@Service
public class InsegnanteService {

    private final InsegnanteRepository insegnanteRepository;

    public InsegnanteService(InsegnanteRepository insegnanteRepository) {
        this.insegnanteRepository = insegnanteRepository;
    }

    public Insegnante creaInsegnante(Insegnante insegnante) {
        return insegnanteRepository.save(insegnante);
    }

    public List<Insegnante> trovaTuttiGliInsegnanti() {
        return insegnanteRepository.findAll();
    }

    public Insegnante trovaInsegnantePerId(Integer id) {
        Optional<Insegnante> insegnanteTrovato = insegnanteRepository.findById(id);
        return insegnanteTrovato.orElse(null);
    }

    public Insegnante aggiornaInsegnante(Integer id, Insegnante insegnanteAggiornato) {
        Insegnante insegnanteEsistente = trovaInsegnantePerId(id);

        if (insegnanteEsistente == null) {
            return null;
        }

        insegnanteEsistente.setNome(insegnanteAggiornato.getNome());
        insegnanteEsistente.setCognome(insegnanteAggiornato.getCognome());
        insegnanteEsistente.setEmail(insegnanteAggiornato.getEmail());

        return insegnanteRepository.save(insegnanteEsistente);
    }

    public void eliminaInsegnante(Integer id) {
        insegnanteRepository.deleteById(id);
    }
}