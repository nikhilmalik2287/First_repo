# Student Management (MERN)

A small full-stack app to add, edit, delete and search students.

- **Backend:** Node.js, Express, MongoDB (Mongoose)
- **Frontend:** React (Vite), Axios

## Folder structure

```
student-mgmt/
├── server/
│   ├── models/Student.js     Mongoose schema
│   ├── routes/students.js    CRUD + search routes
│   ├── index.js              Express app + MongoDB connection
│   └── .env.example
└── client/
    ├── src/App.jsx           Form, table, search
    ├── src/App.css
    └── vite.config.js        Proxies /api to the server
```

## Setup

You need Node.js 18+ and MongoDB (local install, or a free MongoDB Atlas cluster).

### 1. Backend

```bash
cd server
npm install
cp .env.example .env      # then edit MONGO_URI if using Atlas
npm run dev
```

Server runs at http://localhost:5000

### 2. Frontend (new terminal)

```bash
cd client
npm install
npm run dev
```

Open http://localhost:5173

## API

| Method | Endpoint | Description |
|---|---|---|
| GET | /api/students?search=abc | List students (search by name, roll no, course) |
| GET | /api/students/:id | Get one student |
| POST | /api/students | Add a student |
| PUT | /api/students/:id | Update a student |
| DELETE | /api/students/:id | Delete a student |

Example body:

```json
{
  "name": "Riya Sharma",
  "rollNo": "CSE2024001",
  "email": "riya@example.com",
  "course": "B.Tech CSE",
  "year": 2,
  "phone": "9876543210"
}
```

## Ideas to extend

- Login for admins (JWT)
- Attendance and marks per student
- Pagination and sorting
- Export the list to CSV
