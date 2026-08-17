import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

import { verifyOtp, resendOtp } from '../../api/authApi';
import { verifyChangeEmailOTP, uploadProfileImage ,sendChangeEmailOTP} from '../../api/userApi';

import useAuth from '../../hooks/useAuth';
import "../../Styles/Auth/AuthFlow.css";

const VerifyOtp = () => {
    const navigate = useNavigate();
    const { loadUser } = useAuth();
    const location = useLocation();

    const email = location.state?.email;
    const type = location.state?.type || 'register';
    const name = location.state?.name;
    const phone = location.state?.phone;
    const image = location.state?.image;

    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);
    const [resendLoading, setResendLoading] = useState(false);
    const [timer, setTimer] = useState(60);

    useEffect(() => {
        if (!email) {
            navigate('/register');
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
            return toast.error('OTP is required.');
        }

        if (otp.trim().length !== 6) {
            return toast.error('OTP must be 6 digits.');
        }

        setLoading(true);

        try {
            // Register Verification
            if (type === 'register') {
                const response = await verifyOtp({
                    email,
                    otp: otp.trim(),
                });

                toast.success(response.data.message);

                navigate('/login');
            }

            // Change Email Verification
            else {
                const response = await verifyChangeEmailOTP({
                    email,
                    otp: otp.trim(),
                    name,
                    phone,
                });

                if (image) {
                    const imageData = new FormData();
                    imageData.append('image', image);

                    await uploadProfileImage(imageData);
                }

                await loadUser();

                toast.success(response.data.message);

                navigate('/profile');
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Something went wrong.');
        } finally {
            setLoading(false);
        }
    };
    const handleResendOtp = async () => {
        setResendLoading(true);

        try {
            let response;

            if (type === 'register') {
                response = await resendOtp({
                    email,
                });
            } else {
                response = await sendChangeEmailOTP({
                    email,
                });
            }

            toast.success(response.data.message);

            setOtp('');
            setTimer(60);
        } catch (error) {
            toast.error(error.response?.data?.message || 'Something went wrong.');
        } finally {
            setResendLoading(false);
        }
    };

    return (
        <div className="verify-otp-container">
            <h1>Verify OTP</h1>

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
                    {loading ? 'Verifying...' : 'Verify OTP'}
                </button>
            </form>

            {timer > 0 ? (
                <p>Resend OTP in {timer}s</p>
            ) : (
                <button type="button" onClick={handleResendOtp} disabled={resendLoading}>
                    {resendLoading ? 'Sending...' : 'Resend OTP'}
                </button>
            )}

            <p>
                <Link to="/login">Back to Login</Link>
            </p>
        </div>
    );
};

export default VerifyOtp;
