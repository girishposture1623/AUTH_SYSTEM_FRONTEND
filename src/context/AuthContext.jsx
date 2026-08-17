import { useEffect, useState } from "react";

import { getCurrentUser, logOut } from "../api/authApi";
import { AuthContext } from "./AuthContextValue";

import Loader from "../components/Loader/Loader";

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(true);

    const [isAuthenticated, setIsAuthenticated] = useState(false);


    // =====================================================
    // Load Current Logged-in User
    // =====================================================

    const loadUser = async () => {

        try {

            setLoading(true);

            const response = await getCurrentUser();

            setUser(response.data.user);

            setIsAuthenticated(true);

        } catch (error) {

            setUser(null);

            setIsAuthenticated(false);

        } finally {

            setLoading(false);

        }
    };


    // =====================================================
    // Logout
    // =====================================================

    const logout = async () => {

        try {

            const response = await logOut();

            setUser(null);

            setIsAuthenticated(false);

            return response;

        } catch (error) {

            return error;
        }
    };


    // =====================================================
    // Check Authentication On App Start
    // =====================================================

    useEffect(() => {

        loadUser();

    }, []);


    // =====================================================
    // Initial Authentication Loader
    // =====================================================

    if (loading) {

        return <Loader />;

    }


    // =====================================================
    // Auth Context
    // =====================================================

    return (

        <AuthContext.Provider
            value={{
                user,
                setUser,

                loading,
                setLoading,

                isAuthenticated,
                setIsAuthenticated,

                loadUser,
                logout,
            }}
        >

            {children}

        </AuthContext.Provider>

    );
};

export default AuthProvider;