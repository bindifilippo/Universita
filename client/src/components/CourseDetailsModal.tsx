import type { CourseDetailsModalProps } from "../types";

export default function CourseDetailsModal({course, onClose,}: CourseDetailsModalProps) {
  let statusStyle = "bg-gray-100 text-gray-700";

  if (course.status === "In corso") {
    statusStyle = "bg-yellow-100 text-yellow-800";
  } else if (course.status === "Completato") {
    statusStyle = "bg-green-100 text-green-800";
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="relative w-full max-w-2xl rounded-2xl bg-white p-6 shadow-xl">
        <button
          className="absolute top-4 right-4 cursor-pointer text-2xl font-semibold text-gray-500 hover:text-gray-900"
          onClick={onClose}
        >
          ×
        </button>

        <div className="mb-4 pr-8">
          <h2 className="text-2xl font-semibold text-gray-900">
            {course.title}
          </h2>
        </div>

        <div className="mb-4 flex flex-wrap gap-3">
          <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700">
            {course.level}
          </span>

          <span className={`rounded-full px-3 py-1 text-sm font-medium ${statusStyle}`}>
            {course.status}
          </span>
        </div>

        <div className="mb-6">
          <h3 className="mb-2 text-sm font-semibold text-gray-800">
            Descrizione
          </h3>
          <p className="text-sm leading-relaxed text-gray-600">
            {course.description}
          </p>
        </div>
        
        <h3 className="mb-1 text-sm font-semibold text-gray-800">
            Studenti
        </h3>
        
        <div className="mb-6 rounded-xl border border-gray-200 bg-gray-50 p-4">
          <p className="mb-4 text-sm text-gray-600">
            Numero iscritti: {course.students.length}
          </p>

          {course.students.length === 0 ? (
            <div className="rounded-lg bg-white px-4 py-3">
              <p className="text-sm text-gray-500">Nessuno studente iscritto</p>
            </div>
          ) : (
            <div className="max-h-64 overflow-y-auto pr-2">
              <ul className="space-y-2">
                {course.students.map((student) => (
                  <li
                    key={student.id}
                    className="rounded-lg bg-white px-3 py-2 text-sm text-gray-700 border border-gray-200"
                  >
                    {student.firstName} {student.lastName}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="flex justify-end">
          <button className="button-secondary" onClick={onClose}>
            Chiudi
          </button>
        </div>
      </div>
    </div>
  );
}