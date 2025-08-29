# README.md — React Role-Based Login & Dashboard Assessment

This repository contains the **Role-Based Login and Dashboard System** built with **React, TypeScript, Redux Toolkit, React Router, and TailwindCSS**. It is designed as an **assessment project** to evaluate frontend development skills.

---

## 📌 Project Overview
The application demonstrates **mock role-based authentication** (no backend). Users log in as **Admin**, **Merchant**, or **Member**, and are redirected to their respective dashboards. Authentication is simulated using locally stored fake tokens.

### Objectives
- Implement **role-based login and registration**.
- Manage state with **Redux Toolkit**.
- Implement **protected routes** with React Router.
- Create **role-specific dashboards** with dummy data.
- Style with **TailwindCSS** for a clean, responsive UI.

---

## 🛠️ Tech Stack
- **React (TypeScript)** — UI library.
- **Redux Toolkit** — State management.
- **React Router DOM** — Routing and navigation.
- **TailwindCSS** — Utility-first styling.

---

## 🔑 Authentication

### Login & Registration Flows
- **Admin:** Email + Password.
- **Merchant:** Store Details + Password.
- **Member:** Phone/Email + Password or OTP (simulated).

### Token Handling
- On login, a **fake token** is stored in `localStorage` (e.g., `admin-token`).
- Redux (`authSlice`) stores both the `token` and `role`.
- On refresh, Redux restores state from `localStorage`.

### Logout
- Clears all stored tokens from `localStorage`.
- Resets authentication state in Redux.

---

## 🚦 Routing & Access Control

### Defined Routes
- `/login/admin` → Admin login.
- `/login/merchant` → Merchant login.
- `/login/member` → Member login.
- `/dashboard/admin` → Admin dashboard.
- `/dashboard/merchant` → Merchant dashboard.
- `/dashboard/member` → Member dashboard.

### Protected Routing
- `ProtectedRoute` component enforces role-based access.
- Unauthorized users are redirected to the correct login page.

---

## 📂 State Management

### Redux Slices
1. **authSlice**
   - Stores authentication `token` and `role`.
   - Provides `login` and `logout` actions.
   - Persists session in `localStorage`.

2. **dataSlice**
   - Manages **dummy dashboard data**:
     - Users & merchants (Admin).
     - Approval requests & notifications (Merchant).
     - Points summary (Member).
   - Includes actions to approve purchases and update contribution rates.

---

## 📊 Dashboards

### Admin Dashboard
- Manage **Users** (dummy table).
- Manage **Merchants** (dummy table).

### Merchant Dashboard
- Approve **Purchase Requests**.
- **Search Customers** by name.
- Update **Contribution Rate**.
- View **Notifications**.

### Member Dashboard
- View **Points Summary** (total, monthly, tier).

---

## 🎨 UI/UX Guidelines
- **TailwindCSS** for utility-first styling.
- Shared utility classes:
  - `.btn`, `.btn-primary`
  - `.card`
  - `.input`
- Clean, minimal, and responsive design.

---

## ⚙️ Setup Instructions

### Installation
```bash
# Install dependencies
npm install or yarn 
npm run dev or yarn dev
