package unito.fsdd3.esercitazione.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Studente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String nome;
    private String cognome;
    private String genere;

    //buona pratica costruttore vuoto per JPA
    public Studente(){
    }

    public Studente(String nome, String cognome, String genere){
        this.nome = nome;
        this.cognome = cognome;
        this.genere = genere;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getCognome() {
        return cognome;
    }

    public void setCognome(String cognome) {
        this.cognome = cognome;
    }

    public String getGenere(){
        return genere;
    }

    public void setGenere(String genere){
        this.genere = genere;
    }
}