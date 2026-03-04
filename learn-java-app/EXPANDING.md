# Expanding the Learn Java App

This guide explains how to add **more weeks**, **topics**, **activities**, **quizzes**, and **projects** so the app stays comprehensive and complete as you learn.

---

## 1. Adding a new week

### Backend: seed script

1. Open **`backend/scripts/seedCurriculum.js`**.
2. Create a new array (e.g. `week3Topics`) with the same structure as `week2Topics`:
   - Each topic: `order`, `slug`, `title`, `lessonContent`, `activities`, `quizQuestions`.
3. After seeding Week 2, add:

```javascript
const week3 = await Week.create({
  order: 3,
  slug: 'week-3-your-slug',
  title: 'Week 3: Your Title',
  description: 'Short description.',
  topics: week3Topics,
});
```

4. If you have projects for that week, set `weekId: week3._id` when creating those projects.
5. Run **`npm run seed`** again (it only deletes/creates Week 2 and all projects; adjust if you need to re-seed Week 3 without wiping it).

### Frontend

No code change needed. The **Dashboard** and **Week list** load weeks from **`GET /api/curriculum/weeks`**. New weeks returned by the API will show up automatically.

---

## 2. Adding topics to an existing week

1. In **`backend/scripts/seedCurriculum.js`**, find the week’s topic array (e.g. `week2Topics`).
2. Push a new topic object:

```javascript
{
  order: 13,  // next number
  slug: 'your-topic-slug',
  title: 'Your Topic Title',
  lessonContent: `## Your lesson in Markdown...`,
  activities: [ /* optional */ ],
  quizQuestions: [ /* optional */ ],
}
```

3. Re-run the seed for that week (or update the seed so it only replaces that week’s topics if you prefer).

---

## 3. Activity types (for topics)

Each topic’s `activities` array can use:

### Drag-order (put steps in order)

```javascript
{
  type: 'drag-order',
  instruction: 'Order the steps...',
  options: [
    { id: 'a', text: 'First step', correctOrder: 1 },
    { id: 'b', text: 'Second step', correctOrder: 2 },
  ],
  correctAnswer: ['a', 'b'],  // correct order of ids
  explanation: 'Optional explanation after check.',
}
```

### Match-pairs (drag left item to right)

```javascript
{
  type: 'match-pairs',
  instruction: 'Match the concept to the definition.',
  options: [
    { id: 'enc', text: 'Encapsulation', correctMatch: 'wrap' },
  ],
  matchOptions: [
    { id: 'wrap', text: 'Wrapping data and methods' },
  ],
  correctAnswer: [['enc', 'wrap']],
  explanation: 'Optional.',
}
```

### Multiple-choice (single question)

```javascript
{
  type: 'multiple-choice',
  instruction: 'What is...?',
  options: [
    { id: 'a', text: 'Option A' },
    { id: 'b', text: 'Correct answer' },
  ],
  correctAnswer: 'b',
  explanation: 'Optional.',
}
```

---

## 4. Quiz questions (per topic)

Inside each topic’s `quizQuestions`:

```javascript
{
  question: 'What is produced by the Java compiler?',
  options: [
    { id: 'a', text: 'Native machine code' },
    { id: 'b', text: 'Bytecode' },
  ],
  correctOptionId: 'b',
  explanation: 'Optional explanation after submit.',
}
```

---

## 5. Adding a new project

1. In **`backend/scripts/seedCurriculum.js`**, add to the `projects` array (or create it for a new week and use that week’s `_id` for `weekId`):

```javascript
{
  order: 5,
  slug: 'your-project-slug',
  title: 'Your Project Title',
  description: 'What the project does and what you will practice.',
  weekId: week2._id,  // or week3._id, etc.
  concepts: ['Concept 1', 'Concept 2'],
  steps: [
    {
      order: 1,
      title: 'Step 1 title',
      description: 'What to do.',
      concepts: ['Concept 1'],
      hints: ['Hint 1', 'Hint 2'],
    },
  ],
}
```

2. Run **`npm run seed`** (or your script that seeds projects).
3. The **Projects** page uses **`GET /api/curriculum/projects`**, so the new project will appear automatically.

---

## 6. Progress and authentication (future)

- **Current:** One global user (`userId: 'default'`). Progress is stored in **UserProgress** (lesson/activity/quiz/project completion).
- **To add auth later:**  
  - Add login (e.g. JWT).  
  - In **`backend/routes/progress.js`**, use the authenticated user’s id instead of `DEFAULT_USER_ID`.  
  - In **frontend**, send the token (e.g. in `Authorization` header) and optionally store it in context.  
  - No change needed to the curriculum or project structure.

---

## 7. Summary checklist for a new week

- [ ] Add a new week document in the seed script (`order`, `slug`, `title`, `description`, `topics`).
- [ ] Add topics with `lessonContent`, `activities`, `quizQuestions`.
- [ ] Optionally add projects and set their `weekId` to the new week’s `_id`.
- [ ] Run **`npm run seed`** in the backend.
- [ ] Open the app: the new week appears on the Dashboard; new projects appear on the Projects page.

No frontend changes are required for simply adding weeks, topics, or projects; the app is designed to be **expandable** from the backend and seed data.
