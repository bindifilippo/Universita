package unito.fsdd3.esercitazione.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import unito.fsdd3.esercitazione.dto.request.InsegnanteRequest;
import unito.fsdd3.esercitazione.dto.response.InsegnanteResponse;
import unito.fsdd3.esercitazione.model.Insegnante;
import unito.fsdd3.esercitazione.service.InsegnanteService;
import jakarta.validation.Valid;

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

        Insegnante salvato = insegnanteService.creaInsegnante(insegnante);

        InsegnanteResponse response = new InsegnanteResponse(
                salvato.getId(),
                salvato.getNome(),
                salvato.getCognome()
        );

        return ResponseEntity.status(201).body(response);
    }

    @GetMapping
    public ResponseEntity<List<InsegnanteResponse>> getTuttiGliInsegnanti() {
        List<Insegnante> insegnanti = insegnanteService.trovaTuttiGliInsegnanti();

        List<InsegnanteResponse> response = insegnanti.stream()
                .map(insegnante -> new InsegnanteResponse(
                        insegnante.getId(),
                        insegnante.getNome(),
                        insegnante.getCognome()
                ))
                .toList();

        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<InsegnanteResponse> getInsegnantePerId(@PathVariable Integer id) {
        Insegnante insegnante = insegnanteService.trovaInsegnantePerId(id);

        if (insegnante == null) {
            return ResponseEntity.notFound().build();
        }

        InsegnanteResponse response = new InsegnanteResponse(
                insegnante.getId(),
                insegnante.getNome(),
                insegnante.getCognome()
        );

        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<InsegnanteResponse> aggiornaInsegnante(
            @PathVariable Integer id,
            @Valid @RequestBody InsegnanteRequest request
    ) {
        Insegnante insegnanteAggiornato = new Insegnante();
        insegnanteAggiornato.setNome(request.getNome());
        insegnanteAggiornato.setCognome(request.getCognome());

        Insegnante insegnante = insegnanteService.aggiornaInsegnante(id, insegnanteAggiornato);

        if (insegnante == null) {
            return ResponseEntity.notFound().build();
        }

        InsegnanteResponse response = new InsegnanteResponse(
                insegnante.getId(),
                insegnante.getNome(),
                insegnante.getCognome()
        );

        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminaInsegnante(@PathVariable Integer id) {
        insegnanteService.eliminaInsegnante(id);
        return ResponseEntity.noContent().build();
    }
}