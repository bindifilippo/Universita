import type { Student } from "./student";

export type CourseStatus = "Da iniziare" | "In corso" | "Completato";

export type Course = {
  id: number;
  titolo: string;
  annoCreazione: number;
  livello: string;
  stato: CourseStatus;
  descrizione?: string;
  studenti?: Student[];
};

export type NewCourseData = {
  titolo: string;
  annoCreazione: number;
  livello: string;
  stato: CourseStatus;
  descrizione?: string;
};

export type UpdateCourseData = {
  titolo: string;
  annoCreazione: number;
  livello: string;
  stato: CourseStatus;
  descrizione?: string;
};