import { useState } from "react";
import CardCorso from "../components/CardCorso";

export default function Dashboard() {
  const [cards, setCards] = useState([
    {
      id: 1,
      level: "A1",
      title: "Tedesco per principianti",
      description:
        "Corso base di grammatica e vocaboli",
      buttonText: "Esplora",
      status: "Da iniziare",
    },
    {
      id: 2,
      level: "C1",
      title: "Tedesco avanzato",
      description:
        "Corso orientato alle certificazioni per il lavoro.",
      buttonText: "Esplora",
      status: "In corso",
    },
    {
      id: 3,
      level: "B2",
      title: "Tedesco livello intermedio",
      description:
        "Corso introduttivo alle struttre linguistiche del tedesco .",
      buttonText: "Esplora",
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

  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <>
      <div className="p-6">
        <h1 className="text-2xl pb-2">Corsi</h1>

        <button
          className="button-primary"
          onClick={() => setIsFormOpen(true)}
        >
          Aggiungi corso
        </button>
      </div>

      <div className="pl-6 pb-12 flex flex-wrap gap-6">
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

      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
            
            <h2 className="mb-6 text-xl font-semibold text-gray-900">
              Nuovo corso
            </h2>

            <button
              className="absolute right-4 top-4 text-2xl font-semibold text-gray-500 hover:text-gray-900 cursor-pointer"
              onClick={() => setIsFormOpen(false)}
            >
              ×
            </button>

            <form className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Titolo corso"
                className="rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-gray-500"
              />

              <textarea
                placeholder="Descrizione"
                className="min-h-30 rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-gray-500"
              />

              <input
                type="text"
                placeholder="Livello"
                className="rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-gray-500"
              />

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  className="button-secondary"
                  onClick={() => setIsFormOpen(false)}
                >
                  Annulla
                </button>

                <button
                  type="submit"
                  className="button-primary"
                >
                  Salva
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}