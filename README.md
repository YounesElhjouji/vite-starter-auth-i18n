# Vite + Express Starter: Auth & i18n Ready

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Overview

This project is a **full-stack TypeScript starter template** designed to accelerate the development of modern web applications. It provides a solid foundation with a Vite-powered frontend, an Express backend, secure authentication, and internationalization (i18n) support already set up.

**The goal is simple:** Skip the repetitive setup and boilerplate for common features like authentication and i18n, and jump straight into building your application's core logic and unique features.

[Deployed Website](https://vite-starter-auth-i18n.vercel.app/)

## Key Features

- **Frontend (Vite + React + TypeScript):**
  - Blazing fast development server and build process with Vite.
  - React with TypeScript for robust component development.
  - Routing handled by `react-router-dom`.
  - Styling with **Tailwind CSS** and **shadcn/ui** components.
  - Dark Mode toggle ready.
  - **Internationalization (i18n):** Pre-configured with `i18next` and `react-i18next` for English and French.
- **Backend (Express + TypeScript):**
  - Robust Node.js backend using the Express framework.
  - Written entirely in TypeScript for type safety.
  - **Layered Architecture:** Clear separation of concerns (Routes/Controllers, Services).
  - **Database:** PostgreSQL integration using **Prisma ORM** for type-safe database access and migrations.
  - **Authentication:** Secure username/password authentication using `bcrypt` for hashing and **JWT (JSON Web Tokens)** for session management (Access + Refresh tokens stored in HttpOnly cookies).
- **Developer Experience:**
  - Full TypeScript support across frontend and backend.
  - Optimized for rapid development and iteration.
  - Clear project structure.

## Tech Stack

**Frontend:**

- Vite
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- `react-router-dom`
- `i18next` / `react-i18next`
- `lucide-react` (for icons)

**Backend:**

- Node.js
- Express
- TypeScript
- Prisma
- PostgreSQL
- `jsonwebtoken`
- `bcrypt`
- `cookie-parser`
- `cors`
- `dotenv`
- `zod` (Recommended for validation)

**Database:**

- PostgreSQL (Setup instructions assume Docker)

## Getting Started

### Prerequisites

- Node.js (v18 or later recommended)
- Yarn (v1 or later)
- Docker & Docker Compose (for running PostgreSQL locally)

### Setup

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/YounesElhjouji/vite-starter-auth-i18n.git your-project-name
    cd your-project-name
    ```

2.  **Install Frontend Dependencies:**

    ```bash
    cd frontend
    yarn install
    cd ..
    ```

3.  **Install Backend Dependencies:**

    ```bash
    cd backend
    yarn install
    ```

4.  **Set up PostgreSQL Database:**

    - Ensure Docker is running.
    - Start the PostgreSQL container using Docker Compose (recommended for data persistence):
      ```bash
      docker-compose up -d
      ```
    - _Alternatively, use the single Docker command (data is not persisted if container is removed):_
      ```bash
      # docker run --name my-postgres-db -e POSTGRES_USER=myuser -e POSTGRES_PASSWORD=mypassword -e POSTGRES_DB=mydatabase -p 5432:5432 -d postgres:15
      ```

5.  **Configure Backend Environment Variables:**

    - Copy the example environment file:
      ```bash
      cp .env.example .env
      ```
    - Edit the `.env` file:
      - Update `DATABASE_URL` with your PostgreSQL connection details (defaults match the Docker setup above).
      - **Important:** Generate strong, unique secrets for `ACCESS_TOKEN_SECRET` and `REFRESH_TOKEN_SECRET`. You can use `openssl rand -hex 32` to generate them.
      - Adjust `PORT` if needed.

6.  **Run Database Migrations:**
    - Apply the Prisma schema to your database:
      ```bash
      yarn prisma:migrate
      ```
      _(This uses the `prisma migrate dev` command)_

## Running the Application (Development)

You'll need two separate terminal windows:

1.  **Start the Backend Server:**

    ```bash
    cd backend
    yarn dev
    ```

    _(Backend typically runs on `http://localhost:1111` or the port specified in `.env`)_

2.  **Start the Frontend Development Server:**
    ```bash
    cd frontend
    yarn dev
    ```
    _(Frontend typically runs on `http://localhost:5173`)_

Open your browser and navigate to the frontend URL (e.g., `http://localhost:5173`).

## Authentication Flow

1.  **Signup (`/api/auth/signup`):** User provides username/password. Password is hashed using `bcrypt` before storing in the database.
2.  **Login (`/api/auth/login`):** User provides username/password. Server verifies credentials. Upon success, it generates:
    - An **Access Token** (short-lived JWT)
    - A **Refresh Token** (longer-lived JWT)
      Both tokens are sent back to the client via secure, `HttpOnly` cookies.
3.  **Authenticated Requests:** The client automatically sends the `accessToken` cookie with subsequent requests.
4.  **Middleware (`authMiddleware`):** Verifies the `accessToken` on protected backend routes. If valid, fetches user details and attaches them to the request object. If invalid/expired, returns a 401 error.
5.  **Token Refresh (TODO):** A dedicated endpoint (`/api/auth/refresh`) would typically use the `refreshToken` cookie to issue a new `accessToken` when the current one expires. _(This part is often added as needed)_.
6.  **Logout (`/api/auth/logout`):** Clears the authentication cookies on the client-side via server response headers.

## Internationalization (i18n)

- Uses `i18next` and `react-i18next`.
- Translation files are located in `frontend/public/locales/{en,fr}/translation.json`.
- The `useTranslation` hook is used in components to access translated strings via the `t()` function.
- Language detection is configured (browser, localStorage).
- A language switcher is included in the `Topbar`.

## Further Development

- Implement the refresh token endpoint and logic on the backend.
- Add frontend logic to handle access token expiry and automatically use the refresh token.
- Add more robust validation using `zod` on the backend.
- Expand Prisma models and create new migrations as needed.
- Build out your application-specific features, routes, and components.
- Implement authorization logic (roles/permissions) if required.
- Write unit and integration tests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details (or simply state MIT License if no file exists).
