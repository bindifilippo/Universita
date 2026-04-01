import { useState } from "react";
import CardCorso from "../components/CardCorso";

export default function Dashboard (){
    const [cards] = useState ([
        {
        id: 1,
        level: "Livello B1",
        title: "Tedesco per principianti",
        description:
            "Questo è un testo descrittivo molto semplice. Serve a spiegare il contenuto principale della card con una UI pulita e minimale.",
        buttonText: "Entra",
        },
        {
        id: 2,
        level: "Livello C1",
        title: "Tedesco per esperti",
        description:
            "Questo è un testo descrittivo molto semplice. Serve a spiegare il contenuto principale della card con una UI pulita e minimale.",
        buttonText: "Entra",
        },
        {
        id: 3,
        level: "Livello B2",
        title: "Tedesco livello intermedio",
        description:
            "Questo è un testo descrittivo molto semplice. Serve a spiegare il contenuto principale della card con una UI pulita e minimale.",
        buttonText: "Entra",
        }
    ]);

    return( 
    <> 
        <h1 className="pl-6 pt-12 text-2xl"> Corsi disponibili</h1>
        <div className="p-6 pb-24 flex flex-wrap gap-6">
            {cards.map((card) => (
            <CardCorso
            key={card.id}
            level={card.level}
            title={card.title}
            description={card.description}
            buttonText={card.buttonText}
            />
            ))}
        </div> 
    </>
    )
}