package unito.fsdd3.esercitazione.dto.response;

public class CorsoResponse {

    private Integer id;
    private String titolo;
    private Integer annoCreazione;

    public CorsoResponse(Integer id, String titolo, Integer annoCreazione) {
        this.id = id;
        this.titolo = titolo;
        this.annoCreazione = annoCreazione;
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
}
