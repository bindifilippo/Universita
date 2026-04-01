import { useState } from "react";
import CardCorso from "../components/CardCorso";

export default function Dashboard (){
    const [cards, setCards] = useState([
    {
      id: 1,
      level: "Livello B1",
      title: "Tedesco per principianti",
      description:
        "Questo è un testo descrittivo molto semplice. Serve a spiegare il contenuto principale della card con una UI pulita e minimale.",
      buttonText: "Entra",
      status: "Da iniziare",
    },
    {
      id: 2,
      level: "Livello C1",
      title: "Tedesco per esperti",
      description:
        "Questo è un testo descrittivo molto semplice. Serve a spiegare il contenuto principale della card con una UI pulita e minimale.",
      buttonText: "Entra",
      status: "In corso",
    },
    {
      id: 3,
      level: "Livello B2",
      title: "Tedesco livello intermedio",
      description:
        "Questo è un testo descrittivo molto semplice. Serve a spiegare il contenuto principale della card con una UI pulita e minimale.",
      buttonText: "Entra",
      status: "Completato",
    },
  ]);

  function changeStatus(id: number) {
    setCards((prevCards) =>
        prevCards.map((card) => {
            if (card.id !== id) {
            return card;
            }

            let newStatus = "";

            if (card.status === "Da iniziare") {
            newStatus = "In corso";
            } else if (card.status === "In corso") {
            newStatus = "Completato";
            } else {
            newStatus = "Da iniziare";
            }

            return {
            ...card,
            status: newStatus,
            };
        })
        );
    }

    return( 
    <> 
        <h1 className="pl-6 pt-12 text-2xl"> Corsi disponibili</h1>
        <div className="p-6 pb-24 flex flex-wrap gap-6">
            {cards.map((card) => (
            <CardCorso
            key={card.id}
            id={card.id}
            level={card.level}
            title={card.title}
            description={card.description}
            buttonText={card.buttonText}
            status={card.status}
            onChangeStatus={changeStatus}
            />
            ))}
        </div> 
    </>
    )
}