# ⚡ KAWAT AI — Vercel Gateway (`kawatai.vercel.app`)

Fixed dynamic routing gateway for the KAWAT Mobile Coding Agent.

## 🌟 What does this do?
Since Heroku accounts/dynos are rotated monthly, this Vercel gateway acts as a fixed anchor point for the mobile app:
1. **The Mobile App connects only to**: `https://kawatai.vercel.app`
2. When you create a new Heroku app next month (e.g. `https://kawat-v2.herokuapp.com`), you simply update the URL on this dashboard.
3. The phone app instantly connects to your new Heroku backend **without needing an APK rebuild or reinstall!**

## 🚀 How to Deploy to Vercel (1-Minute Setup)

### Option A: Using Vercel CLI
```bash
npm install -g vercel
vercel login
vercel --prod
```
(Set project name to `kawatai` so it deploys to `kawatai.vercel.app`)

### Option B: Deploy via GitHub
1. Create a repo named `kawatai` on GitHub and push this folder.
2. Go to [vercel.com/new](https://vercel.com/new) and import the `kawatai` repository.
3. Add Environment Variable:
   - `HEROKU_BACKEND_URL`: Your current Heroku app URL (e.g., `https://mobile-antigravity.herokuapp.com`)
   - `ADMIN_SECRET`: Your secret update password (default: `kawat2026`)
4. Click **Deploy**!

## 🔗 Endpoints
- `GET /api/config` — Returns active Heroku backend URL and health status.
- `POST /api/set-backend` — Updates Heroku backend URL dynamically.
- `GET /` — Responsive mobile & desktop management UI.
