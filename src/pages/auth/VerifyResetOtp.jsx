import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import { verifyResetOtp, resendOtp } from "../../api/authApi";
import "../../Styles/Auth/AuthFlow.css";

const VerifyResetOtp = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const email = location.state?.email;

    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);
    const [resendLoading, setResendLoading] = useState(false);
    const [timer, setTimer] = useState(60);

    useEffect(() => {
        if (!email) {
            navigate("/forgot-password");
        }
    }, [email, navigate]);

    useEffect(() => {
        if (timer <= 0) return;

        const interval = setInterval(() => {
            setTimer((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [timer]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!otp.trim()) {
            return toast.error("OTP is required.");
        }

        if (otp.trim().length !== 6) {
            return toast.error("OTP must be 6 digits.");
        }

        setLoading(true);

        try {
            const response = await verifyResetOtp({
                email,
                otp: otp.trim(),
            });

            toast.success(response.data.message);

            navigate("/reset-password", {
                state: {
                    email,
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

    const handleResendOtp = async () => {
        setResendLoading(true);

        try {
            const response = await resendOtp({
                email,
            });

            toast.success(response.data.message);

            setOtp("");
            setTimer(60);
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Something went wrong."
            );
        } finally {
            setResendLoading(false);
        }
    };

    return (
        <div className="verify-reset-otp-container">
            <h1>Verify Reset OTP</h1>

            <p>
                Enter the OTP sent to <strong>{email}</strong>
            </p>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="otp"
                    placeholder="Enter 6 Digit OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    maxLength={6}
                />

                <button type="submit" disabled={loading}>
                    {loading ? "Verifying..." : "Verify OTP"}
                </button>
            </form>

            {timer > 0 ? (
                <p>Resend OTP in {timer}s</p>
            ) : (
                <button
                    type="button"
                    onClick={handleResendOtp}
                    disabled={resendLoading}
                >
                    {resendLoading ? "Sending..." : "Resend OTP"}
                </button>
            )}

            <p>
                <Link to="/login">Back to Login</Link>
            </p>
        </div>
    );
};

export default VerifyResetOtp;