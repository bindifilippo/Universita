import type { Course } from "./course";

export type CourseDetailsModalProps = {
  course: Course;
  onClose: () => void;
};