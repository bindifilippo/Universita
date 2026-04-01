package unito.fsdd3.server.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import unito.fsdd3.server.dto.request.CorsoRequest;
import unito.fsdd3.server.dto.response.CorsoResponse;
import unito.fsdd3.server.model.Corso;
import unito.fsdd3.server.service.CorsoService;

import java.util.List;

@RestController
@RequestMapping("/corsi")
public class CorsoController {

    private final CorsoService corsoService;

    public CorsoController(CorsoService corsoService) {
        this.corsoService = corsoService;
    }

    @PostMapping
    public ResponseEntity<CorsoResponse> creaCorso(@Valid @RequestBody CorsoRequest request) {
        //il controller sta facendo mapping, valutare cartella mapping o spostare nel service
        Corso corso = new Corso(request.getTitolo(), request.getAnnoCreazione());

        Corso salvato = corsoService.creaCorso(corso);

        CorsoResponse response = new CorsoResponse(
                salvato.getId(),
                salvato.getTitolo(),
                salvato.getAnnoCreazione());

        return ResponseEntity.ok(response);
    }

   @GetMapping
    public ResponseEntity<List<CorsoResponse>> getTuttiICorsi() {
        List<Corso> corsi = corsoService.trovaTuttiICorsi();

        List<CorsoResponse> response = corsi.stream()
                .map(corso -> new CorsoResponse(
                        corso.getId(),
                        corso.getTitolo(),
                        corso.getAnnoCreazione()))
                .toList();

        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CorsoResponse> getCorsoPerId(@PathVariable Integer id) {
        Corso corso = corsoService.trovaCorsoPerId(id);

        if (corso == null) {
            return ResponseEntity.notFound().build();
        }

        CorsoResponse response = new CorsoResponse(
                corso.getId(),
                corso.getTitolo(),
                corso.getAnnoCreazione());

        return ResponseEntity.ok(response);
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<CorsoResponse> aggiornaCorso(@PathVariable Integer id,
            @Valid @RequestBody CorsoRequest request) {

        Corso corsoAggiornato = new Corso(request.getTitolo(), request.getAnnoCreazione());

        Corso corso = corsoService.aggiornaCorso(id, corsoAggiornato);

        if (corso == null) {
            return ResponseEntity.notFound().build();
        }

        CorsoResponse response = new CorsoResponse(
                corso.getId(),
                corso.getTitolo(),
                corso.getAnnoCreazione());

        return ResponseEntity.ok(response);
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Void> eliminaCorso(@PathVariable Integer id) {
        corsoService.eliminaCorso(id);
        return ResponseEntity.noContent().build();
    }
}