import { useState } from "react";
import CardCorso from "../components/CardCorso";
import FormCorso from "../components/FormCorso";
import EditCourseModal from "../components/EditCourseModal";

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

type NewCourseData = {
  title: string;
  description: string;
  level: string;
};

type UpdateCourseData = {
  title: string;
  description: string;
  level: string;
  status: string;
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

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [courseToEdit, setCourseToEdit] = useState<Course | null>(null);

  function handleAddCourse(courseData: NewCourseData) {
    const newCourse: Course = {
      id: Date.now(),
      title: courseData.title,
      description: courseData.description,
      level: courseData.level,
      status: "Da iniziare",
      students: [],
    };

    setCards((prevCards) => [...prevCards, newCourse]);
  }

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
  }

  function handleDeleteCourse(id: number) {
    setCards((prevCards) => prevCards.filter((card) => card.id !== id));
    setCourseToEdit(null);
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
            id={card.id}
            level={card.level}
            title={card.title}
            description={card.description}
            status={card.status}
            students={card.students}
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
    </>
  );
}