import { useEffect, useState } from "react";
import type { Course, NewCourseData, UpdateCourseData } from "../types";

import CardCorso from "../components/CardCorso";
import FormCorso from "../components/FormCorso";
import EditCourseModal from "../components/EditCourseModal";
import CourseDetailsModal from "../components/CourseDetailsModal";

import {
  getCourses,
  createCourse,
  updateCourse,
  deleteCourse,
} from "../services/courseApi";

export default function Dashboard() {
  const [cards, setCards] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [courseToEdit, setCourseToEdit] = useState<Course | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  useEffect(() => {
    async function loadCourses() {
      try {
        setIsLoading(true);
        setError(null);
        const data = await getCourses();
        setCards(data);
      } catch (err) {
        console.error(err);
        setError("Errore nel caricamento dei corsi.");
      } finally {
        setIsLoading(false);
      }
    }
    loadCourses();
  }, []);

  async function handleAddCourse(courseData: NewCourseData) {
    try {
      setError(null);
      const createdCourse = await createCourse(courseData);
      setCards((prevCards) => [...prevCards, createdCourse]);
      setIsFormOpen(false);
    } catch (err) {
      console.error(err);
      setError("Errore nella creazione del corso.");
    }
  }

  async function handleUpdateCourse(id: number, updatedData: UpdateCourseData) {
    try {
      setError(null);

      const savedCourse = await updateCourse(id, updatedData);

      setCards((prevCards) =>
        prevCards.map((card) => (card.id === id ? savedCourse : card))
      );

      setCourseToEdit(null);

      setSelectedCourse((prevSelected) =>
        prevSelected && prevSelected.id === id ? savedCourse : prevSelected
      );
    } catch (err) {
      console.error(err);
      setError("Errore nell'aggiornamento del corso.");
    }
  }

  async function handleDeleteCourse(id: number) {
    try {
      setError(null);

      await deleteCourse(id);

      setCards((prevCards) => prevCards.filter((card) => card.id !== id));
      setCourseToEdit(null);

      if (selectedCourse?.id === id) {
        setSelectedCourse(null);
      }
    } catch (err) {
      console.error(err);
      setError("Errore nell'eliminazione del corso.");
    }
  }

  return (
    <>
      <div className="p-6">
        <h1 className="pb-2 text-2xl">Corsi</h1>

        <button
          className="button-primary"
          onClick={() => setIsFormOpen(true)}
          disabled={isLoading}
        >
          Aggiungi corso
        </button>

        {isLoading && (
          <p className="mt-4 text-sm text-gray-500">Caricamento corsi...</p>
        )}

        {error && (
          <p className="mt-4 text-sm text-red-600">{error}</p>
        )}
      </div>

      {!isLoading && !error && cards.length === 0 && (
        <div className="px-6 pb-12">
          <p className="text-gray-500">Nessun corso disponibile.</p>
        </div>
      )}

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