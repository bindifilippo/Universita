package unito.fsdd3.esercitazione.controllers;

import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import unito.fsdd3.esercitazione.dto.request.StudenteRequest;
import unito.fsdd3.esercitazione.dto.response.StudenteResponse;
import unito.fsdd3.esercitazione.model.Studente;
import unito.fsdd3.esercitazione.service.StudenteService;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/studenti")
public class StudenteController {

    private final StudenteService studenteService;

    public StudenteController(StudenteService studenteService) {
        this.studenteService = studenteService;
    }

    @PostMapping
    public ResponseEntity<StudenteResponse> creaStudente(@Valid @RequestBody StudenteRequest request) {
        Studente studente = new Studente();
        studente.setNome(request.getNome());
        studente.setCognome(request.getCognome());
        studente.setGenere(request.getGenere());

        Studente salvato = studenteService.creaStudente(studente);

        StudenteResponse response = toResponse(salvato);
        return ResponseEntity.status(201).body(response);
    }

    @GetMapping
    public ResponseEntity<List<StudenteResponse>> getTuttiGliStudenti() {
        List<StudenteResponse> response = studenteService.trovaTuttiGliStudenti()
                .stream()
                .map(this::toResponse)
                .collect(Collectors.toList());

        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<StudenteResponse> getStudentePerId(@PathVariable Integer id) {
        Studente studente = studenteService.trovaStudentePerId(id);

        if (studente == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(toResponse(studente));
    }

    @PutMapping("/{id}")
    public ResponseEntity<StudenteResponse> aggiornaStudente(
            @PathVariable Integer id,
            @Valid @RequestBody StudenteRequest request
    ) {
        Studente studenteAggiornato = new Studente();
        studenteAggiornato.setNome(request.getNome());
        studenteAggiornato.setCognome(request.getCognome());
        studenteAggiornato.setGenere(request.getGenere());

        Studente studente = studenteService.aggiornaStudente(id, studenteAggiornato);

        if (studente == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(toResponse(studente));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminaStudente(@PathVariable Integer id) {
        studenteService.eliminaStudente(id);
        return ResponseEntity.noContent().build();
    }

    private StudenteResponse toResponse(Studente studente) {
        return new StudenteResponse(
        ); 
    }
}