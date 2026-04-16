import { useState } from "react";
import type { CourseStatus, EditCourseModalProps } from "../types";

const levelOptions = ["A1", "A2", "B1", "B2", "C1", "C2", "IELTS", "GOETHE"];
const statusOptions: CourseStatus[] = ["Da iniziare", "In corso", "Completato"];

export default function EditCourseModal({
  course,
  onClose,
  onSave,
  onDelete,
}: EditCourseModalProps) {
  const [title, setTitle] = useState(course.title);
  const [description, setDescription] = useState(course.description);
  const [level, setLevel] = useState(course.level);
  const [status, setStatus] = useState<CourseStatus>(course.status);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!title.trim() || !description.trim()) {
      return;
    }

    onSave(course.id, {
      title: title.trim(),
      description: description.trim(),
      level,
      status,
    });
  }

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
        <div className="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
          <h2 className="mb-6 text-xl font-semibold text-gray-900">
            Modifica corso
          </h2>

          <button
            className="absolute top-4 right-4 cursor-pointer text-2xl font-semibold text-gray-500 hover:text-gray-900"
            onClick={onClose}
          >
            ×
          </button>

          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <input
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              className="rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-gray-500"
              placeholder="Titolo corso"
              required
            />

            <textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              className="min-h-30 rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-gray-500"
              placeholder="Descrizione"
              required
            />

            <select
              value={level}
              onChange={(event) => setLevel(event.target.value)}
              className="rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-gray-500"
            >
              {levelOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>

            <select
              value={status}
              onChange={(event) => setStatus(event.target.value as CourseStatus)}
              className="rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-gray-500"
            >
              {statusOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>

            <div className="mt-2 flex flex-wrap justify-between gap-3">
              <button
                type="button"
                className="rounded-lg border border-red-300 px-4 py-2 text-red-600 hover:bg-red-50"
                onClick={() => setIsDeleteConfirmOpen(true)}
              >
                Elimina corso
              </button>

              <div className="flex gap-3">
                <button
                  type="button"
                  className="button-secondary"
                  onClick={onClose}
                >
                  Annulla
                </button>

                <button
                  type="submit"
                  className="button-primary"
                >
                  Salva modifiche
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {isDeleteConfirmOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <h3 className="mb-3 text-lg font-semibold text-gray-900">
              Conferma eliminazione
            </h3>

            <p className="mb-6 text-sm text-gray-600">
              Sei sicuro di voler eliminare questo corso? Questa azione non può essere annullata.
            </p>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                className="button-secondary"
                onClick={() => setIsDeleteConfirmOpen(false)}
              >
                Annulla
              </button>

              <button
                type="button"
                className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
                onClick={() => onDelete(course.id)}
              >
                Sì, elimina
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}