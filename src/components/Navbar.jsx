import { useState } from "react";
import { toast } from "react-hot-toast";
import {
  Link,
  NavLink,
  useNavigate,
} from "react-router-dom";

import logo from "../assets/Auth.png";
import useAuth from "../hooks/useAuth";

import "../Styles/Navbar/Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  const {
    user,
    isAuthenticated,
    logout,
  } = useAuth();

  const [menuOpen, setMenuOpen] = useState(false);

  // =====================================================
  // Close Mobile Menu
  // =====================================================

  const closeMenu = () => {
    setMenuOpen(false);
  };

  // =====================================================
  // Logout
  // =====================================================

  const handleLogout = async () => {
    try {
      const response = await logout();

      toast.success(
        response?.data?.message || "Logout successful."
      );

      setMenuOpen(false);

      navigate("/login", {
        replace: true,
      });

    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Logout failed."
      );
    }
  };

  return (
    <nav className="navbar">

      {/* =================================================
          LOGO
          Logged In  → Dashboard
          Logged Out → Home
      ================================================= */}

      <Link
        to={
          isAuthenticated
            ? "/user-dashboard"
            : "/"
        }
        className="logo link"
        onClick={closeMenu}
      >
        <img
          src={logo}
          alt="Auth System Logo"
        />
      </Link>


      {/* =================================================
          HAMBURGER BUTTON
      ================================================= */}

      <button
        type="button"
        className="menu-toggle"
        onClick={() =>
          setMenuOpen((prev) => !prev)
        }
        aria-label="Toggle navigation menu"
        aria-expanded={menuOpen}
      >
        {menuOpen ? "✕" : "☰"}
      </button>


      {/* =================================================
          NAVIGATION LINKS
      ================================================= */}

      <div
        className={`nav-links ${
          menuOpen ? "active" : ""
        }`}
      >

        {/* =================================================
            LOGGED OUT USER
        ================================================= */}

        {!isAuthenticated ? (
          <>

            {/* Home */}

            <NavLink
              to="/"
              className="links"
              onClick={closeMenu}
            >
              Home
            </NavLink>


            {/* Login */}

            <NavLink
              to="/login"
              className="links"
              onClick={closeMenu}
            >
              Login
            </NavLink>


            {/* Register */}

            <NavLink
              to="/register"
              className="links"
              onClick={closeMenu}
            >
              Register
            </NavLink>

          </>
        ) : (

          /* =================================================
             LOGGED IN USER
          ================================================= */

          <>

            {/* Dashboard */}

            <NavLink
              to="/user-dashboard"
              className="links"
              onClick={closeMenu}
            >
              Dashboard
            </NavLink>


            {/* Profile */}

            <NavLink
              to="/profile"
              className="links"
              onClick={closeMenu}
            >
              Profile
            </NavLink>


            {/* Admin */}

            {user?.role === "admin" && (
              <NavLink
                to="/admin"
                className="links"
                onClick={closeMenu}
              >
                Admin
              </NavLink>
            )}


            {/* Logout */}

            <button
              type="button"
              className="logout-btn"
              onClick={handleLogout}
            >
              Logout
            </button>

          </>
        )}

      </div>

    </nav>
  );
};

export default Navbar;