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


**Database:** 
Hosted on [Aiven](https://aiven.io/) (MySQL, cloud). Local development can use MySQL on your machine with database name `simple_login` or `defaultdb` on Aiven.


**Repository:**
[https://github.com/mansi153-wq/LocalBizz-Connect-Platform](https://github.com/mansi153-wq/LocalBizz-Connect-Platform)

---

## 🚀 Features

### 👤 Customer module
- Customer signup & login (OTP verification ΓÇö demo OTP is logged on the backend server)
- Product exploration
- Search & category filtering
- Place product inquiries/orders
- CustomerΓÇôvendor chat
- Profile management

### 🛍 Vendor module
- Vendor registration & login
- Vendor dashboard
- Add, update, and delete products
- Inventory management
- Order management (accept / reject / status updates)
- Account settings

### 👨‍💼Admin module
- Vendor management
- Customer management
- Product moderation
- Order monitoring
- Analytics dashboard

---

##  💻 Tech stack

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
│
├── Backend/
|   ├── node_modules/            # Backend dependencies
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
```
---

##  📌 Prerequisites

- [Node.js](https://nodejs.org/) (LTS recommended)
- npm
- [MySQL](https://www.mysql.com/) (local development)
- [Git](https://git-scm.com/)

---

## 📦 Dependencies

### Frontend
- React.js
- React Router DOM
- React Icons
- Chart.js
- React ChartJS 2

### Backend
- Express.js
- MySQL2
- bcrypt
- body-parser
- cors

### Tools & Utilities
- npm
- Git
- Vite

 
### ⚙️ Installation & Setup Guide

This project can be run in two ways:

### 1)Local MySQL Setup (Recommended for Development)
### 2)Cloud MySQL Setup (Aiven Database)


### 📥1. Clone the repository

```bash
git clone https://github.com/mansi153-wq/LocalBizz-Connect-Platform.git
cd LocalBizz-Connect-Platform
```
------------------------------------

### 📦 Install Dependencies
Frontend
cd frontend
npm install
Backend
cd backend
npm install

-------------------------------------

### Option 1 — Run with Local MySQL

Step 1: Create Database

Create a MySQL database named: simple_login
CREATE DATABASE simple_login;


Step 2: Configure Database Credentials

Open:
backend/database.js
Update your MySQL credentials:

host: "localhost",
user: "root",
password: "your_password",
database: "simple_login"


Step 3: Configure Environment Variables

Create:
backend/.env
Example:

PORT=5000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=simple_login
DB_SSL=false


Step 4: Start the Application

Terminal 1 — Frontend
cd frontend
npm run dev

Frontend runs on:

http://localhost:5173


Terminal 2 — Vendor Backend
cd backend
node servers.js

Runs on:

http://localhost:5000


Terminal 3 — Customer Authentication Server
cd backend
node server.js

Runs on:

http://localhost:3000




### Option B — Cloud MySQL (Aiven)

Step 1: Create an Aiven MySQL Service

Create a MySQL service in Aiven and wait until the status becomes Running.

Step 2: Import Database Schema

Connect to Aiven:

mysql --user avnadmin -p \
--host YOUR_AIVEN_HOST \
--port YOUR_PORT \
--ssl-mode=REQUIRED defaultdb

Import schema:

source Backend/schema-aiven.sql


Step 3: Configure Environment Variables

Create:

backend/.env

Example:

PORT=5000
DB_HOST=YOUR_AIVEN_HOST
DB_PORT=YOUR_PORT
DB_USER=avnadmin
DB_PASSWORD=YOUR_PASSWORD
DB_NAME=defaultdb
DB_SSL=true
Step 4: Start the Application
Terminal 1 — Frontend
cd frontend
npm run dev

Frontend:

http://localhost:5173
Terminal 2 — Vendor Backend
cd backend
node servers.js

Backend:

http://localhost:5000
Terminal 3 — Customer Authentication Server
cd backend
node server.js

Customer Authentication API:

http://localhost:3000
Frontend Environment (Optional)

If the backend is hosted on a different server, create:

frontend/.env
VITE_API_BASE_URL=http://localhost:5000

The frontend automatically uses this URL for API requests when provided.


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



This project is licensed under the MIT License. See the LICENSE file for details.
