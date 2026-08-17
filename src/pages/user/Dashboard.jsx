import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import "../../Styles/Dashboard/UserDashboard.css";

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="dashboard-container">
      <h1>User Dashboard</h1>

      <div className="user-card">

        {/* ================= Profile Image ================= */}
        <img
          src={
            user?.profileImage ||
            "https://via.placeholder.com/150"
          }
          alt={user?.name || "Profile"}
          width={150}
          height={150}
        />

        {/* ================= User Name ================= */}
        <h2>{user?.name}</h2>

        {/* ================= User Email ================= */}
        <p>
          <strong>Email:</strong> {user?.email}
        </p>

        {/* ================= User Role ================= */}
        <p>
          <strong>Role:</strong> {user?.role}
        </p>


        {/* ================= Dashboard Actions ================= */}
        <div className="dashboard-actions">

          {/* Profile */}
          <Link to="/profile">
            Profile
          </Link>

          {/* Update Profile */}
          <Link to="/edit-profile">
            Update Profile
          </Link>

          {/* =================================================
              Google User Without Password
          ================================================= */}
          {user?.provider === "google" &&
            !user?.hasPassword && (
              <Link to="/set-password">
                Set Password
              </Link>
            )}

          {/* =================================================
              User Who Has Password
          ================================================= */}
          {user?.hasPassword && (
            <Link to="/change-password">
              Change Password
            </Link>
          )}

          {/* Upload Profile Image */}
          <Link to="/upload-profile-image">
            Upload Image
          </Link>

          {/* Delete Profile Image */}
          <Link to="/delete-profile-image">
            Delete Image
          </Link>

          {/* Delete Account */}
          <Link to="/delete-account">
            Delete Account
          </Link>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;