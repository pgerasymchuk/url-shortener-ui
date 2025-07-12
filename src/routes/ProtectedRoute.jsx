import { Navigate, Outlet } from "react-router-dom";
import {useAuth} from "../providers/authProvider.jsx";

export const ProtectedRoute = () => {
    const { token } = useAuth();

    if (!token) {
        return <Navigate to="/signin" />;
    }

    return <Outlet />;
};
