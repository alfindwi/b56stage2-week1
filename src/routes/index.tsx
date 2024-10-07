import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ForgotRoute from "./forgot";
import HomeRoute from "./home";
import LoginRoute from "./login";
import RegisterRoute from "./register";
import ResetRoute from "./reset";
import FormPostRoute from "./form-post";
import ProfileRoute from "./profile";
import SearchRoute from "./seacrh";
import FollowsRoute from "./follows";
import { ProtectedRoute } from "./_protected";

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
                {
                    path: "/forgotpassword",
                    element: <ForgotRoute />,
                },
                {
                    path: "/resetpassword",
                    element: <ResetRoute />,
                },
            ],
        },
    ]);

    return <RouterProvider router={router} />;
}
