# Deployment Guide

## 1. Backend Deployment (Railway)

1.  **Push your code to GitHub.**
2.  **Login to Railway** and create a "New Project" -> "Deploy from GitHub repo".
3.  Select your repository and choose the **backend** directory if asked (or configure the strict root to `backend` in Settings > General > Root Directory).
4.  **Add a MySQL Database** service in Railway and link it to your Django project.
5.  **Environment Variables**: Go to the "Variables" tab in your Django service and add:
    *   `SECRET_KEY`: (Generate a secure key)
    *   `DEBUG`: `False`
    *   `ALLOWED_HOSTS`: `task-management-system-new-production.up.railway.app` (or `*` for initial test)
    *   `CSRF_TRUSTED_ORIGINS`: `https://task-management-systems-sigma.vercel.app` (Your Vercel URL)
    *   `FRONTEND_URL`: `https://task-management-systems-sigma.vercel.app` (Your Vercel URL)
    *   `DATABASE_URL`: (Railway often adds this automatically when you link the DB)
    *   `MYSQLHOST`, `MYSQLUSER`, `MYSQLPASSWORD`, `MYSQLPORT`, `MYSQLDATABASE`: (These are typically provided by the linked MySQL service)

6.  **Build Command**: Railway should detect the `Procfile` and `requirements.txt`.
7.  **Start Command**: `gunicorn taskproject.wsgi:application`

## 2. Frontend Deployment (Vercel)

1.  **Login to Vercel** and "Add New..." -> "Project".
2.  Import your GitHub repository.
3.  **Framework Preset**: Select "Vite".
4.  **Root Directory**: Click "Edit" and select `frontend`.
5.  **Environment Variables**: Add the following:
    *   `VITE_API_BASE_URL`: `https://your-railway-app-url.up.railway.app/api` (The URL from step 1)
6.  Click **Deploy**.

## 3. Important Notes

*   **CORS**: The backend is configured to allow requests from `https://task-management-systems-sigma.vercel.app`. If your Vercel URL changes, update the `FRONTEND_URL` variable in Railway.
## 4. Troubleshooting Connection Issues

If your deployed Frontend is still connecting to `localhost` or showing 401 errors:

1.  **Check Vercel Environment Variables:**
    *   Go to your Project Settings on Vercel -> Environment Variables.
    *   Ensure `VITE_API_BASE_URL` is set to your Railway Backend URL (e.g., `https://task-management-system-new-production.up.railway.app/api`).
    *   **IMPORTANT:** After adding/changing environment variables, you **MUST REDEPLOY** for changes to take effect. Go to Deployments -> Redeploy.

2.  **Check Backend CORS:**
    *   Ensure `CORS_ALLOWED_ORIGINS` in `settings.py` includes your Vercel domain (without trailing slash).

