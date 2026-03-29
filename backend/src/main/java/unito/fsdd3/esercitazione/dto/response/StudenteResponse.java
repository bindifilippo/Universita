package unito.fsdd3.esercitazione.dto.response;

public class StudenteResponse {

    private Integer id;
    private String nome;
    private String cognome;
    private String genere;

    public StudenteResponse() {
    }

    public void setGenere(String genere) {
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

    public String getGenere() {
        return genere;
    }
}