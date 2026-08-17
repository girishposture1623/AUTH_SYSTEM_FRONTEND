import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import {
  updateProfile,
  uploadProfileImage,
  sendChangeEmailOTP,
} from "../../api/userApi";

import useAuth from "../../hooks/useAuth";

import "../../Styles/User/EditProfile.css";

const EditProfile = () => {
  const navigate = useNavigate();

  const { user, loadUser } = useAuth();

  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
      });

      setPreview(user.profileImage || "");
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const name = formData.name.trim();
    const email = formData.email.trim().toLowerCase();
    const phone = formData.phone.trim();

    if (!name || !email) {
      return toast.error("Name and Email are required.");
    }

    setLoading(true);

    try {
      // Email बदलला आहे
      if (email !== user.email) {
        const response = await sendChangeEmailOTP({ email });

        toast.success(response.data.message);

        navigate("/verify-otp", {
          state: {
            type: "change-email",
            name,
            email,
            phone,
            image,
          },
        });

        return;
      }

      // Email बदललेला नाही
      const response = await updateProfile({
        name,
        email,
        phone,
      });

      // Upload Profile Image
      if (image) {
        const imageData = new FormData();
        imageData.append("image", image);

        await uploadProfileImage(imageData);
      }

      await loadUser();

      toast.success(response.data.message || "Profile updated successfully.");

      navigate("/profile");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="ep-page">
      <h1 className="ep-title">Edit Profile</h1>

      <form className="ep-form" onSubmit={handleSubmit}>
        {/* Profile Preview */}

        {preview && (
          <img className="ep-preview-image" src={preview} alt="Profile" />
        )}

        {/* Profile Image */}

        <input
          className="ep-file-input"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />

        {/* Name */}

        <input
          className="ep-text-input"
          type="text"
          name="name"
          placeholder="Enter Name"
          value={formData.name}
          onChange={handleChange}
        />

        {/* Email */}

        <input
          className="ep-email-input"
          type="email"
          name="email"
          placeholder="Enter Email"
          value={formData.email}
          onChange={handleChange}
        />

        {/* Phone */}

        <div className="phone-input">
          <span className="country-code">🇮🇳 +91</span>

          <input
            className="phone-field"
            type="tel"
            name="phone"
            placeholder="Enter mobile number"
            value={formData.phone}
            onChange={handleChange}
            maxLength={10}
            inputMode="numeric"
          />
        </div>

        {/* Update Button */}

        <button className="ep-update-button" type="submit" disabled={loading}>
          {loading ? "Please wait..." : "Update Profile"}
        </button>

        {/* Back */}

        <Link className="ep-back-link" to="/user-dashboard">
          Back to Dashboard
        </Link>
      </form>
    </div>
  );
};

export default EditProfile;
