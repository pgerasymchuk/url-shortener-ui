import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { jwtDecode } from "jwt-decode";

const USER_ROLE_CLAIM_NAME = "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [token, setToken_] = useState(localStorage.getItem("token"));
    const [role, setRole] = useState(localStorage.getItem("role"));

    const setToken = (newToken) => {
        setToken_(newToken);
    };

    const isAdmin = () => {
        return role === 'Admin';
    }

    useEffect(() => {
        if (token) {
            localStorage.setItem("token", token);
            const decoded = jwtDecode(token);
            localStorage.setItem("role", decoded[USER_ROLE_CLAIM_NAME]);
            setRole(decoded[USER_ROLE_CLAIM_NAME])
        } else {
            localStorage.removeItem("token");
            localStorage.removeItem("role");
        }
    }, [token]);

    const contextValue = useMemo(
        () => ({
            token,
            setToken,
            isAdmin
        }),
        [token, role]
    );

    return (
        <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};

export default AuthProvider;