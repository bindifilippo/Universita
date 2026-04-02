# University

## Short intro

**Universita** is a full-stack web application designed as a university management project.  
It combines a modern frontend interface with a Java backend to model and manage core academic entities such as courses, teachers, and students.

The project is structured to reflect a real-world full-stack workflow, with a clear separation between presentation, business logic, persistence, and security.

## Technologies

### Frontend
- React
- TypeScript
- Vite
- Tailwind CSS

### Backend
- Java 17
- Spring Boot
- Spring Data JPA
- Spring Security
- Spring Validation
- PostgreSQL
- Maven
- Docker

## The process

I approached this project as a full-stack application with two clearly separated parts: a frontend client and a backend server.

On the **backend**, I organized the project using a layered architecture:
- **controllers** for handling HTTP requests
- **services** for business logic
- **repositories** for database access
- **models** for domain entities
- **DTOs** for request and response handling
- **security** for configuration and access control

The domain model currently includes:
- `Corso`
- `Insegnante`
- `Studente`

This structure helped me keep the code easier to understand, extend, and maintain.

I also configured:
- a PostgreSQL connection for data persistence
- Spring Security for backend protection and configuration
- Docker support for running the backend in a containerized environment

## What I learned

This project helped me practice how to structure a full-stack application.

On the frontend, I improved my understanding of:

-reusable React components
-TypeScript props typing

On the backend, I learned more about:

-organizing a Spring Boot project with layered architecture
-working with entities, repositories, services, and controllers
-handling PostgreSQL configuration with JPA
-introducing backend security configuration
-preparing a Java application for Docker deployment
