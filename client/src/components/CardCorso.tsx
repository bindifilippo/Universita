import type { CardCorsoProps, CourseStatus } from "../types";

const statusClassMap: Record<CourseStatus, string> = {
  "Da iniziare": "badge-status--default",
  "In corso": "badge-status--in-progress",
  "Completato": "badge-status--completed",
};

export default function CardCorso({
  course,
  onEdit,
  onExplore,
}: CardCorsoProps) {
  const statusClass = statusClassMap[course.stato];

  return (
    <div className="cardCorso">
      <div className="mb-4">
        <span className="badge badge-level">{course.livello}</span>
      </div>

      <h2 className="mb-2 text-xl font-semibold text-gray-900">
        {course.titolo}
      </h2>

      <p className="mb-3 text-sm leading-relaxed text-gray-600">
        {course.descrizione ?? "Nessuna descrizione disponibile."}
      </p>

      <p className="mb-6 text-sm text-gray-700">
        Studenti iscritti: {course.studenti?.length ?? 0}
      </p>

      <div className="mb-4 flex flex-wrap gap-3">
        <button type="button" className="button-primary" onClick={onExplore}>
          Esplora
        </button>

        <button type="button" className="button-secondary" onClick={onEdit}>
          Modifica
        </button>
      </div>

      <div>
        <span className={`badge badge-status ${statusClass}`}>
          {course.stato}
        </span>
      </div>
    </div>
  );
}