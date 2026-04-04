import { useState } from "react";

type NewCourseData = {
  title: string;
  description: string;
  level: string;
};

type FormCorsoProps = {
  onClose: () => void;
  onSave: (courseData: NewCourseData) => void;
};

const levelOptions = ["A1", "A2", "B1", "B2", "C1", "C2", "IELTS", "GOETHE"];

export default function FormCorso({ onClose, onSave }: FormCorsoProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [level, setLevel] = useState("A1");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    onSave({
      title,
      description,
      level,
    });

    setTitle("");
    setDescription("");
    setLevel("A1");
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
        <h2 className="mb-6 text-xl font-semibold text-gray-900">
          Nuovo corso
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
            placeholder="Titolo corso"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            className="rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-gray-500"
            required
          />

          <textarea
            placeholder="Descrizione"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            className="min-h-30 rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-gray-500"
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

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              className="button-secondary"
              onClick={onClose}
            >
              Annulla
            </button>

            <button type="submit" className="button-primary">
              Salva
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}