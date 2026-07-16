<div align="center">

# 🤖 AI Bill Processing System

### AI-Powered Invoice Processing & GST Verification Platform

<p align="center">

Upload invoices • Extract data using AI • Verify GST • Export Reports • Manage Firms

</p>

---

![Python](https://img.shields.io/badge/Python-3.11-blue?logo=python)
![FastAPI](https://img.shields.io/badge/FastAPI-0.115-009688?logo=fastapi)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791?logo=postgresql)
![Docker](https://img.shields.io/badge/Docker-Containerized-2496ED?logo=docker)
![AWS](https://img.shields.io/badge/Hosted_on-AWS-orange?logo=amazonaws)
![GitHub Actions](https://img.shields.io/badge/CI/CD-GitHub_Actions-2088FF?logo=githubactions)
![License](https://img.shields.io/badge/License-MIT-green)

---

### 🌐 Live Demo

**Application**

http://YOUR_PUBLIC_IP

**Backend API**

http://YOUR_PUBLIC_IP:8000/docs

---

</div>

# 📖 Project Overview

AI Bill Processing System is a modern full-stack web application that automates invoice processing using Artificial Intelligence.

Instead of manually entering invoice information into accounting software, users can upload invoices, allow AI to extract important fields, verify GST information, manage multiple firms, visualize business insights through dashboards, and export reports in Excel format.

The application is designed using production-ready architecture with Docker, FastAPI, PostgreSQL, React, GitHub Actions CI/CD, and AWS EC2 deployment.

---

# 🎯 Problem Statement

Small businesses and accountants spend hours manually entering invoice information into accounting systems.

Manual processes lead to:

- Human typing mistakes
- Duplicate entries
- Time-consuming data entry
- Incorrect GST details
- Difficult reporting
- Poor business visibility

The AI Bill Processing System automates this workflow.

---

# 🚀 Solution

The platform provides an end-to-end invoice management solution.

✔ User Authentication

✔ Firm Management

✔ Invoice Upload

✔ AI Invoice Extraction

✔ GST Verification

✔ Invoice Dashboard

✔ Analytics

✔ Excel Export

✔ Multi-user Ready Architecture

---

# ✨ Features

## Authentication

- User Registration
- Secure Login
- JWT Authentication
- Password Hashing (bcrypt)
- Protected APIs

---

## Dashboard

- Total Invoices
- Revenue Summary
- GST Verified Count
- GST Mismatch Count
- Monthly Revenue Chart
- GST Verification Chart

---

## Invoice Management

- Upload Invoice
- Store Invoice
- Search Invoice
- Filter Invoice
- Delete Invoice
- Delete All Invoices
- View Invoice Details

---

## Firm Management

- Create Firm
- Update Firm
- Delete Firm
- Multiple Firms Support

---

## Export

- Export Excel Report
- Invoice Summary
- GST Status Report
- Revenue Summary

---

## Security

- JWT Authentication
- Password Encryption
- CORS Protection
- SQLAlchemy ORM
- Secure API Design

---

# 🛠 Tech Stack

## Frontend

- React 19
- TypeScript
- Vite
- Tailwind CSS
- React Router
- React Query
- Axios
- Recharts

---

## Backend

- Python 3.11
- FastAPI
- SQLAlchemy
- Alembic
- Pydantic
- JWT
- Passlib

---

## Database

- PostgreSQL 16

---

## DevOps

- Docker
- Docker Compose
- GitHub Actions
- AWS EC2
- Git

---

# 📂 Repository Structure

```
bill-ai-agent
│
├── backend
│   ├── app
│   ├── alembic
│   ├── uploads
│   ├── exports
│   ├── Dockerfile
│   └── requirements.txt
│
├── frontend
│   ├── src
│   ├── public
│   ├── Dockerfile
│   └── nginx.conf
│
├── .github
│   └── workflows
│       └── deploy.yml
│
├── docker-compose.yml
│
└── README.md
```

---

# 🎬 Application Preview

## Login

> Add Screenshot Here

---

## Dashboard

> Add Screenshot Here

---

## Invoice Management

> Add Screenshot Here

---

## Export Report

> Add Screenshot Here

---

# ⭐ Highlights

- Production Ready
- REST APIs
- Dockerized
- CI/CD Enabled
- AWS Hosted
- JWT Authentication
- PostgreSQL Database
- Responsive UI
- Professional Dashboard
- Excel Export
- AI Ready Architecture


# 🏗 System Architecture

```
                          USER
                            │
                            │
                    React Frontend
                     (Nginx + Vite)
                            │
                            │ REST API
                            ▼
                   FastAPI Backend
          Authentication • AI • Business Logic
                            │
             ┌──────────────┴──────────────┐
             │                             │
             ▼                             ▼
      PostgreSQL Database          Upload Storage
         Users/Firms/Invoices      Bills / Reports
             │
             ▼
      Google Gemini AI
      Invoice OCR & Extraction
```

---

# ☁ AWS Deployment Architecture

```
                    GitHub Repository
                           │
                  Push to Main Branch
                           │
                           ▼
                 GitHub Actions CI/CD
                           │
                  SSH Deployment
                           │
                           ▼
                  AWS EC2 Ubuntu Server
                           │
        ┌──────────────────┼─────────────────┐
        │                  │                 │
        ▼                  ▼                 ▼
  React Container    FastAPI Container   PostgreSQL
      Nginx             Uvicorn          Database
```

---

# 🐳 Docker Architecture

```
               Docker Compose

        +----------------------------+

        Frontend Container
        ---------------------
        React + Vite
        Nginx
        Port 80

                │

                ▼

        Backend Container
        ---------------------
        FastAPI
        Uvicorn
        Port 8000

                │

                ▼

        Database Container
        ---------------------
        PostgreSQL 16
        Persistent Volume

        +----------------------------+
```

---

# 🔄 CI/CD Pipeline

```
Developer
    │
    ▼
Git Commit
    │
    ▼
GitHub Repository
    │
    ▼
GitHub Actions
    │
    ▼
SSH into EC2
    │
    ▼
Git Pull Latest Code
    │
    ▼
Docker Compose Build
    │
    ▼
Restart Containers
    │
    ▼
Application Updated
```

---

# 🔐 Authentication Flow

```
User

 │

 ▼

Register

 │

 ▼

FastAPI

 │

 ▼

Hash Password (bcrypt)

 │

 ▼

Store User in PostgreSQL

────────────────────────────

Login

 │

 ▼

Verify Password

 │

 ▼

Generate JWT Token

 │

 ▼

Return Token

 │

 ▼

Frontend stores JWT

 │

 ▼

Authorization Header

 │

 ▼

Protected APIs
```

---

# 📄 Invoice Processing Flow

```
Upload Invoice

      │

      ▼

FastAPI Upload API

      │

      ▼

Save Invoice

      │

      ▼

Google Gemini AI

      │

      ▼

Extract

• Vendor

• Invoice Number

• Date

• Amount

• GST

      │

      ▼

GST Verification

      │

      ▼

Save into PostgreSQL

      │

      ▼

Dashboard

      │

      ▼

Excel Export
```

---

# 🗄 Database Design

```
+----------------+
|     Users      |
+----------------+
| id             |
| full_name      |
| email          |
| password_hash  |
| role           |
| is_active      |
+--------+-------+
         |
         |
         |
+--------▼-------+
|      Firms     |
+----------------+
| id             |
| owner_id       |
| name           |
| gst_number     |
| address        |
+--------+-------+
         |
         |
         |
+--------▼--------+
|    Invoices     |
+-----------------+
| id              |
| firm_id         |
| vendor_name     |
| invoice_number  |
| invoice_date    |
| total_amount    |
| gst_number      |
| gst_verified    |
+-----------------+
```

---

# 📡 REST API Endpoints

## Authentication

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/v1/auth/register` | Register User |
| POST | `/api/v1/auth/login` | Login User |

---

## Dashboard

| Method | Endpoint |
|---------|----------|
| GET | `/api/v1/dashboard` |

---

## Profile

| Method | Endpoint |
|---------|----------|
| GET | `/api/v1/profile` |
| PATCH | `/api/v1/profile/password` |

---

## Firms

| Method | Endpoint |
|---------|----------|
| GET | `/api/v1/firms` |
| GET | `/api/v1/firms/{id}` |
| POST | `/api/v1/firms` |
| PUT | `/api/v1/firms/{id}` |
| DELETE | `/api/v1/firms/{id}` |

---

## Invoices

| Method | Endpoint |
|---------|----------|
| POST | `/api/v1/upload` |
| GET | `/api/v1/invoices` |
| GET | `/api/v1/invoices/{id}` |
| PATCH | `/api/v1/invoices/{id}` |
| DELETE | `/api/v1/invoices/{id}` |
| DELETE | `/api/v1/invoices` |

---

## Export

| Method | Endpoint |
|---------|----------|
| GET | `/api/v1/export/excel` |

---

# 📦 Deployment

The application is fully containerized using Docker and deployed on AWS EC2.

Deployment includes:

- Docker Compose
- Nginx Reverse Proxy
- FastAPI
- PostgreSQL
- GitHub Actions CI/CD
- Automatic Deployment on Push
- Persistent PostgreSQL Volume
- Persistent Upload Storage

---

# 🚀 Performance Optimizations

- Multi-stage Docker Build
- Nginx Static Asset Caching
- Gzip Compression
- SQLAlchemy ORM
- JWT Authentication
- Axios Interceptors
- Persistent Docker Volumes
- Docker Health Checks
- Production Environment Variables
- CI/CD Automated Deployment

---

# 🔮 Future Enhancements

- AI OCR using Gemini Vision
- GST API Integration
- PDF Invoice Parser
- Tally ERP Export
- Email Invoice Processing
- WhatsApp Invoice Upload
- Multi-Tenant Architecture
- Role-Based Access Control (RBAC)
- Redis Caching
- Background Tasks with Celery
- AWS S3 File Storage
- Kubernetes Deployment
- Prometheus Monitoring
- Grafana Dashboard
- Terraform Infrastructure as Code
- HTTPS using Nginx + Let's Encrypt


# 📸 Application Screenshots

## 🏠 Login Page

> Secure JWT Authentication with clean modern UI.

![Login](screenshots/login.png)

---

## 📝 User Registration

> New users can create an account securely.

![Register](screenshots/register.png)

---

## 📊 Dashboard

> View invoice statistics, GST verification status, and business insights.

![Dashboard](screenshots/dashboard.png)

---

## 📄 Invoice Management

> Search, filter, update and delete invoices.

![Invoices](screenshots/invoices.png)

---

## 🏢 Firm Management

> Manage multiple businesses from a single dashboard.

![Firms](screenshots/firms.png)

---

## ⚙ Profile & Settings

> Manage profile and change password securely.

![Profile](screenshots/profile.png)


# ⚙ Installation

## Clone Repository

```bash
git clone https://github.com/yourusername/bill-ai-agent.git

cd bill-ai-agent
```

---

## Backend Setup

```bash
cd backend

python -m venv .venv

source .venv/bin/activate

pip install -r requirements.txt
```

Create `.env`

```env
DATABASE_URL=postgresql+psycopg://postgres:postgres@localhost:5432/bill_ai

JWT_SECRET_KEY=your-secret

GEMINI_API_KEY=your-api-key
```

Run database migrations

```bash
alembic upgrade head
```

Run FastAPI

```bash
uvicorn app.main:app --reload
```

---

## Frontend Setup

```bash
cd frontend

npm install
```

Create `.env`

```env
VITE_API_URL=http://localhost:8000/api/v1
```

Run React

```bash
npm run dev
```

Frontend

```
http://localhost:5173
```

Backend

```
http://localhost:8000
```

Swagger

```
http://localhost:8000/docs
```


# 🐳 Docker Deployment

Build and start the application

```bash
docker compose up -d --build
```

View running containers

```bash
docker ps
```

View logs

```bash
docker compose logs -f
```

Stop containers

```bash
docker compose down
```

Restart

```bash
docker compose restart
```

Rebuild

```bash
docker compose up -d --build
```

# ☁ AWS Deployment

The application is deployed on **AWS EC2** using Docker Compose.

Deployment Steps

1. Launch Ubuntu EC2 Instance
2. Configure Security Groups
3. Install Docker
4. Install Docker Compose
5. Clone Repository
6. Configure Environment Variables
7. Build Docker Images
8. Start Containers
9. Configure GitHub Actions
10. Automatic Deployment on Push

Infrastructure

AWS EC2

↓

Docker Compose

↓

Frontend (Nginx)

↓

Backend (FastAPI)

↓

PostgreSQL


# 🚀 Continuous Deployment

Every push to the **main** branch automatically:

✅ Connects to EC2

✅ Pulls latest code

✅ Rebuilds Docker images

✅ Restarts containers

✅ Removes unused Docker images

Implemented using:

- GitHub Actions
- SSH Action
- Docker Compose
- AWS EC2

# 📂 Project Structure

```
bill-ai-agent/

│

├── backend/

│   ├── alembic/

│   ├── app/

│   │   ├── api/

│   │   ├── core/

│   │   ├── db/

│   │   ├── models/

│   │   ├── repositories/

│   │   ├── schemas/

│   │   ├── services/

│   │   └── main.py

│

├── frontend/

│   ├── public/

│   ├── src/

│   │   ├── api/

│   │   ├── components/

│   │   ├── pages/

│   │   ├── hooks/

│   │   └── App.tsx

│

├── docker-compose.yml

├── README.md

└── .github/

    └── workflows/

        └── deploy.yml
```


# 🤝 Contributing

Contributions are always welcome.

1. Fork the repository

2. Create your feature branch

```bash
git checkout -b feature/new-feature
```

3. Commit your changes

```bash
git commit -m "Add new feature"
```

4. Push your branch

```bash
git push origin feature/new-feature
```

5. Open a Pull Request


# 👨‍💻 Author

**Ahmad Amliwala**

Cloud Engineer • DevOps Engineer • Backend Developer

- AWS
- Docker
- FastAPI
- PostgreSQL
- React
- CI/CD
- GitHub Actions

GitHub

https://github.com/ahmad24mliwala

LinkedIn

https://linkedin.com/in/ahmadamliwala


# ⭐ Support

If you found this project useful,

⭐ Star this repository

🍴 Fork it

🛠 Contribute

📢 Share it with others
