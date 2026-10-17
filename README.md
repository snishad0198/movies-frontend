# 🍿 Movies.snishad — Modern Cinema Web Client (Frontend)

The official frontend web client for **Movies.snishad** — a high-speed, modern cinema and web series streaming web application built with **Next.js 14**, **Tailwind CSS**, and **Framer Motion**.

Engineered by **SNishad** ([@snishad.me_](https://instagram.com/snishad.me_)).

---

## 🔗 Related Repositories

* ⚡ **Backend API & Admin Console:** [https://github.com/snishad0198/movies-backend](https://github.com/snishad0198/movies-backend)
* 📖 **Documentation & Deployment Guide:** [https://github.com/snishad0198/movies-docs](https://github.com/snishad0198/movies-docs)

---

## 🌟 Highlights & Features

- **⚡ Zero-Latency Cinema Player:** Clean theater view without annoying overlays, with multi-server node switching.
- **🔖 Built-in Watchlist & Bookmarks:** Save movies/series locally with animated heart/bookmark buttons and real-time navbar counters.
- **🔄 Hourly Auto-Updating Trending:** Displays real-time box office trends fetched from the backend API.
- **⌨️ Keyboard Shortcuts & UX:** Press `/` or `Ctrl+K` to search instantly; smooth Back-to-Top floating button; responsive mobile drawer.
- **📱 Responsive Glassmorphic Dark UI:** Sleek `#08080c` cinema aesthetic, skeleton loading states, and mobile touch optimization.

---

## ☁️ How to Host on Vercel (Recommended — Takes 60 Seconds!)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fsnishad0198%2Fmovies-frontend&env=NEXT_PUBLIC_SITE_NAME,NEXT_PUBLIC_SITE_URL,NEXT_PUBLIC_BACKEND_URL,BACKEND_INTERNAL_URL,INTERNAL_API_KEY)

Deploying this frontend on Vercel is 100% free and takes 1 minute:

1. Click **"Fork"** on this repository or import `snishad0198/movies-frontend` into [Vercel](https://vercel.com).
2. On the Vercel **Configure Project** screen:
   - **Framework Preset:** `Next.js`
   - **Root Directory:** `./` (Leave as default)
3. Add the following **Environment Variables**:
   ```env
   NEXT_PUBLIC_SITE_NAME="Movies.snishad"
   NEXT_PUBLIC_SITE_URL="https://your-domain.vercel.app"
   NEXT_PUBLIC_BACKEND_URL="https://your-backend-api-url.com"
   BACKEND_INTERNAL_URL="https://your-backend-api-url.com"
   INTERNAL_API_KEY="movies-snishad-secure-internal-token-2026"
   ```
4. Click **Deploy**! Your streaming site is now live with global edge CDN acceleration.

---

## 🚀 Local Development Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment (`.env`)
Create `.env` by copying `.env.example`:
```bash
cp .env.example .env
```
Ensure `NEXT_PUBLIC_BACKEND_URL` points to your running backend (default `http://localhost:3000`).

### 3. Start Local Server
```bash
npm run dev
```
Open [http://localhost:3001](http://localhost:3001) in your browser.

---

## 🐳 Docker Hosting

Build and run with Docker:
```bash
docker build -t movies-frontend .
docker run -p 3001:3001 --env-file .env movies-frontend
```

---

## ⚖️ License & Usage Policy

* 🟢 **Personal & Educational Use:** **100% Free** for personal entertainment, learning, and non-commercial development.
* 🔴 **Commercial & Business Use:** Commercial usage, monetization, SaaS deployment, resale, or paid service distribution is **strictly prohibited without prior permission**. For a commercial license, please contact **SNishad**:
  * **Instagram:** [@snishad.me_](https://instagram.com/snishad.me_)
  * **Email:** `snishad01985@gmail.com`

---

## 💬 Creator & Support

* **Created By:** **SNishad**
* **Instagram:** [@snishad.me_](https://instagram.com/snishad.me_)
* **Email:** `snishad01985@gmail.com`
