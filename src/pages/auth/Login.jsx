import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";

import useAuth from "../../hooks/useAuth";
import { login } from "../../api/authApi";
import api from "../../api/axios";
import { createAdminContact } from "../../api/adminApi";

import "../../Styles/Auth/Login.css";

const Login = () => {
  const navigate = useNavigate();
  const { loadUser } = useAuth();

  // ================= States =================
  const [googleLoading, setGoogleLoading] = useState(false);

  const [isBlocked, setIsBlocked] = useState(false);

  const [isUnblocked, setIsUnblocked] = useState(false);

  const [showContactForm, setShowContactForm] = useState(false);

  // ================= Login Form =================
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // ================= Contact Form =================
  const [contactData, setContactData] = useState({
    email: "",
    subject: "Account Blocked",
    message: "",
  });

  // ================= Input Change =================
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    // Hide messages when user changes input
    if (isBlocked) {
      setIsBlocked(false);
      setShowContactForm(false);
    }

    if (isUnblocked) {
      setIsUnblocked(false);
    }
  };

  // ==================================================
  // Check Account Status
  // ==================================================
  useEffect(() => {
    if (!isBlocked || !formData.email) return;

    const checkStatus = async () => {
      try {
        const response = await api.get(
          `/auth/account-status?email=${encodeURIComponent(formData.email)}`,
        );

        const { isBlocked: blocked } = response.data;

        // ===============================
        // Account Unblocked
        // ===============================
        if (!blocked) {
          setIsBlocked(false);
          setIsUnblocked(true);
          setShowContactForm(false);

          toast.success("Your account has been unblocked. Please login again.");
        }
      } catch (error) {
        console.log(error);
      }
    };

    // Check immediately
    checkStatus();

    // Check every 3 seconds
    const interval = setInterval(checkStatus, 3000);

    return () => clearInterval(interval);
  }, [isBlocked, formData.email]);

  // ==================================================
  // Normal Login
  // ==================================================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      return toast.error("All fields are required");
    }

    // Hide previous messages
    setIsBlocked(false);
    setIsUnblocked(false);
    setShowContactForm(false);

    try {
      const response = await login(formData);

      await loadUser();

      toast.success(response.data.message);

      navigate("/user-dashboard");
    } catch (error) {
      const status = error.response?.status;

      const message = error.response?.data?.message;

      // ================= Blocked Account =================
      if (status === 403 && message?.toLowerCase().includes("blocked")) {
        setIsBlocked(true);

        setIsUnblocked(false);

        return;
      }

      if (!error.response) {
        toast.error("Server is unavailable. Please try again later.");
        return;
      }

      // Backend error message
      toast.error(
        error.response?.data?.message ||
          "Registration failed. Please try again.",
      );
    }
  };

  // ==================================================
  // Google Login
  // ==================================================
  const handleGoogleLogin = async (credentialResponse) => {
    try {
      setGoogleLoading(true);

      const response = await api.post("/auth/google", {
        credential: credentialResponse.credential,
      });

      toast.success(response.data.message);

      await loadUser();

      navigate("/user-dashboard");
    } catch (error) {
      // Server is down / Network error
      if (!error.response) {
        toast.error("Server is unavailable. Please try again later.");
        return;
      }

      toast.error(
        error.response?.data?.message ||
          "Google Login failed. Please try again.",
      );
    } finally {
      setGoogleLoading(false);
    }
  };

  // ==================================================
  // Contact Administrator
  // ==================================================
  const handleContactSubmit = async (e) => {
    e.preventDefault();

    if (!contactData.email.trim()) {
      return toast.error("Email is required.");
    }

    if (!contactData.message.trim()) {
      return toast.error("Please enter your message.");
    }

    try {
      const response = await createAdminContact(contactData);

      toast.success(response.data.message);

      // Reset form
      setContactData({
        email: "",
        subject: "Account Blocked",
        message: "",
      });

      setShowContactForm(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send request.");
    }
  };

  // ==================================================
  // Render
  // ==================================================
  return (
    <div className="auth-container">
      <div className="card" id="card">
        {/* ================= Login Title ================= */}
        <h1>Login </h1>

        {/* ==================================================
            Unblocked Message
        ================================================== */}
        {isUnblocked && (
          <div className="unblocked-message">
            <p>✅ Your account has been unblocked.</p>

            <p>Please login again.</p>
          </div>
        )}

        {/* ==================================================
            Login Form
        ================================================== */}
        <form onSubmit={handleSubmit}>
          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
          />

          {/* Password */}
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
          />

          {/* Login Button */}
          <button type="submit">Login</button>
        </form>

        {/* ==================================================
            Blocked Account Message
        ================================================== */}
        {isBlocked && (
          <div className="blocked-message">
            <p>Your account has been blocked.</p>

            <p>Please contact the administrator.</p>

            {/* Contact Button */}
            {!showContactForm && (
              <button
                type="button"
                className="contact-admin-btn"
                onClick={() => {
                  setContactData({
                    email: formData.email,
                    subject: "Account Blocked",
                    message: "",
                  });

                  setShowContactForm(true);
                }}
              >
                Contact Administrator
              </button>
            )}
          </div>
        )}

        {/* ==================================================
            Contact Administrator Form
        ================================================== */}
        {showContactForm && (
          <div className="contact-form">
            <h3>Contact Administrator</h3>

            <form onSubmit={handleContactSubmit}>
              {/* Email */}
              <input
                type="email"
                value={contactData.email}
                onChange={(e) =>
                  setContactData({
                    ...contactData,
                    email: e.target.value,
                  })
                }
                placeholder="Your email"
              />

              {/* Subject */}
              <input
                type="text"
                value={contactData.subject}
                onChange={(e) =>
                  setContactData({
                    ...contactData,
                    subject: e.target.value,
                  })
                }
                placeholder="Subject"
              />

              {/* Message */}
              <textarea
                value={contactData.message}
                onChange={(e) =>
                  setContactData({
                    ...contactData,
                    message: e.target.value,
                  })
                }
                placeholder="Enter your message"
                rows="5"
              />

              {/* Send Request */}
              <button type="submit">Send Request</button>

              {/* Cancel */}
              <button type="button" onClick={() => setShowContactForm(false)}>
                Cancel
              </button>
            </form>
          </div>
        )}

        {/* ==================================================
            Google Login
        ================================================== */}
        <div
          style={{
            marginTop: "20px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {googleLoading ? (
            <button type="button" disabled>
              Signing in with Google...
            </button>
          ) : (
            <GoogleLogin
              onSuccess={handleGoogleLogin}
              onError={() => {
                toast.error("Google Login Failed");
              }}
            />
          )}
        </div>

        {/* ==================================================
            Forgot Password
        ================================================== */}
        <Link to="/forgot-password">Forgot Password?</Link>

        {/* ==================================================
            Register
        ================================================== */}
        <Link to="/register">Create New Account</Link>
      </div>
    </div>
  );
};

export default Login;
