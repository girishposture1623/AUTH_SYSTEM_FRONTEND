import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import { resetPassword } from "../../api/authApi";
import "../../Styles/Auth/AuthFlow.css";
const ResetPassword = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const email = location.state?.email;

    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        password: "",
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

        const password = formData.password.trim();
        const confirmPassword = formData.confirmPassword.trim();

        if (!password || !confirmPassword) {
            return toast.error("All fields are required.");
        }

        if (password.length < 8) {
            return toast.error(
                "Password must be at least 8 characters long."
            );
        }

        if (password !== confirmPassword) {
            return toast.error("Passwords do not match.");
        }

        setLoading(true);

        try {
            const response = await resetPassword({
                email,
                password,
            });

            toast.success(response.data.message);

            navigate("/login");
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Something went wrong."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="reset-password-container">
            <h1>Reset Password</h1>

            <p>
                Create a new password for <strong>{email}</strong>
            </p>

            <form onSubmit={handleSubmit}>
                <input
                    type="password"
                    name="password"
                    placeholder="New Password"
                    value={formData.password}
                    onChange={handleChange}
                />

                <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm New Password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                />

                <button
                    type="submit"
                    disabled={loading}
                >
                    {loading ? "Updating..." : "Reset Password"}
                </button>
            </form>

            <p>
                <Link to="/login">
                    Back to Login
                </Link>
            </p>
        </div>
    );
};

export default ResetPassword;