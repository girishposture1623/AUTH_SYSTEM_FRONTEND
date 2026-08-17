import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import { deleteProfileImage } from "../../api/userApi";
import useAuth from "../../hooks/useAuth";
import "../../Styles/User/DeleteProfileImage.css";

const DeleteProfileImage = () => {
  const navigate = useNavigate();

  const { user, loadUser } = useAuth();

  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your profile image?",
    );

    if (!confirmDelete) return;

    setLoading(true);

    try {
      const response = await deleteProfileImage();

      await loadUser();

      toast.success(response.data.message);

      navigate("/profile");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="delete-profile-image-container">
      <h1>Delete Profile Image</h1>

      <img
        src={user?.profileImage || "https://via.placeholder.com/150"}
        alt="Profile"
        width={150}
        height={150}
      />

      <br />
      <br />

      <button onClick={handleDelete} disabled={loading}>
        {loading ? "Deleting..." : "Delete Image"}
      </button>
      <br />
      <Link to="/user-dashboard">Back to Dashboard</Link>
    </div>
  );
};

export default DeleteProfileImage;
