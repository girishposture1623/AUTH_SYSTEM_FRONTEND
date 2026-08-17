import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const AdminRoute = ({ children }) => {
    const { loading, isAuthenticated, user } = useAuth();

    if (loading) return <h2>Loading...</h2>;

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (user?.role !== 'admin') {
        return <Navigate to="/dashboard" replace />;
    }

    return children ? children : <Outlet />;
};

export default AdminRoute;
