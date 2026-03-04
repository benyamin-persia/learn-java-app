# Learn Java — MERN Learning App

A **comprehensive, expandable** learning platform to study Java (and more) through **teach → play → quiz → project**. Built with MERN: MongoDB, Express, React, Node.

## What it does

- **Curriculum by week** — Start with Week 2 (Object-Oriented Programming). Each week has multiple topics.
- **Per-topic flow:**  
  1. **Lesson** — Read the content.  
  2. **Activities** — Drag-and-drop (order, match pairs), multiple choice.  
  3. **Quiz** — Multiple-choice questions; progress is saved.
- **Real-world projects** — Four guided projects (Library, Bank, Product Catalog, Task Tracker) with step-by-step instructions and concepts.
- **Progress** — Stored in MongoDB (lesson/activity/quiz completion, project steps). Ready to extend with auth later.

## Quick start

### Prerequisites

- **Node.js** 18+
- **MongoDB** — must be running (e.g. start `mongod` or use MongoDB Atlas). The seed and API need a live connection; without it, the backend will fail to connect.

### 1. Backend

```bash
cd backend
npm install
cp .env.example .env
# Edit .env: set MONGODB_URI if needed (default: mongodb://localhost:27017/learn-java)
npm run seed    # Seed Week 2 + 4 projects
npm run dev     # Start API on http://localhost:5000
```

### 2. Frontend

```bash
cd frontend
npm install
npm run dev     # Vite dev server on http://localhost:3000 (proxies /api to backend)
```

### 3. Use the app

- Open **http://localhost:3000**
- Click **Week 2: Object-Oriented Programming** → pick a topic → do Lesson → Activities → Quiz.
- Open **Projects** to work through the four real-world projects.

## Project layout

```
learn-java-app/
├── backend/
│   ├── server.js           # Express app, DB connect
│   ├── models/
│   │   ├── Week.js         # Curriculum: weeks + topics (lesson, activities, quiz)
│   │   ├── Project.js      # Projects with steps
│   │   └── UserProgress.js # Per-user progress
│   ├── routes/
│   │   ├── curriculum.js   # GET weeks, week, topic, projects
│   │   └── progress.js    # GET/POST progress
│   └── scripts/
│       └── seedCurriculum.js  # Seed Week 2 + 4 projects
├── frontend/
│   ├── src/
│   │   ├── App.jsx         # Routes
│   │   ├── api/client.js   # API calls
│   │   ├── context/ProgressContext.jsx
│   │   ├── pages/         # Dashboard, WeekView, TopicView, ProjectList, ProjectDetail
│   │   └── components/    # LessonContent, DragOrder, MatchPairs, MultipleChoice, Quiz
│   └── index.html
└── EXPANDING.md            # How to add more weeks and content
```

## Adding more weeks

See **[EXPANDING.md](./EXPANDING.md)** for:

- Adding a new week (e.g. Week 3) to the backend and seed
- Adding new topics, activities, and quiz questions
- Adding new projects
- Optional: authentication and per-user progress

## Tech stack

- **Backend:** Node, Express, Mongoose, MongoDB  
- **Frontend:** React 18, React Router, Vite, react-markdown, @dnd-kit (drag and drop)  
- **Design:** CSS variables, Outfit + JetBrains Mono

## License

Use this project for learning and extension as you like.
