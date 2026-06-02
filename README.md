# LocalBiz Connect

![LocalBiz Connect](screenshots/1.png)

## Introduction

LocalBiz Connect is a full-stack marketplace web application that connects customers with local vendors through a modern digital platform. Customers can explore products, place orders, track order status, and chat with vendors. Vendors manage products, inventory, orders, and account settings from a dedicated dashboard. Administrators monitor platform activity through an analytics-based admin panel.

---

## Live deployment (Render)

| Service | URL | Role |
|---------|-----|------|
| **Frontend**    | [https://localbizz-frontend.onrender.com](https://localbizz-frontend.onrender.com) | React app (open this in the browser) |
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

LocalBizz-Connect-Platform/
│
├── Backend/
│   ├── admin.js                 # Admin API routes
│   ├── db.js                    # MySQL connection pool (env-based)
│   ├── db.sql                   # Sample customers table SQL
│   ├── schema-aiven.sql         # Full schema for cloud MySQL (Aiven / Render)
│   ├── VendorRouts.js           # Vendor & Product API routes
│   ├── servers.js               # Main Express server (Production)
│   ├── server.js                # Legacy HTTP server (Local port 3000)
│   ├── package.json
│   └── .env.example
│
├── react-frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/          # Customer, Vendor & Admin pages
│   │   ├── App.jsx
│   │   └── main.jsx             # API URL rewrite for production
│   ├── index.html
│   ├── vite.config.js
│   └── .env.example
│
├── screenshots/
│
├── render.yaml                  # Render Blueprint
├── DEPLOY_RENDER.md             # Render deployment guide
└── README.md

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
## Database Setup

### Option A — Local MySQL

1. Create a database named `simple_login`.
2. Import `Backend/db.sql` and ensure all required tables exist:

   * `customers`
   * `vendors`
   * `products`
   * `orders`
   * `order_items`
   * `messages`
   * `admin`

Alternatively, run `Backend/schema-aiven.sql` against your local database (change `USE defaultdb` to `USE simple_login` if needed).

### Option B — Cloud MySQL (Aiven)

1. Create a MySQL service on Aiven and wait until its status is **Running**.
2. Connect using the MySQL client:

```bash
mysql --user avnadmin -p --host YOUR_AIVEN_HOST --port YOUR_PORT --ssl-mode=REQUIRED defaultdb
```

```sql
source /path/to/Backend/schema-aiven.sql
```

## Backend Environment Variables

Copy `Backend/.env.example` to `Backend/.env` and configure:

```env
PORT=5000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=simple_login
DB_SSL=false
```

## Frontend Environment (Optional)

Create `react-frontend/.env` if your API is not running on `localhost:5000`:

```env
VITE_API_BASE_URL=http://localhost:5000
```

`main.jsx` automatically rewrites `http://localhost:5000` and `http://localhost:3000` to `VITE_API_BASE_URL` when provided.

## Running the Project

### Terminal 1 — Backend

```bash
cd Backend
npm start
```

Runs `servers.js` on:

```
http://localhost:5000
```

### Terminal 2 — Frontend

```bash
cd react-frontend
npm run dev
```

Runs on:

```
http://localhost:5173
```

> `server.js` is a legacy customer authentication server running on port `3000`. Production deployments use `servers.js` only.

---

# Dependencies

## Frontend

* React
* React Router DOM
* React Icons
* Chart.js
* react-chartjs-2
* react-toastify
* Vite

## Backend

* express
* mysql2
* bcrypt
* cors
* body-parser

---

# Deploy on Render

For detailed instructions, see `DEPLOY_RENDER.md`.

## Backend Service

**Service Type:** Web Service

| Setting        | Value       |
| -------------- | ----------- |
| Root Directory | Backend     |
| Build Command  | npm install |
| Start Command  | npm start   |

### Environment Variables

| Key         | Description           |
| ----------- | --------------------- |
| DB_HOST     | Cloud MySQL host      |
| DB_PORT     | 21871 (Aiven) or 3306 |
| DB_USER     | Database username     |
| DB_PASSWORD | Database password     |
| DB_NAME     | Database name         |
| DB_SSL      | true for Aiven        |
| NODE_ENV    | production            |

## Frontend Service

**Service Type:** Static Site

| Setting           | Value                        |
| ----------------- | ---------------------------- |
| Root Directory    | react-frontend               |
| Build Command     | npm install && npm run build |
| Publish Directory | dist                         |

### Environment Variables

| Key               | Example Value                     |
| ----------------- | --------------------------------- |
| VITE_API_BASE_URL | https://your-backend.onrender.com |

> Redeploy the frontend after updating `VITE_API_BASE_URL`, as Vite embeds environment variables during build time.

---

# Verification After Deployment

### Backend Checks

* `/health` returns success
* `/vendor/products` returns `"success": true`

### Frontend Check

Open your frontend deployment URL.

### OTP Demo

Check Render backend logs for:

```text
OTP (demo): XXXXXX
```

---

# Key Features

* Customer, Vendor, and Admin roles
* Authentication and role-based routing
* Product management (CRUD)
* Inventory tracking
* Order placement and management
* Customer–Vendor messaging
* Search and category filtering
* Admin analytics dashboard
* REST API with Express and MySQL
* Responsive UI
* Secure password hashing using bcrypt

---

# Default Admin Account

After importing `schema-aiven.sql`:

| Field    | Value                                             |
| -------- | ------------------------------------------------- |
| Email    | [admin@localbizz.com](mailto:admin@localbizz.com) |
| Password | Admin@123                                         |

> Change the default credentials before deploying to production.

---

# Troubleshooting

| Issue                       | Possible Cause                                   |
| --------------------------- | ------------------------------------------------ |
| Explore page is empty       | No vendor products have been added               |
| API returns 500 on Render   | Database variables missing or tables not created |
| Vendor login returns 500    | Database connection issue or outdated deployment |
| Cannot GET / on backend URL | Normal behavior; use the frontend URL            |
| OTP not received            | OTP is logged to backend console / Render logs   |

---

# Author

**Mansi Kawale**

GitHub: https://github.com/mansi153-wq

---

# License

This project is licensed under the MIT License. See the LICENSE file for details.
