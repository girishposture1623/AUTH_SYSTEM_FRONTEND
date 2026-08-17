import { Link, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

import "../Styles/Home/Home.css";

const Home = () => {
    const { user, loading } = useAuth();

    // =====================================================
    // Authentication check पूर्ण होईपर्यंत काहीही दाखवू नका
    // =====================================================

    if (loading) {
        return null;
    }

    // =====================================================
    // User already logged in
    // Home page वरून Dashboard ला redirect
    // =====================================================

    if (user) {
        return (
            <Navigate
                to="/user-dashboard"
                replace
            />
        );
    }

    // =====================================================
    // Logged-out User → Home Page
    // =====================================================

    return (
        <div className="home-page">

            {/* =================================================
                HERO SECTION
            ================================================= */}

            <section className="home-hero">

                <div className="home-hero-content">

                    <h1>
                        Welcome to
                        <span> AUTH SYSTEM</span>
                    </h1>

                    <p>
                        A secure and modern authentication system
                        with email verification, Google login,
                        password management and protected accounts.
                    </p>

                    <div className="home-hero-actions">

                        {/* Register */}

                        <Link
                            to="/register"
                            className="home-primary-btn"
                        >
                            Get Started
                        </Link>

                        {/* Login */}

                        <Link
                            to="/login"
                            className="home-secondary-btn"
                        >
                            Login
                        </Link>

                    </div>

                </div>

            </section>


            {/* =================================================
                FEATURES SECTION
            ================================================= */}

            <section className="home-features">

                <h2>
                    Authentication Features
                </h2>

                <p className="home-section-description">
                    Everything you need for a secure authentication
                    experience.
                </p>


                <div className="home-feature-grid">

                    {/* Secure Registration */}

                    <div className="home-feature-card">

                        <h3>
                            🔐 Secure Registration
                        </h3>

                        <p>
                            Create your account with secure
                            password validation and email
                            verification.
                        </p>

                    </div>


                    {/* Email OTP */}

                    <div className="home-feature-card">

                        <h3>
                            📧 Email OTP Verification
                        </h3>

                        <p>
                            Verify your email address using a
                            secure OTP verification system.
                        </p>

                    </div>


                    {/* Google Login */}

                    <div className="home-feature-card">

                        <h3>
                            🌐 Google Login
                        </h3>

                        <p>
                            Sign in quickly and securely using
                            your Google account.
                        </p>

                    </div>


                    {/* Password Management */}

                    <div className="home-feature-card">

                        <h3>
                            🔑 Password Management
                        </h3>

                        <p>
                            Set, change and reset your password
                            securely whenever required.
                        </p>

                    </div>


                    {/* Protected Routes */}

                    <div className="home-feature-card">

                        <h3>
                            🛡️ Protected Routes
                        </h3>

                        <p>
                            Authentication middleware protects
                            private user resources and pages.
                        </p>

                    </div>


                    {/* Profile Management */}

                    <div className="home-feature-card">

                        <h3>
                            👤 Profile Management
                        </h3>

                        <p>
                            Manage your profile information and
                            profile image from your account.
                        </p>

                    </div>

                </div>

            </section>


            {/* =================================================
                SECURITY SECTION
            ================================================= */}

            <section className="home-security">

                <div className="home-security-content">

                    <h2>
                        Built With Security in Mind
                    </h2>

                    <p>
                        AUTH SYSTEM provides a secure authentication
                        experience using modern authentication and
                        account protection techniques.
                    </p>

                    <div className="home-security-list">

                        <span>
                            ✓ Password Hashing
                        </span>

                        <span>
                            ✓ JWT Authentication
                        </span>

                        <span>
                            ✓ Email Verification
                        </span>

                        <span>
                            ✓ Protected API Routes
                        </span>

                        <span>
                            ✓ Account Protection
                        </span>

                        <span>
                            ✓ Secure Password Validation
                        </span>

                    </div>

                </div>

            </section>


            {/* =================================================
                CALL TO ACTION
            ================================================= */}

            <section className="home-cta">

                <h2>
                    Ready to get started?
                </h2>

                <p>
                    Create your account and experience
                    a secure authentication system.
                </p>

                <Link
                    to="/register"
                    className="home-cta-button"
                >
                    Create Account
                </Link>

            </section>


            {/* =================================================
                FOOTER
            ================================================= */}

            <footer className="home-footer">

                <h3>
                    AUTH SYSTEM
                </h3>

                <p>
                    Secure authentication made simple.
                </p>

                <div className="home-footer-links">

                    <Link to="/login">
                        Login
                    </Link>

                    <Link to="/register">
                        Register
                    </Link>

                </div>

                <p className="home-copyright">
                    © 2026 AUTH SYSTEM. All rights reserved.
                </p>

            </footer>

        </div>
    );
};

export default Home;