package unito.fsdd3.server.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;

@Entity
public class Studente {

    @OneToOne
    @JoinColumn(name = "user_id", unique = true)
    private User user;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String nome;
    private String cognome;
    private Integer eta;
    private String genere;

    //buona pratica costruttore vuoto per JPA
    public Studente(){
    }

    public Studente(String nome, String cognome, String genere, Integer eta){
        this.nome = nome;
        this.cognome = cognome;
        this.genere = genere;
        this.eta = eta;
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

    public Integer getEta(){
        return eta;
    }

    public void setEta(Integer eta){
        this.eta = eta;
    }

    public User getUser() {
    return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}