//file che rappresenta il dato principale dell'applicazione, rappresentato come classe java con tre proprietà.
//Grazie a JPA la classe viene collegata anche a una tabella del database.
package unito.fsdd3.esercitazione.model;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity // tabella database
public class Corso {

    @Id // identificazione univoca
    @GeneratedValue(strategy = GenerationType.IDENTITY) // generazione automatica dal database.
    private Integer id;
    private String titolo;
    private Integer annoCreazione;

    public Corso() {
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

    public Corso(String titolo, Integer annoCreazione) {
        this.titolo = titolo;
        this.annoCreazione = annoCreazione;
    }
}