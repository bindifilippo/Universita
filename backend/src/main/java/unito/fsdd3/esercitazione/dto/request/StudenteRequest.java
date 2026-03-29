package unito.fsdd3.esercitazione.dto.request;

import jakarta.validation.constraints.NotBlank;

public class StudenteRequest {

    @NotBlank(message = "Il nome non può essere vuoto")
    private String nome;

    @NotBlank(message = "Il cognome non può essere vuoto")
    private String cognome;

    @NotBlank(message = "Il genere non può essere vuoto")
    private String genere;

    public StudenteRequest() {
    }

    public StudenteRequest(String nome, String cognome, String genere) {
        this.nome = nome;
        this.cognome = cognome;
        this.genere = genere;
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

    public String getGenere() {
        return genere;
    }

    public void setGenere(String genere) {
        this.genere = genere;
    }
}