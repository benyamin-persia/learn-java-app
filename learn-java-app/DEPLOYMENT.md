# Deployment and Version Control — Learn Java App

This guide uses **100% free** hosting: **Vercel** (frontend), **Render** (backend), and **MongoDB Atlas** (free M0 cluster). You get **authentication and user progress** with no cost.

---

## Free stack overview

| Part        | Service        | Free tier |
|------------|----------------|-----------|
| Frontend   | **Vercel**     | Hobby plan: static sites, generous bandwidth |
| Backend    | **Render**     | Free web service (750 hrs/month; sleeps after 15 min inactivity, ~1 min cold start) |
| Database   | **MongoDB Atlas** | Free M0 cluster (512 MB) |

**Note:** Render’s free backend spins down after 15 minutes of no traffic. The first request after that may take ~1 minute to wake it; then it’s fast until idle again. Fine for learning and demos.

---

## Why frontend-only on Vercel?

**Vercel** hosts static sites and serverless functions. It does **not** run a long-lived Node/Express server. Your **backend** (Express + MongoDB + auth + progress) runs on **Render** (free) and connects to **MongoDB Atlas**. The frontend on Vercel calls the backend via `VITE_API_URL`.

---

## 1. Version control (Git + GitHub)

### 1.1 Initialize Git (if not already)

From the **workspace root** (`learn java` or the folder that contains `learn-java-app`):

```powershell
cd "c:\Users\apaosha\Desktop\learn java"
git init
```

### 1.2 Set your Git identity (required before first commit or push)

If you haven’t set a global Git user, run once (use your real name and GitHub email):

```powershell
git config --global user.email "your-email@example.com"
git config --global user.name "Your Name"
```

For this repo only (optional):

```powershell
cd "c:\Users\apaosha\Desktop\learn java"
git config user.email "your-email@example.com"
git config user.name "Your Name"
```

### 1.3 Stage and commit

```powershell
git add .
git status
git commit -m "Initial commit: Learn Java MERN app + curriculum"
```

### 1.4 Create a repo on GitHub and push

1. Go to [github.com/new](https://github.com/new).
2. Create a new repository (e.g. `learn-java-app`). **Do not** add a README or .gitignore (we already have them).
3. Copy the repo URL (e.g. `https://github.com/YOUR_USERNAME/learn-java-app.git`).

Then run (replace with your repo URL and use `main` if that’s your default branch):

```powershell
cd "c:\Users\apaosha\Desktop\learn java"
git remote add origin https://github.com/YOUR_USERNAME/learn-java-app.git
git branch -M main
git push -u origin main
```

---

## 2. Deploy backend to Render — free (auth + progress with MongoDB Atlas)

The backend handles **register/login** and **user progress** and stores everything in MongoDB. Render’s free tier is enough for this.

### 2.1 Create a MongoDB Atlas database (free)

1. Go to [cloud.mongodb.com](https://cloud.mongodb.com) and sign in.
2. Create a **free M0** cluster.
3. **Database Access** → Add user (username + password). Note the password.
4. **Network Access** → Add IP **0.0.0.0/0** (allow from anywhere; Render’s IPs vary).
5. **Connect** → **Drivers** → copy the connection string. It looks like:
   `mongodb+srv://USER:PASSWORD@cluster0.xxxxx.mongodb.net/learn-java?retryWrites=true&w=majority`
   Replace `<password>` with your DB user password.

### 2.2 Deploy backend on Render (free)

1. Go to [render.com](https://render.com) and sign in with GitHub.
2. **Dashboard** → **New +** → **Web Service**.
3. Connect **benyamin-persia/learn-java-app** (or your repo). Select it.
4. Configure:
   - **Name:** e.g. `learn-java-app-api`
   - **Region:** choose closest to you
   - **Branch:** `main`
   - **Root Directory:** set to **`learn-java-app/backend`**
   - **Runtime:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Instance Type:** **Free**
5. **Environment Variables** → **Add**:
   - **Key:** `MONGODB_URI` → **Value:** your Atlas connection string (from 2.1)
   - **Key:** `JWT_SECRET` → **Value:** a long random string (e.g. [randomkeygen.com](https://randomkeygen.com))
   - **Key:** `NODE_ENV` → **Value:** `production` (optional)
6. Click **Create Web Service**. Render will build and deploy. Wait until status is **Live**.
7. Copy your service URL from the top (e.g. `https://learn-java-app-api.onrender.com`). This is your **backend API URL** — no trailing slash.

### 2.3 Seed the database (first-time curriculum data)

Your backend needs curriculum data (weeks, topics, projects) in MongoDB. Run the seed **once** from your machine, using the same Atlas database:

1. In your project: `cd learn-java-app/backend`, copy `.env.example` to `.env`.
2. Set `MONGODB_URI` to your **Atlas** connection string (same as on Render).
3. Run: `npm run seed`. Atlas will then have the curriculum; the Render backend will read it.

After seeding, the backend API will return weeks, topics, and projects; auth and progress will be stored in Atlas.

---

## 3. Deploy frontend to Vercel — free (and connect it to the backend)

Vercel will build and host the **frontend** for free. Set **VITE_API_URL** so it talks to your Render backend.

### 3.1 One-time setup

1. Sign in at [vercel.com](https://vercel.com) (e.g. with GitHub).
2. **Add New… → Project** → import **benyamin-persia/learn-java-app**.
3. **Root Directory:** set to **`learn-java-app/frontend`**.
4. **Environment Variables** (expand the section): add:
   - **Name:** `VITE_API_URL`
   - **Value:** your Render backend URL from step 2.2 (e.g. `https://learn-java-app-api.onrender.com`) — **no trailing slash**.
5. Click **Deploy**. After the build, you get a URL like `https://learn-java-app-xxx.vercel.app`.

The live site will call your Render backend for **login, register, and progress**; the backend uses **MongoDB Atlas**, so auth and progress are stored there.

### 3.2 If you deploy first without the backend

If you deployed the frontend before adding the backend, add **VITE_API_URL** in Vercel (**Project → Settings → Environment Variables**), then **Redeploy** the project so the new variable is applied.

---

## 4. Rebuild and redeploy (after changes)

- **GitHub:** after you change code, commit and push:
  ```powershell
  git add .
  git commit -m "Your message"
  git push
  ```
- **Vercel:** every push to `main` triggers a new frontend deployment. You can also trigger a redeploy from the Vercel dashboard.
- **Render:** every push to `main` can trigger a backend redeploy if auto-deploy is on (default); otherwise redeploy from the Render dashboard.

---

## 5. Summary (100% free: auth + progress)

| Step              | Action |
|-------------------|--------|
| Version control   | Push repo to GitHub (e.g. `benyamin-persia/learn-java-app`). |
| MongoDB Atlas     | Free M0 cluster, user, allow 0.0.0.0/0, copy connection string. |
| Backend (Render)  | Free Web Service, root `learn-java-app/backend`, set `MONGODB_URI`, `JWT_SECRET`. |
| Seed curriculum   | Run `npm run seed` in backend locally with Atlas `MONGODB_URI` (once). |
| Frontend (Vercel) | Deploy from GitHub, root `learn-java-app/frontend`, set `VITE_API_URL` = Render backend URL. |

**Result:** **Vercel** (free) = UI; **Render** (free) = API; **MongoDB Atlas** (free) = auth and user progress. No cost.
