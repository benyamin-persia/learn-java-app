# Learn Java — Backend

API for curriculum (weeks, topics, projects) and user progress. Uses MongoDB.

## Run the app

1. **Start the MongoDB server** (the database process, not just the shell or Compass):
   - **Windows:** Open Command Prompt or PowerShell **as Administrator**, then run:
     ```bash
     net start MongoDB
     ```
     If the service name is different (e.g. `MongoDB`), check Services or run `sc query type= service state= all` and look for MongoDB.
   - **macOS/Linux:** Usually `mongod` is in PATH; run `mongod` in a terminal, or use your package manager’s service (e.g. `brew services start mongodb-community`).

2. **Install dependencies and start the backend:**
   ```bash
   npm install
   npm run dev
   ```
   If MongoDB was not running when you started the backend, it will try to reconnect every 5 seconds. Once MongoDB is up, refresh the frontend.

3. **Seed the database** (once, or when you want to reset curriculum data):
   ```bash
   npm run seed
   ```

4. **Frontend:** From the project root, run the frontend (e.g. `cd ../frontend && npm run dev`). It proxies `/api` to this backend (port 5000).

## Environment

Create a `.env` file in this folder (copy from `.env.example`). Variables:

- `PORT` — default `5000`
- `MONGODB_URI` — default `mongodb://localhost:27017/learn-java`
- `JWT_SECRET` — **required for auth**; use a long random string in production (e.g. `openssl rand -hex 32`)

### Using MongoDB Atlas

1. In Atlas, create a database user (Database Access). Username must be ASCII letters, numbers, hyphens, or underscores, and start with a letter or number (no leading symbols like `!`).
2. Get your connection string and replace `<db_password>` with the user’s password.
3. Add the database name to the URI so progress and users are stored in one database, e.g.:
   ```bash
   MONGODB_URI=mongodb+srv://12q3wa4esz:YOUR_PASSWORD@cluster0.nsiny.mongodb.net/learn-java?appName=Cluster0
   ```
4. Run `npm run seed` once to seed curriculum. User accounts and progress are created when users register or use the app.
