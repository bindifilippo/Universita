import { useState } from "react";
import CardCorso from "../components/CardCorso";

type Student = {
  id: number;
  firstName: string;
  lastName: string;
};

type Course = {
  id: number;
  level: string;
  title: string;
  description: string;
  status: string;
  students: Student[];
};

export default function Dashboard() {
  const [cards, setCards] = useState<Course[]>([
    {
      id: 1,
      level: "A1",
      title: "Tedesco per principianti",
      description: "Corso base di grammatica e vocaboli",
      status: "Da iniziare",
      students: [
        { id: 1, firstName: "Mario", lastName: "Rossi" },
        { id: 2, firstName: "Giulia", lastName: "Bianchi" },
      ],
    },
    {
      id: 2,
      level: "C1",
      title: "Tedesco avanzato",
      description: "Corso orientato alle certificazioni per il lavoro.",
      status: "In corso",
      students: [
        { id: 3, firstName: "Luca", lastName: "Verdi" },
      ],
    },
    {
      id: 3,
      level: "B2",
      title: "Tedesco livello intermedio",
      description: "Corso di avvicinamento per l'università.",
      status: "Completato",
      students: [],
    },
    {
      id: 4,
      level: "C2",
      title: "Tedesco madrelingua",
      description: "Corso per profili di alto livello.",
      status: "Completato",
      students: [],
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
        <h1 className="pb-2 text-2xl">Corsi</h1>

        <button
          className="button-primary"
          onClick={() => setIsFormOpen(true)}
        >
          Aggiungi corso
        </button>
      </div>

      <div className="flex flex-wrap gap-6 pl-6 pb-12">
        {cards.map((card) => (
          <CardCorso
            key={card.id}
            id={card.id}
            level={card.level}
            title={card.title}
            description={card.description}
            status={card.status}
            students={card.students}
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
              className="absolute top-4 right-4 cursor-pointer text-2xl font-semibold text-gray-500 hover:text-gray-900"
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