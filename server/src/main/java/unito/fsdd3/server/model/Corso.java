package unito.fsdd3.server.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Corso {

    @ManyToOne
    @JoinColumn(name = "insegnante_id")
    private Insegnante insegnante;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String titolo;
    private Integer annoCreazione;
    private String livello;
    private String stato;
    private String descrizione;

    public Corso() {
    }

    public Corso(String titolo, Integer annoCreazione, String livello, String stato, String descrizione) {
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

    public Insegnante getInsegnante() {
    return insegnante;
    }

    public void setInsegnante(Insegnante insegnante) {
        this.insegnante = insegnante;
    }
}