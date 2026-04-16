import type { CardCorsoProps, CourseStatus } from "../types";

// Mappa centralizzata tra stato del corso e variante CSS del badge.
// Evita if/else ripetuti e rende il componente più leggibile.
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
  const statusClass = statusClassMap[course.status];

  return (
    <div className="cardCorso">
      <div className="mb-4">
        <span className="badge badge-level">{course.level}</span>
      </div>

      <h2 className="mb-2 text-xl font-semibold text-gray-900">
        {course.title}
      </h2>

      <p className="mb-3 text-sm leading-relaxed text-gray-600">
        {course.description}
      </p>

      <p className="mb-6 text-sm text-gray-700">
        Studenti iscritti: {course.students.length}
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
          {course.status}
        </span>
      </div>
    </div>
  );
}