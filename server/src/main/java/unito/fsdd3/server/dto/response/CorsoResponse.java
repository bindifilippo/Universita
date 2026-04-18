package unito.fsdd3.server.dto.response;

public class CorsoResponse {

    private Integer id;
    private String titolo;
    private Integer annoCreazione;
    private String livello;
    private String stato;
    private String descrizione;

    public CorsoResponse(
            Integer id,
            String titolo,
            Integer annoCreazione,
            String livello,
            String stato,
            String descrizione) {
        this.id = id;
        this.titolo = titolo;
        this.annoCreazione = annoCreazione;
        this.livello = livello;
        this.stato = stato;
        this.descrizione = descrizione;
    }

    public Integer getId() {
        return id;
    }

    public String getTitolo() {
        return titolo;
    }

    public Integer getAnnoCreazione() {
        return annoCreazione;
    }

    public String getLivello() {
        return livello;
    }

    public String getStato() {
        return stato;
    }

    public String getDescrizione() {
        return descrizione;
    }
}