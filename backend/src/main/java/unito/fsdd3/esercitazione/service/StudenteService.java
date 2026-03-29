package unito.fsdd3.esercitazione.service;

import org.springframework.stereotype.Service;
import unito.fsdd3.esercitazione.model.Studente;
import unito.fsdd3.esercitazione.repository.StudenteRepository;

import java.util.List;
import java.util.Optional;

@Service
public class StudenteService {

    private final StudenteRepository studenteRepository;

    public StudenteService(StudenteRepository studenteRepository) {
        this.studenteRepository = studenteRepository;
    }

    public Studente creaStudente(Studente studente) {
        return studenteRepository.save(studente);
    }

    public List<Studente> trovaTuttiGliStudenti() {
        return studenteRepository.findAll();
    }

    public Studente trovaStudentePerId(Integer id) {
        Optional<Studente> studenteTrovato = studenteRepository.findById(id);
        return studenteTrovato.orElse(null);
    }

    public Studente aggiornaStudente(Integer id, Studente studenteAggiornato) {
        Studente studenteEsistente = trovaStudentePerId(id);

        if (studenteEsistente == null) {
            return null;
        }

        studenteEsistente.setNome(studenteAggiornato.getNome());
        studenteEsistente.setCognome(studenteAggiornato.getCognome());
        studenteEsistente.setGenere(studenteAggiornato.getGenere());

        return studenteRepository.save(studenteEsistente);
    }

    public void eliminaStudente(Integer id) {
        studenteRepository.deleteById(id);
    }
}