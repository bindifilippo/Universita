import CardCorso from "../components/CardCorso";

export default function Dashboard (){
    return( 
    <> 
        <div className="pt-12"> Titolo pagina </div>
        <div className="min-h-screen bg-gray-100 flex items-center justify-center gap-6 p-6">
            <CardCorso
                level="Livello B1"
                title="Tedesco per principianti"
                description="Questo è un testo descrittivo molto semplice. Serve a spiegare il contenuto principale della card con una UI pulita e minimale."
                buttonText="Entra"
            />
            <CardCorso
                level="Livello C1"
                title="Tedesco per esperti"
                description="Questo è un testo descrittivo molto semplice. Serve a spiegare il contenuto principale della card con una UI pulita e minimale."
                buttonText="Entra"
            />
            <CardCorso
                level="Livello B2"
                title="Tedesco livello intermedio"
                description="Questo è un testo descrittivo molto semplice. Serve a spiegare il contenuto principale della card con una UI pulita e minimale."
                buttonText="Entra"
                />
        </div> 
    </>
    )
}