package unito.fsdd3.server.controllers;

import java.util.List;

import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import unito.fsdd3.server.dto.request.StudenteRequest;
import unito.fsdd3.server.dto.response.StudenteResponse;
import unito.fsdd3.server.model.Studente;
import unito.fsdd3.server.service.StudenteService;

@RestController
@RequestMapping("/studenti")
public class StudenteController {

    private final StudenteService studenteService;

    public StudenteController(StudenteService studenteService) {
        this.studenteService = studenteService;
    }

    @GetMapping
    public ResponseEntity<List<StudenteResponse>> getTuttiGliStudenti() {
        List<StudenteResponse> response = studenteService.trovaTuttiGliStudenti()
                .stream()
                .map(this::toResponse)
                .toList();

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

    @PostMapping
    public ResponseEntity<StudenteResponse> creaStudente(@Valid @RequestBody StudenteRequest request) {
        Studente studente = new Studente();
        studente.setNome(request.getNome());
        studente.setCognome(request.getCognome());
        studente.setGenere(request.getGenere());

        Studente salvato = studenteService.creaStudente(studente);

        return ResponseEntity.ok(toResponse(salvato));
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
                studente.getId(),
                studente.getNome(),
                studente.getCognome(),
                studente.getGenere()
        );
    }
}