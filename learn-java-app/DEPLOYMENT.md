# Deployment and Version Control — Learn Java App

This guide walks you through **pushing the project to GitHub** and **deploying the frontend to Vercel** so you can see the app live.

---

## 1. Version control (Git + GitHub)

### 1.1 Initialize Git (if not already)

From the **workspace root** (`learn java` or the folder that contains `learn-java-app`):

```powershell
cd "c:\Users\apaosha\Desktop\learn java"
git init
```

### 1.2 Stage and commit

```powershell
git add .
git status
git commit -m "Initial commit: Learn Java MERN app + curriculum"
```

### 1.3 Create a repo on GitHub and push

1. Go to [github.com/new](https://github.com/new).
2. Create a new repository (e.g. `learn-java-app`). **Do not** add a README or .gitignore (we already have them).
3. Copy the repo URL (e.g. `https://github.com/YOUR_USERNAME/learn-java-app.git`).

Then run (replace with your repo URL):

```powershell
git remote add origin https://github.com/YOUR_USERNAME/learn-java-app.git
git branch -M main
git push -u origin main
```

---

## 2. Deploy frontend to Vercel (see it live)

Vercel will build and host the **frontend** so you get a live URL.

### 2.1 One-time setup

1. Sign in at [vercel.com](https://vercel.com) (GitHub login is easiest).
2. **Import** your GitHub repo: **Add New… → Project** and select `learn-java-app` (or the repo you created).
3. **Root Directory:** set to `learn-java-app/frontend` (so Vercel builds the Vite app).
4. **Build & Output:** leave as-is (Vite is auto-detected; `npm run build`, output `dist`).
5. Click **Deploy**. After the build, you get a URL like `https://learn-java-app-xxx.vercel.app`.

### 2.2 Optional: Connect backend for full functionality

The frontend will load, but **API calls** (`/api/*`) will fail until a backend is deployed and the frontend is pointed to it.

**Option A — Backend on Railway / Render**

1. Deploy the backend (e.g. push the same repo and set root to `learn-java-app/backend`, add MongoDB Atlas `MONGODB_URI` and `JWT_SECRET`).
2. In **Vercel → Project → Settings → Environment Variables**, add:
   - `VITE_API_URL` = `https://your-backend-url.railway.app` (or your backend URL; no trailing slash).
3. **Redeploy** the frontend so the new env is used. The app will then call your live API.

**Option B — Backend later**

- You can keep using the app locally (frontend + backend on localhost) and only use Vercel to share the UI. When you add a backend URL later, set `VITE_API_URL` and redeploy.

---

## 3. Rebuild and redeploy (after changes)

- **GitHub:** after you change code, commit and push:
  ```powershell
  git add .
  git commit -m "Your message"
  git push
  ```
- **Vercel:** every push to `main` triggers a new deployment. You can also trigger a redeploy from the Vercel dashboard.

---

## 4. Summary

| Step              | Action                                      |
|-------------------|---------------------------------------------|
| Version control   | `git init`, `git add .`, `git commit`, push to GitHub |
| Live frontend     | Import repo on Vercel, root = `learn-java-app/frontend`, deploy |
| Full app live     | Deploy backend (e.g. Railway), set `VITE_API_URL` on Vercel, redeploy |

After pushing to GitHub and deploying on Vercel, you can share the Vercel URL to see the app live.
