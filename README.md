
# Smart Sauna Demo

## Live Demo

You can try the running demo here:

* **Frontend:** [https://smart-sauna-demo.vercel.app](https://smart-sauna-demo.vercel.app)
* **Backend API:** [https://smart-sauna-demo.onrender.com/api/sauna](https://smart-sauna-demo.onrender.com/api/sauna)

(Demo backend may take a few seconds to wake on first request due to free-tier hosting.)

---
## Overview

Smart Sauna Demo is a modern fullstack proof-of-concept application designed to simulate a digital sauna experience. It demonstrates:

* Backend simulation of sauna state (temperature, humidity, mode).
* A clean service-layer architecture.
* REST API for controlling sauna behavior.
* Unit testing using Jest.
* Continuous Integration with GitHub Actions.
* Frontend dashboard built with React + Vite.

---


## Project Structure

```
smart-sauna-demo/
│
├── backend/
│   ├── src/
│   │   ├── index.js                 # Express application entrypoint
│   │   ├── routes/sauna.js          # API routes
│   │   └── services/saunaService.js # Sauna simulation + logic
│   │
│   ├── tests/
│   │   └── saunaService.test.js     # Jest unit tests
│   │
│   ├── package.json
│   └── package-lock.json
│
├── frontend/
│   ├── src/                         # React + Vite frontend
│   └── package.json
│
└── .github/
    └── workflows/backend-tests.yml  # CI pipeline
```

---

## Backend

### Installation & Run

```
cd backend
npm install
npm start
```

Backend will run at **[http://localhost:4000](http://localhost:4000)**.

### API Endpoints

#### GET `/api/sauna`

Returns the current sauna state.

#### POST `/api/sauna/command`

Controls sauna operations.

Examples:

```
{
  "type": "SET_TARGET_TEMPERATURE",
  "payload": { "temperature": 75 }
}
```

```
{
  "type": "TURN_OFF"
}
```

---

## Testing

Run unit tests:

```
npm test
```

Tests cover:

* Initial sauna state
* Temperature setting logic
* Error handling
* Turning sauna off

---

## Continuous Integration

GitHub Actions pipeline automatically runs backend tests on every push.

Workflow file:

```
.github/workflows/backend-tests.yml
```

Pipeline steps:

* Checkout repository
* Setup Node.js
* Install dependencies
* Run Jest test suite

---

## Frontend

### Installation & Run

```
cd frontend
npm install
npm run dev
```

Provides a simple dashboard to view and control sauna state.

---

---

## Environment Variables

### Frontend (.env)

Create `.env` in the **frontend** folder:

```
VITE_API_URL=http://localhost:4000
```

For production (Vercel):

```
VITE_API_URL=https://your-backend-url.com
```

> Note: Vite exposes only variables that start with `VITE_`.

Use in frontend code:

```
const API_URL = import.meta.env.VITE_API_URL;
```

### Backend (.env)

Create `.env` in the **backend** folder:

```
PORT=4000
CORS_ORIGIN=https://your-frontend-url.vercel.app
```

Use in backend code:

```
app.use(cors({ origin: process.env.CORS_ORIGIN }));
```

---





## Purpose

This demo was created to showcase:

* Modern fullstack development practices.
* Clear architecture and clean separation of concerns.
* Ability to work with backend + frontend + CI.

---














