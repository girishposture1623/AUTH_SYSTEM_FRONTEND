# 🔐 AUTH SYSTEM

A modern and secure full-stack authentication system built with the MERN stack.  
The project provides complete user authentication, account verification, profile management, password management, Google OAuth login, and admin controls.

---

## 🚀 Features

### 🔑 Authentication

- User Registration
- Email OTP Verification
- User Login
- Logout
- JWT Authentication
- HTTP-only Cookie Authentication
- Google OAuth Login
- Protected Routes
- Role-Based Access Control

### 🔒 Password Management

- Secure Password Hashing
- Password Validation
- Forgot Password
- Reset Password
- Set Password for Google Users
- Change Password
- Confirm Password Validation

### 👤 User Profile

- View Profile
- Update Profile
- Update Name
- Update Email
- Update Phone Number
- Upload Profile Image
- Delete Profile Image

### 🗑️ Account Management

- Delete Account
- Delete Account Confirmation
- Password Confirmation Before Deletion
- Soft Delete Support
- Deleted Account Protection

### 🛡️ Admin Panel

- Admin Dashboard
- View All Users
- View User Details
- Change User Role
- Make User Admin
- Make Admin User
- Block User
- Unblock User
- Delete User
- View Contact Requests
- Manage Blocked Account Requests

### 🎨 UI / UX

- Modern Authentication UI
- Responsive Design
- Mobile Navigation
- Toast Notifications
- Loading Animation
- Form Validation
- Server Availability Handling
- Responsive Dashboard
- Mobile, Tablet and Desktop Support

---

## 🛠️ Tech Stack

### Frontend

- React.js
- Vite
- React Router
- Axios
- React Hot Toast
- Google OAuth
- CSS3

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- Nodemailer
- Express Validator
- CORS
- Helmet
- Express Rate Limit

### Development Tools

- Git
- GitHub
- VS Code
- Postman
- Render
- Vercel
- UptimeRobot

---

## 📁 Project Structure

```text
AUTH_SYSTEM/
│
├── frontend/
    │
    ├── public/
    ├── src/
    │   ├── api/
    │   ├── assets/
    │   ├── components/
    │   ├── context/
    │   ├── hooks/
    │   ├── pages/
    │   ├── routes/
    │   ├── Styles/
    │   ├── App.jsx
    │   ├── App.css
    │   ├── index.css
    │   └── main.jsx
    │
    ├── .gitignore
    ├── package.json
    └── vite.config.js