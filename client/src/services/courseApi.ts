import type { Course, NewCourseData, UpdateCourseData } from "../types";

const API_BASE_URL = "/corsi";

async function parseError(response: Response): Promise<string> {
  try {
    const data = await response.json();

    if (typeof data?.message === "string" && data.message.trim() !== "") {
      return data.message;
    }

    if (typeof data?.error === "string" && data.error.trim() !== "") {
      return data.error;
    }

    return `HTTP error ${response.status}`;
  } catch {
    return `HTTP error ${response.status}`;
  }
}

async function handleJsonResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const message = await parseError(response);
    throw new Error(message);
  }

  return response.json() as Promise<T>;
}

/**
 * Recupera tutti i corsi.
 */
export async function getCourses(): Promise<Course[]> {
  const response = await fetch(API_BASE_URL, {
    method: "GET",
  });

  return handleJsonResponse<Course[]>(response);
}

/**
 * Crea un nuovo corso.
 */
export async function createCourse(data: NewCourseData): Promise<Course> {
  const response = await fetch(API_BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return handleJsonResponse<Course>(response);
}

/**
 * Aggiorna un corso esistente.
 */
export async function updateCourse(
  id: number,
  data: UpdateCourseData
): Promise<Course> {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return handleJsonResponse<Course>(response);
}

/**
 * Elimina un corso.
 */
export async function deleteCourse(id: number): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const message = await parseError(response);
    throw new Error(message);
  }
}