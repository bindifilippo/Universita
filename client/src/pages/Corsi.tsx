// una volta collegato backend e database fare refactor
import type { Course, NewCourseData, UpdateCourseData } from "../types";

import { useState } from "react";
import CardCorso from "../components/CardCorso";
import FormCorso from "../components/FormCorso";
import EditCourseModal from "../components/EditCourseModal";
import CourseDetailsModal from "../components/CourseDetailsModal";


export default function Dashboard() {
  //stato principale con inizializzazione corsi fittizi. Dati non arrivano da API
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
      students: [{ id: 3, firstName: "Luca", lastName: "Verdi" }],
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

  //controllo apertura form, modal di modifica e di dettaglio
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [courseToEdit, setCourseToEdit] = useState<Course | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  //funzione per aggiungere corso
  async function handleAddCourse(courseData: NewCourseData) {
    try {
        const response = await fetch("/api/courses", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(courseData),
        });

        if (!response.ok) {
          throw new Error("Errore nella creazione del corso");
        }

        const createdCourse: Course = await response.json();

        setCards((prevCards) => [...prevCards, createdCourse]);
        setIsFormOpen(false);
      } catch (error) {
        console.error(error);
      }
    }

  //funzione per aggiornare corso
  function handleUpdateCourse(id: number, updatedData: UpdateCourseData) {
    setCards((prevCards) =>
      prevCards.map((card) =>
        card.id === id
          ? {
              ...card,
              title: updatedData.title,
              description: updatedData.description,
              level: updatedData.level,
              status: updatedData.status,
            }
          : card
      )
    );

    setCourseToEdit(null);

    setSelectedCourse((prevSelected) =>
      prevSelected && prevSelected.id === id
        ? {
            ...prevSelected,
            title: updatedData.title,
            description: updatedData.description,
            level: updatedData.level,
            status: updatedData.status,
          }
        : prevSelected
    );
  }

  function handleDeleteCourse(id: number) {
    setCards((prevCards) => prevCards.filter((card) => card.id !== id));
    setCourseToEdit(null);

    if (selectedCourse?.id === id) {
      setSelectedCourse(null);
    }
  }

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
            course={card}
            onExplore={() => setSelectedCourse(card)}
            onEdit={() => setCourseToEdit(card)}
          />
        ))}
      </div>

      {isFormOpen && (
        <FormCorso
          onClose={() => setIsFormOpen(false)}
          onSave={handleAddCourse}
        />
      )}

      {courseToEdit && (
        <EditCourseModal
          course={courseToEdit}
          onClose={() => setCourseToEdit(null)}
          onSave={handleUpdateCourse}
          onDelete={handleDeleteCourse}
        />
      )}

      {selectedCourse && (
        <CourseDetailsModal
          course={selectedCourse}
          onClose={() => setSelectedCourse(null)}
        />
      )}
    </>
  );
}