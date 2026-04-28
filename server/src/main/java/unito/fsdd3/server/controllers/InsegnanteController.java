package unito.fsdd3.server.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import unito.fsdd3.server.dto.request.InsegnanteRequest;
import unito.fsdd3.server.dto.response.InsegnanteResponse;
import unito.fsdd3.server.model.Insegnante;
import unito.fsdd3.server.service.InsegnanteService;

import java.util.List;

@RestController
@RequestMapping("/insegnanti")
public class InsegnanteController {

    private final InsegnanteService insegnanteService;

    public InsegnanteController(InsegnanteService insegnanteService) {
        this.insegnanteService = insegnanteService;
    }

    @PostMapping
    public ResponseEntity<InsegnanteResponse> creaInsegnante(@Valid @RequestBody InsegnanteRequest request) {
        Insegnante insegnante = new Insegnante();
        insegnante.setNome(request.getNome());
        insegnante.setCognome(request.getCognome());
        insegnante.setEmail(request.getEmail());

        Insegnante salvato = insegnanteService.creaInsegnante(insegnante);

        InsegnanteResponse response = toResponse(salvato);

        return ResponseEntity.status(201).body(response);
    }

    @GetMapping
    public ResponseEntity<List<InsegnanteResponse>> getTuttiGliInsegnanti() {
        List<Insegnante> insegnanti = insegnanteService.trovaTuttiGliInsegnanti();

        List<InsegnanteResponse> response = insegnanti.stream()
                .map(this::toResponse)
                .toList();

        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<InsegnanteResponse> getInsegnantePerId(@PathVariable Integer id) {
        Insegnante insegnante = insegnanteService.trovaInsegnantePerId(id);

        if (insegnante == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(toResponse(insegnante));
    }

    @PutMapping("/{id}")
    public ResponseEntity<InsegnanteResponse> aggiornaInsegnante(
            @PathVariable Integer id,
            @Valid @RequestBody InsegnanteRequest request
    ) {
        Insegnante insegnanteAggiornato = new Insegnante();
        insegnanteAggiornato.setNome(request.getNome());
        insegnanteAggiornato.setCognome(request.getCognome());
        insegnanteAggiornato.setEmail(request.getEmail());

        Insegnante insegnante = insegnanteService.aggiornaInsegnante(id, insegnanteAggiornato);

        if (insegnante == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(toResponse(insegnante));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminaInsegnante(@PathVariable Integer id) {
        insegnanteService.eliminaInsegnante(id);
        return ResponseEntity.noContent().build();
    }

    private InsegnanteResponse toResponse(Insegnante insegnante) {
        return new InsegnanteResponse(
                insegnante.getId(),
                insegnante.getNome(),
                insegnante.getCognome(),
                insegnante.getEmail()
        );
    }
}