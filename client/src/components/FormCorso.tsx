import { useState } from "react";
import type { FormCorsoProps } from "../types";

const levelOptions = ["A1", "A2", "B1", "B2", "C1", "C2", "IELTS", "GOETHE"];

// Tipo locale per gestire gli errori del form.
// Ogni chiave corrisponde a un campo e contiene il messaggio da mostrare.
type FormErrors = {
  title: string;
  description: string;
  level: string;
};

export default function FormCorso({ onClose, onSave }: FormCorsoProps) {
  // Stato dei campi del form.
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [level, setLevel] = useState("A1");

  // Stato degli errori mostrati all'utente.
  const [errors, setErrors] = useState<FormErrors>({
    title: "",
    description: "",
    level: "",
  });

  // Funzione di validazione centralizzata.
  // Restituisce true se il form è valido, false altrimenti.
  function validateForm() {
    const newErrors: FormErrors = {
      title: "",
      description: "",
      level: "",
    };

    const trimmedTitle = title.trim();
    const trimmedDescription = description.trim();

    // Validazione titolo.
    if (!trimmedTitle) {
      newErrors.title = "Il titolo è obbligatorio.";
    } else if (trimmedTitle.length < 3) {
      newErrors.title = "Il titolo deve contenere almeno 3 caratteri.";
    } else if (trimmedTitle.length > 60) {
      newErrors.title = "Il titolo non può superare i 60 caratteri.";
    }

    // Validazione descrizione.
    if (trimmedDescription.length > 300) {
      newErrors.description = "La descrizione non può superare i 300 caratteri.";
    }

    // Validazione livello.
    // Qui controlliamo che il valore scelto sia davvero uno di quelli ammessi.
    if (!levelOptions.includes(level)) {
      newErrors.level = "Seleziona un livello valido.";
    }

    setErrors(newErrors);

    // Il form è valido solo se tutti i messaggi di errore sono vuoti.
    return !newErrors.title && !newErrors.description && !newErrors.level;
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Se il form non è valido, interrompiamo il submit.
    if (!validateForm()) {
      return;
    }

    // Passiamo al parent i valori già ripuliti dagli spazi esterni.
    onSave({
      title: title.trim(),
      description: description.trim(),
      level,
    });

    // Reset del form dopo salvataggio.
    setTitle("");
    setDescription("");
    setLevel("A1");
    setErrors({
      title: "",
      description: "",
      level: "",
    });

    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
        <h2 className="mb-6 text-xl font-semibold text-gray-900">
          Nuovo corso
        </h2>

        <button
          type="button"
          className="absolute top-4 right-4 cursor-pointer text-2xl font-semibold text-gray-500 hover:text-gray-900"
          onClick={onClose}
          aria-label="Chiudi finestra"
        >
          ×
        </button>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
          <div>
            <input
              type="text"
              placeholder="Titolo corso"
              value={title}
              onChange={(event) => {
                setTitle(event.target.value);

                // Se l'utente modifica il titolo, rimuoviamo l'errore precedente
                // per dare un feedback immediato e meno invasivo.
                if (errors.title) {
                  setErrors((prev) => ({ ...prev, title: "" }));
                }
              }}
              className={`w-full rounded-lg border px-4 py-2 outline-none ${
                errors.title
                  ? "border-red-500 focus:border-red-500"
                  : "border-gray-300 focus:border-gray-500"
              }`}
              aria-invalid={Boolean(errors.title)}
              aria-describedby={errors.title ? "title-error" : undefined}
            />

            {errors.title && (
              <p id="title-error" className="mt-1 text-sm text-red-600">
                {errors.title}
              </p>
            )}
          </div>

          <div>
            <textarea
              placeholder="Descrizione"
              value={description}
              onChange={(event) => {
                setDescription(event.target.value);

                // Pulizia errore quando l'utente corregge il campo.
                if (errors.description) {
                  setErrors((prev) => ({ ...prev, description: "" }));
                }
              }}
              className={`min-h-30 w-full rounded-lg border px-4 py-2 outline-none ${
                errors.description
                  ? "border-red-500 focus:border-red-500"
                  : "border-gray-300 focus:border-gray-500"
              }`}
              aria-invalid={Boolean(errors.description)}
              aria-describedby={
                errors.description ? "description-error" : undefined
              }
            />

            {errors.description && (
              <p id="description-error" className="mt-1 text-sm text-red-600">
                {errors.description}
              </p>
            )}
          </div>

          <div>
            <select
              value={level}
              onChange={(event) => {
                setLevel(event.target.value);

                // Pulizia errore sul select quando l'utente cambia scelta.
                if (errors.level) {
                  setErrors((prev) => ({ ...prev, level: "" }));
                }
              }}
              className={`w-full rounded-lg border px-4 py-2 outline-none ${
                errors.level
                  ? "border-red-500 focus:border-red-500"
                  : "border-gray-300 focus:border-gray-500"
              }`}
              aria-invalid={Boolean(errors.level)}
              aria-describedby={errors.level ? "level-error" : undefined}
            >
              {levelOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>

            {errors.level && (
              <p id="level-error" className="mt-1 text-sm text-red-600">
                {errors.level}
              </p>
            )}
          </div>

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