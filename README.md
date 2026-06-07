# 🔐 Modern MERN Stack Authentication System

A complete, production-ready, and highly secure MERN stack authentication template built using modern UI standards.

---

## ✨ Features

- **JWT Authentication:** Secure user sessions using JWT, transmitted via HTTP-Only cookies to protect against XSS attacks.
- **Email Verification:** OTP-based verification flow with countdown timers.
- **Password Recovery:** 3-step secure password reset flow using OTP.
- **Modern Responsive UI:** Vibrant gradients, cards, glassmorphism elements, and loading states styled with Tailwind CSS and Outfit font.
- **Robust Local Development:** Automated fallback system logs verification and reset OTPs directly to the console if local SMTP/Brevo is not configured.
- **CORS Protection:** Configured cross-origin resource sharing to securely forward credentials and cookies between frontend and backend.

---

## 🛠️ Architecture & Tech Stack

### Frontend
- **Framework:** React 19 & Vite
- **Styling:** Tailwind CSS 4 & Vanilla CSS
- **State Management:** React Context API (`AuthContext`)
- **Routing:** React Router v7
- **Alerts:** React Toastify

### Backend
- **Framework:** Express & Node.js
- **Database:** MongoDB via Mongoose
- **Email Service:** Nodemailer (with Brevo/SMTP configuration)
- **Security:** bcryptjs (password hashing) & jsonwebtoken (session tokens)

---

## 🚀 Quick Start Guide

### Prerequisites
- Node.js installed
- MongoDB account/URI

### 1. Clone the repository and configure environment variables

#### Server Environment Setup
Create a `.env` file in the `server` directory and paste your configuration:
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
SMTP_USER=your_smtp_username
SMTP_PASS=your_smtp_password
SENDER_EMAIL=your_sender_email_address
```
*(Note: If you leave `SMTP_USER` and `SMTP_PASS` empty, the system will log generated OTP codes in your terminal console.)*

#### Client Environment Setup
Create a `.env.local` file in the `client` directory:
```env
VITE_API_URL=http://localhost:4000
```

---

### 2. Install Dependencies & Start the Servers

#### Start Backend
```bash
cd server
npm install
npm run dev
# Server runs on http://localhost:4000
```

#### Start Frontend (in a new terminal tab)
```bash
cd client
npm install
npm run dev
# Frontend runs on http://localhost:5173
```

Open your browser to **http://localhost:5173** to experience the app.

---

## 🧪 Project Verification & Testing

To test the authentication flow end-to-end programmatically:
1. Make sure your server is running.
2. In the backend, a test script connects directly to the database to fetch OTPs and automate verification.
3. Check the `server/controllers/authcontroller.js` for logic details.
