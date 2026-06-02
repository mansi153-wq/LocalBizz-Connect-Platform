# LocalBiz Connect

![LocalBiz Connect](screenshots/1.png)

## Introduction

LocalBiz Connect is a full-stack marketplace web application that connects customers with local vendors through a modern digital platform. Customers can explore products, place orders, track order status, and chat with vendors. Vendors manage products, inventory, orders, and account settings from a dedicated dashboard. Administrators monitor platform activity through an analytics-based admin panel.

---

## Live deployment (Render)

| Service | URL | Role |
|---------|-----|------|
| **Frontend** | [https://localbizz-frontend.onrender.com](https://localbizz-frontend.onrender.com) | React app (open this in the browser) |
| **Backend API** | [https://localbizz-connect-platform.onrender.com](https://localbizz-connect-platform.onrender.com) | Node.js / Express REST API |

**API health check:** [https://localbizz-connect-platform.onrender.com/health](https://localbizz-connect-platform.onrender.com/health)

> The backend root URL (`/`) shows `Cannot GET /` ΓÇö that is normal. The API is meant to be used by the frontend, not opened as a website.

**Database:** Hosted on [Aiven](https://aiven.io/) (MySQL, cloud). Local development can use MySQL on your machine with database name `simple_login` or `defaultdb` on Aiven.

**Repository:** [https://github.com/mansi153-wq/LocalBizz-Connect-Platform](https://github.com/mansi153-wq/LocalBizz-Connect-Platform)

---

## Features

### Customer module
- Customer signup & login (OTP verification ΓÇö demo OTP is logged on the backend server)
- Product exploration
- Search & category filtering
- Place product inquiries/orders
- CustomerΓÇôvendor chat
- Profile management

### Vendor module
- Vendor registration & login
- Vendor dashboard
- Add, update, and delete products
- Inventory management
- Order management (accept / reject / status updates)
- Account settings

### Admin module
- Vendor management
- Customer management
- Product moderation
- Order monitoring
- Analytics dashboard

---

## Tech stack

| Technology | Purpose |
|------------|---------|
| React.js | Frontend UI |
| Vite | Frontend build tool |
| Node.js | Backend runtime |
| Express.js | REST API |
| MySQL | Database |
| Chart.js | Analytics charts |
| bcrypt | Vendor password hashing |
| mysql2 | Database driver |
| cors | Cross-origin API access |
| body-parser | Request body parsing |

---

## Screenshots

![Screenshot](screenshots/4.png)

![Screenshot](screenshots/3.png)

![Screenshot](screenshots/2.png)

![Screenshot](screenshots/5.png)

![Screenshot](screenshots/7.png)

![Screenshot](screenshots/6.png)

![Screenshot](screenshots/21.png)

![Screenshot](screenshots/14.png)

![Screenshot](screenshots/15.png)

![Screenshot](screenshots/16.png)

![Screenshot](screenshots/17.png)

![Screenshot](screenshots/19.png)

![Screenshot](screenshots/18.png)

![Screenshot](screenshots/20.png)

![Screenshot](screenshots/8.png)

![Screenshot](screenshots/9.png)

![Screenshot](screenshots/10.png)

![Screenshot](screenshots/11.png)

![Screenshot](screenshots/12.png)

![Screenshot](screenshots/13.png)

---

## Project structure

```txt
LocalBizz-Connect-Platform/
Γö£ΓöÇΓöÇ Backend/
Γöé   Γö£ΓöÇΓöÇ admin.js               # Admin API routes
Γöé   Γö£ΓöÇΓöÇ db.js                  # MySQL connection pool (env-based)
Γöé   Γö£ΓöÇΓöÇ db.sql                 # Sample customers table SQL
Γöé   Γö£ΓöÇΓöÇ schema-aiven.sql       # Full schema for cloud MySQL (Aiven / Render)
Γöé   Γö£ΓöÇΓöÇ VendorRouts.js         # Vendor & product API routes
Γöé   Γö£ΓöÇΓöÇ servers.js             # Main Express server (used in production)
Γöé   Γö£ΓöÇΓöÇ server.js              # Legacy HTTP server (local port 3000)
Γöé   Γö£ΓöÇΓöÇ package.json
Γöé   ΓööΓöÇΓöÇ .env.example
Γöé
Γö£ΓöÇΓöÇ react-frontend/
Γöé   Γö£ΓöÇΓöÇ public/
Γöé   Γö£ΓöÇΓöÇ src/
Γöé   Γöé   Γö£ΓöÇΓöÇ assets/
Γöé   Γöé   Γö£ΓöÇΓöÇ components/        # Pages & layouts (Customer, Vendor, Admin)
Γöé   Γöé   Γö£ΓöÇΓöÇ App.jsx
Γöé   Γöé   ΓööΓöÇΓöÇ main.jsx           # API URL rewrite for production
Γöé   Γö£ΓöÇΓöÇ index.html
Γöé   Γö£ΓöÇΓöÇ vite.config.js
Γöé   ΓööΓöÇΓöÇ .env.example
Γöé
Γö£ΓöÇΓöÇ screenshots/
Γö£ΓöÇΓöÇ render.yaml                # Render Blueprint (backend + frontend)
Γö£ΓöÇΓöÇ DEPLOY_RENDER.md           # Detailed Render deploy notes
ΓööΓöÇΓöÇ readme.md
```

---

## Prerequisites

- [Node.js](https://nodejs.org/) (LTS recommended)
- npm
- [MySQL](https://www.mysql.com/) (local development)
- [Git](https://git-scm.com/)

---

## Local installation & setup

### 1. Clone the repository

```bash
git clone https://github.com/mansi153-wq/LocalBizz-Connect-Platform.git
cd LocalBizz-Connect-Platform
```

### 2. Install dependencies

**Frontend:**

```bash
cd react-frontend
npm install
```

**Backend:**

```bash
cd ../Backend
npm install
```

### 3. Configure the database

**Option A ΓÇö Local MySQL**

1. Create database: `simple_login`
2. Import `Backend/db.sql` and ensure all required tables exist (`customers`, `vendors`, `products`, `orders`, `order_items`, `messages`, `admin`), or run `Backend/schema-aiven.sql` against your local database (edit `USE defaultdb` to `USE simple_login` if needed).

**Option B ΓÇö Cloud MySQL (Aiven)**

1. Create a MySQL service on Aiven and wait until status is **Running**.
2. Connect with the MySQL client and run:

```bash
mysql --user avnadmin -p --host YOUR_AIVEN_HOST --port YOUR_PORT --ssl-mode=REQUIRED defaultdb
```

```sql
source /path/to/Backend/schema-aiven.sql
```

### 4. Backend environment variables

Copy `Backend/.env.example` to `Backend/.env` and set:

```env
PORT=5000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=simple_login
DB_SSL=false
```

### 5. Frontend environment (optional for local API)

Create `react-frontend/.env` if the API is not on `localhost:5000`:

```env
VITE_API_BASE_URL=http://localhost:5000
```

`main.jsx` rewrites `http://localhost:5000` and `http://localhost:3000` to `VITE_API_BASE_URL` when it is set.

### 6. Start the servers

**Terminal 1 ΓÇö Backend (main API):**

```bash
cd Backend
npm start
```

Runs `servers.js` on **http://localhost:5000**

**Terminal 2 ΓÇö Frontend:**

```bash
cd react-frontend
npm run dev
```

Runs on **http://localhost:5173**

> `server.js` is a legacy customer auth server on port **3000**. Production uses **`servers.js` only** (customer signup/login and vendor/admin routes on one port).

---

## Dependencies

### Frontend
- React
- React Router DOM
- React Icons
- Chart.js
- react-chartjs-2
- react-toastify
- Vite

### Backend
- express
- mysql2
- bcrypt
- cors
- body-parser

---

## Deploy on Render

Full steps are in [DEPLOY_RENDER.md](DEPLOY_RENDER.md). Summary:

### Backend (`LocalBizz-Connect-Platform` web service)

- **Root directory:** `Backend`
- **Build command:** `npm install`
- **Start command:** `npm start`
- **Environment variables:**

| Key | Description |
|-----|-------------|
| `DB_HOST` | Cloud MySQL host (e.g. Aiven) |
| `DB_PORT` | e.g. `21871` (Aiven) or `3306` |
| `DB_USER` | e.g. `avnadmin` |
| `DB_PASSWORD` | Database password |
| `DB_NAME` | e.g. `defaultdb` |
| `DB_SSL` | `true` for Aiven |
| `NODE_ENV` | `production` |

### Frontend (`localbizz-frontend` static site)

- **Root directory:** `react-frontend`
- **Build command:** `npm install && npm run build`
- **Publish directory:** `dist`
- **Environment variable:**

| Key | Value (example) |
|-----|-----------------|
| `VITE_API_BASE_URL` | `https://localbizz-connect-platform.onrender.com` |

Redeploy the frontend after changing `VITE_API_BASE_URL` (Vite embeds it at build time).

### Verify after deploy

- Backend: `/health` and `/vendor/products` return `"success": true`
- Frontend: open **https://localbizz-frontend.onrender.com**
- Signup OTP (demo): check **backend** service **Logs** on Render for `OTP (demo): XXXXXX`

---

## Key functionalities

- Full-stack marketplace with Customer, Vendor, and Admin roles  
- Authentication and role-based routing  
- Product CRUD and inventory tracking  
- Order placement and status workflow  
- CustomerΓÇôvendor messaging per order  
- Search and category filters on Explore  
- Admin analytics with Chart.js  
- REST API with Express and MySQL  
- Responsive dashboards per role  
- bcrypt for vendor passwords  

---

## Default demo admin (after `schema-aiven.sql`)

| Field | Value |
|-------|--------|
| Email | `admin@localbizz.com` |
| Password | `Admin@123` |

Change these in production.

---

## Troubleshooting

| Issue | Likely cause |
|-------|----------------|
| Explore page empty | No vendor products yet ΓÇö log in as vendor and add products |
| Signup / API 500 on Render | Database env vars missing or tables not created |
| Vendor login 500 | DB connection or SQL mode ΓÇö ensure latest code is deployed |
| `Cannot GET /` on backend URL | Normal ΓÇö use frontend URL for the website |
| OTP not received | Demo app logs OTP in backend console / Render Logs, not email |

---

## Author

**Mansi Kawale** ΓÇö [GitHub](https://github.com/mansi153-wq)

---

## License

This project is for educational / portfolio use. Add a license file if you publish it publicly.
