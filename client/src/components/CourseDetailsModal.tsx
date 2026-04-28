import type { CourseDetailsModalProps } from "../types";

export default function CourseDetailsModal({
  course,
  onClose,
}: CourseDetailsModalProps) {
  let statusClass = "badge-status--default";

  if (course.stato === "In corso") {
    statusClass = "badge-status--in-progress";
  } else if (course.stato === "Completato") {
    statusClass = "badge-status--completed";
  }

  const studenti = course.studenti ?? [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="relative w-full max-w-2xl rounded-2xl bg-white p-6 shadow-xl">
        <button
          className="absolute top-4 right-4 cursor-pointer text-2xl font-semibold text-gray-500 hover:text-gray-900"
          onClick={onClose}
          type="button"
          aria-label="Chiudi finestra"
        >
          ×
        </button>

        <div className="mb-4 pr-8">
          <h2 className="text-2xl font-semibold text-gray-900">
            {course.titolo}
          </h2>
        </div>

        <div className="mb-4 flex flex-wrap gap-3">
          <span className="badge badge-level">{course.livello}</span>
          <span className={`badge badge-status ${statusClass}`}>
            {course.stato}
          </span>
        </div>

        <div className="mb-6">
          <h3 className="mb-2 text-sm font-semibold text-gray-800">
            Descrizione
          </h3>
          <p className="text-sm leading-relaxed text-gray-600">
            {course.descrizione ?? "Nessuna descrizione disponibile."}
          </p>
        </div>

        <h3 className="mb-1 text-sm font-semibold text-gray-800">
          Studenti
        </h3>

        <div className="mb-6 rounded-xl border border-gray-200 bg-gray-50 p-4">
          <p className="mb-4 text-sm text-gray-600">
            Numero iscritti: {studenti.length}
          </p>

          {studenti.length === 0 ? (
            <div className="rounded-lg bg-white px-4 py-3">
              <p className="text-sm text-gray-500">Nessuno studente iscritto</p>
            </div>
          ) : (
            <div className="max-h-64 overflow-y-auto pr-2">
              <ul className="space-y-2">
                {studenti.map((student) => (
                  <li
                    key={student.id}
                    className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700"
                  >
                    {student.nome} {student.cognome}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="flex justify-end">
          <button type="button" className="button-secondary" onClick={onClose}>
            Chiudi
          </button>
        </div>
      </div>
    </div>
  );
}