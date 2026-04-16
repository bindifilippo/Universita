import type { NewCourseData } from "./course";

export type FormCorsoProps = {
  onClose: () => void;
  onSave: (courseData: NewCourseData) => void;
};