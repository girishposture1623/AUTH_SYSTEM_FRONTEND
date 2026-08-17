import { BrowserRouter, Route, Routes } from "react-router-dom";

// ================= HOME =================
import Home from "./pages/Home";

// ================= AUTH =================
import ForgotPassword from "./pages/auth/ForgotPassword";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ResetPassword from "./pages/auth/ResetPassword";
import VerifyOtp from "./pages/auth/VerifyOtp";
import VerifyResetOtp from "./pages/auth/VerifyResetOtp";

// ================= COMPONENTS =================
import Navbar from "./components/Navbar";

// ================= ROUTES =================
import AdminRoute from "./components/AdminRoute";
import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";

// ================= ADMIN =================
import AdminDashboard from "./pages/admin/AdminDashboard";

// ================= MAIN DASHBOARD =================
import Dashboard from "./pages/Dashboard";

// ================= USER =================
import UserDashboard from "./pages/user/Dashboard";
import Profile from "./pages/user/Profile";
import EditProfile from "./pages/user/EditProfile";
import ChangePassword from "./pages/user/ChangePassword";
import UploadProfileImage from "./pages/user/UploadProfileImage";
import DeleteProfileImage from "./pages/user/DeleteProfileImage";
import DeleteAccount from "./pages/user/DeleteAccount";
import SetPassword from "./pages/user/SetPassword";
// ================= CSS =================
import "./app.css";

function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <Navbar />

        <main className="app-content">
          <Routes>
            {/* =================================================
                            PUBLIC ROUTES
                        ================================================= */}

            <Route path="/" element={<Home />} />

            <Route element={<PublicRoute />}>
              <Route path="/login" element={<Login />} />

              <Route path="/register" element={<Register />} />

              <Route path="/verify-otp" element={<VerifyOtp />} />

              <Route path="/forgot-password" element={<ForgotPassword />} />

              <Route path="/verify-reset-otp" element={<VerifyResetOtp />} />

              <Route path="/reset-password" element={<ResetPassword />} />
            </Route>

            {/* =================================================
                            PROTECTED USER ROUTES
                        ================================================= */}

            <Route element={<ProtectedRoute />}>
              {/* Main Dashboard */}
              <Route path="/dashboard" element={<Dashboard />} />

              {/* User Dashboard */}
              <Route path="/user-dashboard" element={<UserDashboard />} />

              {/* Profile */}
              <Route path="/profile" element={<Profile />} />

              {/* Edit Profile */}
              <Route path="/edit-profile" element={<EditProfile />} />

              {/* Change Password */}
              <Route path="/change-password" element={<ChangePassword />} />
              <Route path="/set-password" element={<SetPassword />} />

              {/* Upload Profile Image */}
              <Route
                path="/upload-profile-image"
                element={<UploadProfileImage />}
              />

              {/* Delete Profile Image */}
              <Route
                path="/delete-profile-image"
                element={<DeleteProfileImage />}
              />

              {/* Delete Account */}
              <Route path="/delete-account" element={<DeleteAccount />} />
            </Route>

            {/* =================================================
                            ADMIN ROUTES
                        ================================================= */}

            <Route element={<AdminRoute />}>
              <Route path="/admin" element={<AdminDashboard />} />
            </Route>
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
