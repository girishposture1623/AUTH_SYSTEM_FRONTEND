import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import { forgotPassword } from "../../api/authApi";

import "../../Styles/Auth/ForgotPassword.css";
const ForgotPassword = () => {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [email, setEmail] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formattedEmail = email.trim().toLowerCase();

        if (!formattedEmail) {
            return toast.error("Email is required.");
        }

        setLoading(true);

        try {
            const response = await forgotPassword({
                email: formattedEmail,
            });

            toast.success(response.data.message);

            navigate("/verify-reset-otp", {
                state: {
                    email: formattedEmail,
                },
            });
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Something went wrong."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="forgot-password-container">
            <h1>Forgot Password</h1>

            <p>
                Enter your registered email address to receive a password reset
                OTP.
            </p>

            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    name="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <button type="submit" disabled={loading}>
                    {loading ? "Sending..." : "Send OTP"}
                </button>
            </form>

            <p>
                <Link to="/login">Back to Login</Link>
            </p>
        </div>
    );
};

export default ForgotPassword;