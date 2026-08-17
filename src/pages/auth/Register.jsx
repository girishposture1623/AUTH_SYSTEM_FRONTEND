import { useState } from "react"; // ❌ useRef और useEffect remove करो
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import api from "../../api/axios";
import { GoogleLogin } from "@react-oauth/google";
import useAuth from "../../hooks/useAuth";
import { register } from "../../api/authApi";

import "../../Styles/Auth/Register.css";

const Register = () => {
  const navigate = useNavigate();
  const { loadUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  // ❌ useEffect वाली चीज़ यहाँ से हटा दो (सब कुछ delete करो जो पहले add किया)

  const handleChange = (e) => {
    let { name, value } = e.target;

    if (name === "phone") {
      value = value.replace(/\D/g, "").slice(0, 10);
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

const handleSubmit = async (e) => {
    e.preventDefault();

    const name = formData.name.trim();
    const email = formData.email.trim().toLowerCase();
    const phone = formData.phone.trim();
    const password = formData.password;
    const confirmPassword = formData.confirmPassword;

    if (!name || !email || !phone || !password || !confirmPassword) {
        return toast.error("All fields are required.");
    }

    if (password !== confirmPassword) {
        return toast.error("Passwords do not match.");
    }

    setLoading(true);

    try {
        const response = await register({
            name,
            email,
            phone,
            password,
        });

        toast.success(response.data.message);

        setFormData({
            name: "",
            email: "",
            phone: "",
            password: "",
            confirmPassword: "",
        });

        navigate("/verify-otp", {
            state: {
                email,
            },
        });

    } catch (error) {

        // Server is down / Network error
        if (!error.response) {
            toast.error(
                "Server is unavailable. Please try again later."
            );
            return;
        }

        // Backend error message
        toast.error(
            error.response?.data?.message ||
            "Registration failed. Please try again."
        );

    } finally {
        setLoading(false);
    }
};

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
            toast.error(
                "Server is unavailable. Please try again later."
            );
            return;
        }

        toast.error(
            error.response?.data?.message ||
            "Google Login failed. Please try again."
        );

    } finally {
        setGoogleLoading(false);
    }
};

  return (
    <div className="uth-container">
      <div className="card" id="card">
        <h1>Create Account</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Enter Name"
            value={formData.name}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
          />

          <div className="phone-input">
            <span className="country-code">🇮🇳 +91</span>

            <input
              className="phone-field"
              type="tel"
              name="phone"
              placeholder="Enter mobile number"
              value={formData.phone}
              onChange={handleChange}
              maxLength={10}
              inputMode="numeric"
            />
          </div>

          <div className="password-input">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter Password"
              value={formData.password}
              onChange={handleChange}
            />

            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "👁️" : "👁️‍🗨️"}
            </button>
          </div>

          <div className="password-input">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />

            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
            </button>
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <div
          style={{
            marginTop: "20px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {googleLoading ? (
            <button disabled>Signing in with Google...</button>
          ) : (
            <GoogleLogin
              onSuccess={handleGoogleLogin}
              onError={() => {
                toast.error("Google Login Failed");
              }}
            />
          )}
        </div>

        <p style={{ marginTop: "20px" }}>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
