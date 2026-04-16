import type { CardCorsoProps } from "../types";

// Componente presentazionale che riceve un corso completo
// e comunica con il parent tramite callback.
export default function CardCorso({
  course,
  onEdit,
  onExplore,
}: CardCorsoProps) {
  let statusStyle = "bg-gray-100 text-gray-700";

  if (course.status === "In corso") {
    statusStyle = "bg-yellow-100 text-yellow-800";
  } else if (course.status === "Completato") {
    statusStyle = "bg-green-100 text-green-800";
  }

  return (
    <div className="cardCorso">
      <div className="mb-4">
        <span className="inline-block rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-600">
          {course.level}
        </span>
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
        <button className="button-primary" onClick={onExplore}>
          Esplora
        </button>

        <button className="button-secondary" onClick={onEdit}>
          Modifica
        </button>
      </div>

      <div>
        <span className={`rounded-full px-3 py-2 text-xs font-medium ${statusStyle}`}>
          {course.status}
        </span>
      </div>
    </div>
  );
}