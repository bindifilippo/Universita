import { useState } from "react";
import type { FormCorsoProps } from "../types";

const levelOptions = ["A1", "A2", "B1", "B2", "C1", "C2", "IELTS", "GOETHE"];
const statoOptions = ["Da iniziare", "In corso", "Completato"] as const;

type FormErrors = {
  titolo: string;
  descrizione: string;
  livello: string;
  annoCreazione: string;
  stato: string;
};

export default function FormCorso({ onClose, onSave }: FormCorsoProps) {
  const [titolo, setTitolo] = useState("");
  const [descrizione, setDescrizione] = useState("");
  const [livello, setLivello] = useState("A1");
  const [annoCreazione, setAnnoCreazione] = useState(
    new Date().getFullYear().toString()
  );
  const [stato, setStato] = useState<"Da iniziare" | "In corso" | "Completato">(
    "Da iniziare"
  );

  const [errors, setErrors] = useState<FormErrors>({
    titolo: "",
    descrizione: "",
    livello: "",
    annoCreazione: "",
    stato: "",
  });

  function validateForm() {
    const newErrors: FormErrors = {
      titolo: "",
      descrizione: "",
      livello: "",
      annoCreazione: "",
      stato: "",
    };

    const titoloPulito = titolo.trim();
    const descrizionePulita = descrizione.trim();
    const annoNumerico = Number(annoCreazione);

    if (!titoloPulito) {
      newErrors.titolo = "Il titolo è obbligatorio.";
    } else if (titoloPulito.length < 3) {
      newErrors.titolo = "Il titolo deve contenere almeno 3 caratteri.";
    } else if (titoloPulito.length > 60) {
      newErrors.titolo = "Il titolo non può superare i 60 caratteri.";
    }

    if (descrizionePulita.length > 300) {
      newErrors.descrizione = "La descrizione non può superare i 300 caratteri.";
    }

    if (!levelOptions.includes(livello)) {
      newErrors.livello = "Seleziona un livello valido.";
    }

    if (!annoCreazione.trim()) {
      newErrors.annoCreazione = "L'anno di creazione è obbligatorio.";
    } else if (!Number.isInteger(annoNumerico)) {
      newErrors.annoCreazione = "Inserisci un anno valido.";
    } else if (annoNumerico < 1900 || annoNumerico > 2100) {
      newErrors.annoCreazione = "L'anno deve essere compreso tra 1900 e 2100.";
    }

    if (!statoOptions.includes(stato)) {
      newErrors.stato = "Seleziona uno stato valido.";
    }

    setErrors(newErrors);

    return (
      !newErrors.titolo &&
      !newErrors.descrizione &&
      !newErrors.livello &&
      !newErrors.annoCreazione &&
      !newErrors.stato
    );
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    onSave({
      titolo: titolo.trim(),
      descrizione: descrizione.trim() || undefined,
      livello,
      annoCreazione: Number(annoCreazione),
      stato,
    });

    setTitolo("");
    setDescrizione("");
    setLivello("A1");
    setAnnoCreazione(new Date().getFullYear().toString());
    setStato("Da iniziare");
    setErrors({
      titolo: "",
      descrizione: "",
      livello: "",
      annoCreazione: "",
      stato: "",
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
              value={titolo}
              onChange={(event) => {
                setTitolo(event.target.value);
                if (errors.titolo) {
                  setErrors((prev) => ({ ...prev, titolo: "" }));
                }
              }}
              className={`w-full rounded-lg border px-4 py-2 outline-none ${
                errors.titolo
                  ? "border-red-500 focus:border-red-500"
                  : "border-gray-300 focus:border-gray-500"
              }`}
              aria-invalid={Boolean(errors.titolo)}
              aria-describedby={errors.titolo ? "titolo-error" : undefined}
            />

            {errors.titolo && (
              <p id="titolo-error" className="mt-1 text-sm text-red-600">
                {errors.titolo}
              </p>
            )}
          </div>

          <div>
            <textarea
              placeholder="Descrizione"
              value={descrizione}
              onChange={(event) => {
                setDescrizione(event.target.value);
                if (errors.descrizione) {
                  setErrors((prev) => ({ ...prev, descrizione: "" }));
                }
              }}
              className={`min-h-30 w-full rounded-lg border px-4 py-2 outline-none ${
                errors.descrizione
                  ? "border-red-500 focus:border-red-500"
                  : "border-gray-300 focus:border-gray-500"
              }`}
              aria-invalid={Boolean(errors.descrizione)}
              aria-describedby={
                errors.descrizione ? "descrizione-error" : undefined
              }
            />

            {errors.descrizione && (
              <p id="descrizione-error" className="mt-1 text-sm text-red-600">
                {errors.descrizione}
              </p>
            )}
          </div>

          <div>
            <input
              type="number"
              placeholder="Anno di creazione"
              value={annoCreazione}
              onChange={(event) => {
                setAnnoCreazione(event.target.value);
                if (errors.annoCreazione) {
                  setErrors((prev) => ({ ...prev, annoCreazione: "" }));
                }
              }}
              className={`w-full rounded-lg border px-4 py-2 outline-none ${
                errors.annoCreazione
                  ? "border-red-500 focus:border-red-500"
                  : "border-gray-300 focus:border-gray-500"
              }`}
              aria-invalid={Boolean(errors.annoCreazione)}
              aria-describedby={
                errors.annoCreazione ? "annoCreazione-error" : undefined
              }
            />

            {errors.annoCreazione && (
              <p id="annoCreazione-error" className="mt-1 text-sm text-red-600">
                {errors.annoCreazione}
              </p>
            )}
          </div>

          <div>
            <select
              value={livello}
              onChange={(event) => {
                setLivello(event.target.value);
                if (errors.livello) {
                  setErrors((prev) => ({ ...prev, livello: "" }));
                }
              }}
              className={`w-full rounded-lg border px-4 py-2 outline-none ${
                errors.livello
                  ? "border-red-500 focus:border-red-500"
                  : "border-gray-300 focus:border-gray-500"
              }`}
              aria-invalid={Boolean(errors.livello)}
              aria-describedby={errors.livello ? "livello-error" : undefined}
            >
              {levelOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>

            {errors.livello && (
              <p id="livello-error" className="mt-1 text-sm text-red-600">
                {errors.livello}
              </p>
            )}
          </div>

          <div>
            <select
              value={stato}
              onChange={(event) => {
                setStato(event.target.value as "Da iniziare" | "In corso" | "Completato");
                if (errors.stato) {
                  setErrors((prev) => ({ ...prev, stato: "" }));
                }
              }}
              className={`w-full rounded-lg border px-4 py-2 outline-none ${
                errors.stato
                  ? "border-red-500 focus:border-red-500"
                  : "border-gray-300 focus:border-gray-500"
              }`}
              aria-invalid={Boolean(errors.stato)}
              aria-describedby={errors.stato ? "stato-error" : undefined}
            >
              {statoOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>

            {errors.stato && (
              <p id="stato-error" className="mt-1 text-sm text-red-600">
                {errors.stato}
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