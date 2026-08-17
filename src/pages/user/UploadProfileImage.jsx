import { useState } from "react";
import {Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import { uploadProfileImage } from "../../api/userApi";
import useAuth from "../../hooks/useAuth";

import "../../Styles/User/UploadProfileImage.css";

const UploadProfileImage = () => {
    const navigate = useNavigate();

    const { loadUser } = useAuth();

    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState("");
    const [loading, setLoading] = useState(false);

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if (!file) return;

        // Image Validation
        if (!file.type.startsWith("image/")) {
            return toast.error("Please select a valid image.");
        }

        // Max 5 MB
        if (file.size > 5 * 1024 * 1024) {
            return toast.error("Image size must be less than 5 MB.");
        }

        setImage(file);
        setPreview(URL.createObjectURL(file));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!image) {
            return toast.error("Please select an image.");
        }

        const formData = new FormData();
        formData.append("image", image);

        setLoading(true);

        try {
            const response = await uploadProfileImage(formData);

            await loadUser();

            toast.success(response.data.message);

            navigate("/profile");
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Something went wrong."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
  <div className="upi-page">

    <h1 className="upi-title">
        Upload Profile Image
    </h1>

    <form
        className="upi-form"
        onSubmit={handleSubmit}
    >

        {/* File Input */}

        <input
            className="upi-file-input"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
        />

        {/* Image Preview */}

        {preview && (
            <img
                className="upi-preview-image"
                src={preview}
                alt="Preview"
            />
        )}

        {/* Upload Button */}

        <button
            className="upi-upload-button"
            type="submit"
            disabled={loading}
        >
            {loading
                ? "Uploading..."
                : "Upload Image"}
        </button>

        {/* Back */}

        <Link
            className="upi-back-link"
            to="/user-dashboard"
        >
            Back to Dashboard
        </Link>

    </form>

</div>
    );
};

export default UploadProfileImage;