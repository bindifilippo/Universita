type Student = {
  id: number;
  firstName: string;
  lastName: string;
};

type CardCorsoProps = {
  level: string;
  title: string;
  description: string;
  status: string;
  students: Student[];
  onEdit: () => void;
  onExplore: () => void;
};

//riceve props, componente presentazionale che comunica con il parent tramite eventi
export default function CardCorso({
  level,
  title,
  description,
  status,
  students,
  onEdit,
  onExplore,
}: CardCorsoProps) {
  let statusStyle = "bg-gray-100 text-gray-700";

  if (status === "In corso") {
    statusStyle = "bg-yellow-100 text-yellow-800";
  } else if (status === "Completato") {
    statusStyle = "bg-green-100 text-green-800";
  }

  return (
    <div className="w-full max-w-sm rounded-2xl border border-gray-200 bg-white p-6 shadow-md">
      <div className="mb-4">
        <span className="inline-block rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-600">
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
          {status}
        </span>
      </div>
    </div>
  );
}