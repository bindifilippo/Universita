package unito.fsdd3.server.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class CorsoRequest {

    @NotBlank
    private String titolo;

    @NotNull
    private Integer annoCreazione;

    @NotBlank
    private String livello;

    @NotBlank
    private String stato;

    private String descrizione;

    private Integer insegnanteId;


    public String getTitolo() {
        return titolo;
    }

    public void setTitolo(String titolo) {
        this.titolo = titolo;
    }

    public Integer getAnnoCreazione() {
        return annoCreazione;
    }

    public void setAnnoCreazione(Integer annoCreazione) {
        this.annoCreazione = annoCreazione;
    }

    public String getLivello() {
        return livello;
    }

    public void setLivello(String livello) {
        this.livello = livello;
    }

    public String getStato() {
        return stato;
    }

    public void setStato(String stato) {
        this.stato = stato;
    }

    public String getDescrizione() {
        return descrizione;
    }

    public void setDescrizione(String descrizione) {
        this.descrizione = descrizione;
    }

    public Integer getInsegnanteId() {
        return insegnanteId;
    }

    public void setInsegnanteId(Integer insegnanteId) {
        this.insegnanteId = insegnanteId;
    }
}