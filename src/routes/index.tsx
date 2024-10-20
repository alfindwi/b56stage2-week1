import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ProtectedRoute } from "./_protected";
import FollowsRoute from "./follows";
import ForgotRoute from "./forgot";
import FormPostRoute from "./form-post";
import HomeRoute from "./home";
import LoginRoute from "./login";
import ProfileRoute from "./profile";
import RegisterRoute from "./register";
import ResetRoute from "./reset";
import SearchRoute from "./seacrh";

export function AppRoute() {
    const router = createBrowserRouter([
        {
            path: "/login",
            element: <LoginRoute />,
        },
        {
            path: "/register",
            element: <RegisterRoute />,
        },
        {
            path: "/forgotpassword",
            element: <ForgotRoute />,
        },
        {
            path: "/resetpassword",
            element: <ResetRoute />,
        },
        {
            element: <ProtectedRoute />,
            children: [
                {
                    path: "/",
                    element: <HomeRoute />,
                },
                {
                    path: "/follows",
                    element: <FollowsRoute />,
                },
                {
                    path: "/search",
                    element: <SearchRoute />,
                },
                {
                    path: "/profile",
                    element: <ProfileRoute />,
                },
                {
                    path: "/form-post",
                    element: <FormPostRoute />,
                },
            ],
        },
    ]);

    return <RouterProvider router={router} />;
}
