import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import useAuth from "../../hooks/useAuth";
import { deleteAccount } from "../../api/userApi";

import "../../Styles/User/DeleteAccount.css";

const DeleteAccount = () => {
  const navigate = useNavigate();

  const { logout } = useAuth();

  const [password, setPassword] = useState("");
  const [confirmText, setConfirmText] = useState("");
  const [loading, setLoading] = useState(false);

  // =====================================================
  // Handle Delete Account
  // =====================================================

  const handleDelete = async () => {
    // 1. Password validation
    if (!password.trim()) {
      toast.error("Please enter your password.");
      return;
    }

    // 2. DELETE text validation
    const confirmation = confirmText.trim().toUpperCase();

    if (confirmation !== "DELETE") {
      toast.error("Please type DELETE to continue.");
      return;
    }

    // 3. Final confirmation popup
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account?\n\n" +
        "You will not be able to login or register again with this account.",
    );

    if (!confirmDelete) {
      return;
    }

    try {
      setLoading(true);

      // 4. Delete Account API
      const response = await deleteAccount({
        password: password.trim(),
      });

      // 5. Success message
      toast.success(response.data.message || "Account deleted successfully.");

      // 6. Logout
      await logout();

      // 7. Go to Login
      navigate("/login", {
        replace: true,
      });
    } catch (error) {
      console.error("Delete account error:", error.response?.data || error);

      toast.error(error.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="da-page">
      <h1 className="da-title">Delete Account</h1>

     <form
    className="da-form"
    onSubmit={(e) => {
        e.preventDefault();
        handleDelete();
    }}
>
    <p className="da-warning">
        This action is permanent and cannot be undone.
    </p>

    <p className="da-instruction">
        Enter your password and type{" "}
        <strong>DELETE</strong>{" "}
        to confirm.
    </p>

    {/* Password */}

    <input
        className="da-password-input"
        type="password"
        placeholder="Enter your password"
        value={password}
        onChange={(e) =>
            setPassword(e.target.value)
        }
        disabled={loading}
    />

    {/* DELETE Confirmation */}

    <input
        className="da-confirm-input"
        type="text"
        placeholder="Type DELETE"
        value={confirmText}
        onChange={(e) =>
            setConfirmText(
                e.target.value.toUpperCase()
            )
        }
        disabled={loading}
    />

    {/* Delete Button */}

    <button
        className="da-delete-button"
        type="submit"
        disabled={loading}
    >
        {loading
            ? "Deleting..."
            : "Delete Account"}
    </button>

    <Link
        className="da-back-link"
        to="/user-dashboard"
    >
        Back to Dashboard
    </Link>
</form>
    </div>
  );
};

export default DeleteAccount;
