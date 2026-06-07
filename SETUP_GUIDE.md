# MERN Auth Full Stack Setup Guide

## Project Structure
This is a MERN (MongoDB, Express, React, Node.js) authentication application with email verification and password reset functionality.

---

## Backend Setup

### 1. **Environment Variables** (`server/.env`)
```
PORT=4000
NODE_ENV=development

# MongoDB
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/mern-auth

# JWT
JWT_SECRET=your_jwt_secret_key_here

# Email Configuration (Nodemailer)
SENDER_EMAIL=your_email@gmail.com
SENDER_PASSWORD=your_app_password

# CORS
CLIENT_URL=http://localhost:5173
```

### 2. **API Endpoints**

#### Auth Routes (`/api/auth`)
- **POST /register** - User registration
  - Body: `{ name, email, password }`
  - Returns: `{ success, message, user }`

- **POST /login** - User login
  - Body: `{ email, password }`
  - Returns: `{ success, message, user }`
  - Sets: HTTP-only cookie with JWT token

- **POST /logout** - User logout
  - Returns: `{ success, message }`

- **POST /send-veri-otp** - Send email verification OTP
  - Auth: Required (Bearer token)
  - Returns: `{ success, message }`

- **POST /verify-email** - Verify email with OTP
  - Auth: Required
  - Body: `{ otp }`
  - Returns: `{ success, message }`

- **POST /send-reset-otp** - Send password reset OTP
  - Body: `{ email }`
  - Returns: `{ success, message }`

- **POST /reset-password** - Reset password
  - Body: `{ email, otp, newPassword }`
  - Returns: `{ success, message }`

#### User Routes (`/api/user`)
- **GET /profile** - Get user profile (CREATE THIS ENDPOINT)
  - Auth: Required
  - Returns: `{ success, user }`

### 3. **Missing Backend Endpoint to Add**

Add this to `server/routes/usersRouts.js`:
```javascript
import userModel from '../models/userModel.js';
import userAuth from '../middelware/userAuth.js';

userRoute.get('/profile', userAuth, async (req, res) => {
    try {
        const user = await userModel.findById(req.userId).select('-password');
        if (!user) {
            return res.json({ success: false, message: 'User not found' });
        }
        return res.json({ success: true, user });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
});
```

---

## Frontend Setup

### 1. **Environment Variables** (`client/.env.local`)
```
VITE_API_URL=http://localhost:4000
```

### 2. **Key Files Created**

#### `/src/config/api.js`
- Axios instance with base URL configuration
- Handles credentials and CORS

#### `/src/context/AuthContext.jsx`
- Global authentication context
- Manages user state
- Provides: `login()`, `register()`, `logout()` functions
- Use with: `const { user, isAuthenticated, login, logout } = useAuth()`

#### `/src/components/Navbar.jsx`
- Shows login button or user dropdown
- Logout functionality
- Navigation links

#### `/src/pages/Login.jsx`
- Login form with email/password validation
- Connects to backend via AuthContext

#### `/src/pages/Register.jsx`
- Registration form
- Password confirmation validation
- Connects to backend via AuthContext

---

## Installation & Running

### Backend
```bash
cd server
npm install
npm start
```

### Frontend
```bash
cd client
npm install
npm run dev
```

The app will run on:
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:4000`

---

## Features

✅ User Registration
✅ User Login with JWT
✅ Email Verification
✅ Password Reset
✅ Protected Routes
✅ Global Auth Context
✅ Toast Notifications
✅ Responsive UI (Tailwind CSS)

---

## Data Flow

1. **User Register** → POST `/api/auth/register` → JWT Token Set → Redirect to verify email
2. **User Login** → POST `/api/auth/login` → JWT Token Set → Redirect to home
3. **User Logout** → POST `/api/auth/logout` → Clear Token → Redirect to home
4. **Check Auth** → GET `/api/user/profile` → Returns user data (if authenticated)

---

## Troubleshooting

### CORS Errors
- Ensure `CLIENT_URL` is set in backend `.env`
- Check CORS middleware in `server.js`

### Cookie Not Persisting
- Set `secure: false` in development
- Ensure `credentials: true` in axios config

### Email Not Sending
- Check Gmail app password settings
- Enable "Less secure app access" if needed
- Verify sender email configuration

---

## Next Steps

1. Set up MongoDB connection
2. Configure Nodemailer for emails
3. Run backend: `npm start`
4. Run frontend: `npm run dev`
5. Test registration and login flow
