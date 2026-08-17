import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import { changePassword } from "../../api/userApi";
import useAuth from "../../hooks/useAuth";
import "../../Styles/User/ChangePassword.css";

const ChangePassword = () => {
  const navigate = useNavigate();

  const { logout } = useAuth();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const currentPassword = formData.currentPassword.trim();
    const newPassword = formData.newPassword.trim();
    const confirmPassword = formData.confirmPassword.trim();

    if (!currentPassword || !newPassword || !confirmPassword) {
      return toast.error("All fields are required.");
    }

    if (newPassword.length < 8) {
      return toast.error("Password must be at least 8 characters long.");
    }

    if (newPassword !== confirmPassword) {
      return toast.error("Passwords do not match.");
    }

    if (currentPassword === newPassword) {
      return toast.error(
        "New password must be different from current password.",
      );
    }

    setLoading(true);

    try {
      const response = await changePassword({
        currentPassword,
        newPassword,
      });

      toast.success(response.data.message);

      await logout();

      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cp-page">
      <h1 className="cp-title">Change Password</h1>

      <form className="cp-form" onSubmit={handleSubmit}>
        <input
          className="cp-input"
          type="password"
          name="currentPassword"
          placeholder="Current Password"
          value={formData.currentPassword}
          onChange={handleChange}
        />

        <input
          className="cp-input"
          type="password"
          name="newPassword"
          placeholder="New Password"
          value={formData.newPassword}
          onChange={handleChange}
        />

        <input
          className="cp-input"
          type="password"
          name="confirmPassword"
          placeholder="Confirm New Password"
          value={formData.confirmPassword}
          onChange={handleChange}
        />

        <button className="cp-button" type="submit" disabled={loading}>
          {loading ? "Updating..." : "Change Password"}
        </button>

        <Link className="cp-back-link" to="/user-dashboard">
          Back to Dashboard
        </Link>
      </form>
    </div>
  );
};

export default ChangePassword;
