import {RouterProvider, createBrowserRouter, Navigate } from "react-router-dom";
import {ProtectedRoute} from "./ProtectedRoute";
import SignUpPage from "../pages/SignUpPage.jsx";
import SignInPage from "../pages/SignInPage.jsx";
import MainPage from "../pages/MainPage.jsx";
import UrlDetailsPage from "../pages/UrlDetailsPage.jsx";
import {useAuth} from "../providers/authProvider.jsx";
import AboutPage from "../pages/AboutPage.jsx";

const Routes = () => {
    const {token} = useAuth();

    const routesForPublic = [
        {
            path: "/about",
            element: <AboutPage />,
        }
    ];

    const routesForAuthenticatedOnly = [
        {
            path: "/url/:id",
            element: <ProtectedRoute/>,
            children: [{
                path: "",
                element: <UrlDetailsPage/>
            }]
        },

        {
            path: "/",
            element: <ProtectedRoute/>,
            children: [{
                path: "",
                element: <MainPage/>,
            }]
        },
    ];

    const routesForNotAuthenticatedOnly = [
        {
            path: "/",
            element: <Navigate to={'/signin'} replace={true}/>,
        },
        {
            path: "/signin",
            element: <SignInPage/>,
        },
        {
            path: "/signup",
            element: <SignUpPage/>,
        }
    ];

    const router = createBrowserRouter([
        ...routesForPublic,
        ...(!token ? routesForNotAuthenticatedOnly : []),
        ...routesForAuthenticatedOnly,
    ]);

    return <RouterProvider router={router}/>;
};

export default Routes;