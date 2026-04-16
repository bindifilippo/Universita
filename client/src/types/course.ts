import type { Student } from "./student";

export type CourseStatus = "Da iniziare" | "In corso" | "Completato";

export type Course = {
  id: number;
  level: string;
  title: string;
  description: string;
  status: CourseStatus;
  students: Student[];
};

export type NewCourseData = {
  title: string;
  description: string;
  level: string;
};

export type UpdateCourseData = {
  title: string;
  description: string;
  level: string;
  status: CourseStatus;
};