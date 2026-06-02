# Deploy on Render

This project is configured for Render using `render.yaml`.

## 1) Push code to GitHub

- Commit and push this repository to GitHub.

## 2) Create services from Blueprint

- In Render dashboard, choose **New +** -> **Blueprint**.
- Select this repository.
- Render will detect `render.yaml` and create:
  - `localbizz-backend` (Node web service)
  - `localbizz-frontend` (Static site)

## 3) Set backend environment variables

Set these in `localbizz-backend`:

- `DB_HOST`
- `DB_PORT` (usually `3306`)
- `DB_USER`
- `DB_PASSWORD`
- `DB_NAME`
- `DB_SSL` (`true` only if your DB provider requires SSL)

`PORT` is provided by Render automatically.

## 4) Set frontend environment variable

Set this in `localbizz-frontend`:

- `VITE_API_BASE_URL=https://<your-backend-service>.onrender.com`

Then redeploy frontend.

## 5) Verify

- Backend health: `https://<your-backend-service>.onrender.com/health`
- Open frontend URL from Render and test login/signup/vendor/admin flows.
