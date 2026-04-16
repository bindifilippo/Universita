import type { Course, UpdateCourseData } from "./course";

export type EditCourseModalProps = {
  course: Course;
  onClose: () => void;
  onSave: (id: number, updatedData: UpdateCourseData) => void;
  onDelete: (id: number) => void;
};