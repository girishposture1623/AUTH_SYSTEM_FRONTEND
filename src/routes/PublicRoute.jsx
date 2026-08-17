import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const PublicRoute = () => {
    const { loading, isAuthenticated } = useAuth();
    const location = useLocation();

    if (loading) {
        return <h2>Loading...</h2>;
    }

    
    if (isAuthenticated && location.pathname === "/verify-otp") {
        return <Outlet />;
    }

    if (isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default PublicRoute;