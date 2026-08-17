import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";

import { getProfile } from "../../api/userApi";

import "../../Styles/User/Profile.css";

const Profile = () => {

    const [user, setUser] = useState(null);

    // =====================================================
    // Load Profile
    // =====================================================

    const loadProfile = async () => {

        try {

            const response = await getProfile();

            setUser(response.data.user);

        } catch (error) {

            // Server down / Network error
            if (!error.response) {
                toast.error(
                    "Server is unavailable. Please try again later."
                );
                return;
            }

            // Backend error
            toast.error(
                error.response?.data?.message ||
                "Failed to load profile. Please try again."
            );
        }
    };


    // =====================================================
    // Load Profile On Mount
    // =====================================================

    useEffect(() => {
        loadProfile();
    }, []);


    // =====================================================
    // UI
    // =====================================================

    return (

        <div className="pr-page">

            <h1 className="pr-title">
                My Profile
            </h1>


            <div className="pr-card">

                {/* Profile Image */}

                <img
                    className="pr-profile-image"
                    src={
                        user?.profileImage ||
                        "/default-avatar.png"
                    }
                    alt={
                        user?.name ||
                        "Profile"
                    }
                />


                {/* User Name */}

                <h2 className="pr-name">
                    {user?.name}
                </h2>


                {/* Email */}

                <p className="pr-info">
                    <strong>Email:</strong>{" "}
                    {user?.email}
                </p>


                {/* Role */}

                <p className="pr-info">
                    <strong>Role:</strong>{" "}
                    {user?.role}
                </p>


                {/* Verified */}

                <p className="pr-info">
                    <strong>Verified:</strong>{" "}
                    {user?.isVerified
                        ? "Yes"
                        : "No"}
                </p>


                {/* Edit Profile */}

                <Link
                    to="/edit-profile"
                    className="pr-edit-link"
                >
                    <button
                        type="button"
                        className="pr-edit-button"
                    >
                        Edit Profile
                    </button>
                </Link>


                {/* Back */}

                <Link
                    to="/user-dashboard"
                    className="pr-back-link"
                >
                    Back to Dashboard
                </Link>

            </div>

        </div>
    );
};

export default Profile;