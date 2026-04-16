import type { Course } from "./course";

export type CardCorsoProps = {
  course: Course;
  onEdit: () => void;
  onExplore: () => void;
};