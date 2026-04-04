import { useState } from "react";

type Student = {
  id: number;
  firstName: string;
  lastName: string;
};

type CardCorsoProps = {
  id: number;
  level: string;
  title: string;
  description: string;
  status: string;
  students: Student[];
  onChangeStatus: (id: number) => void;
};

export default function CardCorso({
  id,
  level,
  title,
  description,
  status,
  students,
  onChangeStatus,
}: CardCorsoProps) {
  const [showStudents, setShowStudents] = useState(false);

  let statusStyle = "bg-gray-100 text-gray-700";

  if (status === "In corso") {
    statusStyle = "bg-yellow-100 text-yellow-800";
  } else if (status === "Completato") {
    statusStyle = "bg-green-100 text-green-800";
  }

  return (
    <div className="w-full max-w-sm rounded-2xl border border-gray-200 bg-white p-6 shadow-md">
      <div className="mb-4">
        <span className="inline-block rounded-full bg-gray-100 px-3 py-1 text-l font-medium text-gray-600">
          {level}
        </span>
      </div>

      <h2 className="mb-2 text-xl font-semibold text-gray-900">
        {title}
      </h2>

      <p className="mb-3 text-sm leading-relaxed text-gray-600">
        {description}
      </p>

      <p className="mb-6 text-sm text-gray-700">
        Studenti iscritti: {students.length}
      </p>

      <div className="mb-4 flex gap-3">
        <button
          className="button-primary"
          onClick={() => setShowStudents((prev) => !prev)}
        >
          {showStudents ? "Nascondi" : "Esplora"}
        </button>

        <button
          className="button-secondary"
          onClick={() => onChangeStatus(id)}
        >
          Cambia stato
        </button>
      </div>

      <div className="mb-4">
        <span className={`rounded-full px-3 py-2 text-xs font-medium ${statusStyle}`}>
          {status}
        </span>
      </div>

      {showStudents && (
        <div className="rounded-xl bg-gray-50 p-4">
          <h3 className="mb-2 text-sm font-semibold text-gray-800">
            Elenco studenti
          </h3>

          {students.length === 0 ? (
            <p className="text-sm text-gray-500">Nessuno studente iscritto</p>
          ) : (
            <ul className="space-y-2">
              {students.map((student) => (
                <li key={student.id} className="text-sm text-gray-700">
                  {student.firstName} {student.lastName}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}