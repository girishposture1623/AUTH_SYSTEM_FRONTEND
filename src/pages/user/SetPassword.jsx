import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import useAuth from "../../hooks/useAuth";
import { setPassword } from "../../api/userApi";

import "../../Styles/User/SetPass.css";

const SetPassword = () => {
    const navigate = useNavigate();

    const { user, loadUser } = useAuth();

    const [formData, setFormData] = useState({
        newPassword: "",
        confirmPassword: "",
    });

    const [loading, setLoading] = useState(false);

    // =========================
    // Handle Input
    // =========================

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // =========================
    // Submit
    // =========================

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { newPassword, confirmPassword } = formData;

        if (!newPassword || !confirmPassword) {
            toast.error("All fields are required.");
            return;
        }

        if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match.");
            return;
        }

        try {
            setLoading(true);

            const response = await setPassword({
                newPassword,
                confirmPassword,
            });

            toast.success(response.data.message);

            // Refresh user state
            await loadUser();

            // Go back to User Dashboard
            navigate("/user-dashboard", {
                replace: true,
            });

        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Failed to set password."
            );
        } finally {
            setLoading(false);
        }
    };

    // =========================
    // Security Check
    // =========================

    if (!user) {
        return null;
    }

    // Only Google users without password
    if (
        user.provider !== "google" ||
        user.hasPassword
    ) {
        return (
            <div className="profile-container">
                <h1>Set Password</h1>

                <p>
                    Password setup is not available for this account.
                </p>

                <Link to="/user-dashboard">
                    Back to Dashboard
                </Link>
            </div>
        );
    }

    return (
        <div className="set-password-container">

            <h1>Set Password</h1>

            <p>
                Create a password so you can also login
                using your email and password.
            </p>

            <form onSubmit={handleSubmit}>

                {/* New Password */}

                <input
                    type="password"
                    name="newPassword"
                    placeholder="Enter New Password"
                    value={formData.newPassword}
                    onChange={handleChange}
                />

                {/* Confirm Password */}

                <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm New Password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                />

                {/* Submit */}

                <button
                    type="submit"
                    disabled={loading}
                >
                    {loading
                        ? "Setting Password..."
                        : "Set Password"}
                </button>

            </form>

            <Link to="/user-dashboard">
                Back to Dashboard
            </Link>

        </div>
    );
};

export default SetPassword;