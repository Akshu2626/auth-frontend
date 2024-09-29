import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            try {
                const decoded = jwtDecode(token);
                setUser(decoded);
                setIsAuthenticated(true);
            } catch (error) {
                console.error("Token is invalid:", error);
                setIsAuthenticated(false);
            }
        } else {
            setIsAuthenticated(false);
        }

        setLoading(false);
    }, []);
    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    return { isAuthenticated, user, logout };
};

export default useAuth;
