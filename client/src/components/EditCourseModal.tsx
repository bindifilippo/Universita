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
  const [titolo, setTitolo] = useState(course.titolo);
  const [descrizione, setDescrizione] = useState(course.descrizione ?? "");
  const [livello, setLivello] = useState(course.livello);
  const [stato, setStato] = useState<CourseStatus>(course.stato);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!titolo.trim()) {
      return;
    }

    onSave(course.id, {
      titolo: titolo.trim(),
      descrizione: descrizione.trim() || undefined,
      livello,
      stato,
      annoCreazione: course.annoCreazione,
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
            type="button"
            aria-label="Chiudi finestra"
          >
            ×
          </button>

          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <input
              type="text"
              value={titolo}
              onChange={(event) => setTitolo(event.target.value)}
              className="rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-gray-500"
              placeholder="Titolo corso"
              required
            />

            <textarea
              value={descrizione}
              onChange={(event) => setDescrizione(event.target.value)}
              className="min-h-30 rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-gray-500"
              placeholder="Descrizione"
            />

            <select
              value={livello}
              onChange={(event) => setLivello(event.target.value)}
              className="rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-gray-500"
            >
              {levelOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>

            <select
              value={stato}
              onChange={(event) => setStato(event.target.value as CourseStatus)}
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

                <button type="submit" className="button-primary">
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