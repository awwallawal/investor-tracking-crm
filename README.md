# OYSIPA Investor Tracking System

This is a full-stack application for the Oyo State Investment Promotion Agency (OYSIPA) to track investors and manage projects.

## Project Structure

This project is a monorepo managed with `npm workspaces`.

- `apps/frontend`: The React/Vite frontend application.
- `apps/api`: The Node.js/Express backend API.
- `docs`: Project documentation (PRD, Architecture, UI/UX Spec, Stories).

## Getting Started

### Prerequisites

- Node.js (LTS version recommended)
- npm (comes with Node.js)
- Git

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd investor_tracking_system
    ```

2.  **Install root dependencies:**
    This will install dependencies for both frontend and backend applications.
    ```bash
    npm install
    ```

### Running the Applications

#### Backend API

To start the backend API server:

```bash
cd apps/api
npm run dev
```

The API server should start on `http://localhost:3000` (or the port specified in `apps/api/src/index.ts`).

#### Frontend Application

To start the frontend development server:

```bash
cd apps/frontend
npm run dev
```

The frontend application should open in your browser, typically at `http://localhost:5173`.

## Health Check

You can verify the backend API is running by navigating to `http://localhost:3000/health` in your browser or by using `curl`:

```bash
curl http://localhost:3000/health
```

It should return: `{"status":"ok"}`

## Running Tests

#### Backend Tests

To run backend tests:

```bash
cd apps/api
npm test
```
