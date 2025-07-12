# 🔗 URL Shortener App

This is a frontend part of a URL shortener application built using:

- 🖥️ **Frontend**: React (Vite) + Material UI + Axios
- 🔧 **Backend**: ASP.NET Core Web API
- 🔐 **Authentication**: JWT-based with Role support (Admin, User) using AspNetCore.Identity


## 🚀 Features

### 👥 Authentication
- Sign up with optional admin role
- Login with JWT token handling
- Role-based access (Admin/User)

### 📄 Pages
- **Sign Up** – Register with email, password, and admin toggle
- **Sign In** – Authenticate to access the system
- **Main Page** – View your links, add new ones, or delete existing ones
  - Admins can toggle to view all users’ links
- **URL Details Page** – View detailed info about a specific shortened link
- **About Page** – Public page describing the app’s purpose

### 🔗 URL Management
- Create short URLs
- View and manage your own links
- Admin view to manage all links in the system
- Link stats: original URL, short code, creation date


## ⚙️ How to Run

### 📦 Prerequisites
- Node.js (v18+ recommended)
- ASP.NET Core backend running on `http://localhost:5087`

### 🔧 Run

```bash
npm install
npm run dev
```

The frontend will be available at: http://localhost:5173/