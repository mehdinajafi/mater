import { createBrowserRouter } from "react-router-dom";
import App from "@/App";
import Layout from "@/layout";
import AppPage from "@/pages";
import UserAccountPage from "@/pages/user/account";
import UserProfilePage from "@/pages/user/profile";
import AuthLoginPage from "@/pages/auth/login";
import AuthRegisterPage from "@/pages/auth/register";

const routes = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/auth",
        element: <AuthLoginPage />,
      },
      {
        path: "/auth/login",
        element: <AuthLoginPage />,
      },
      {
        path: "/auth/register",
        element: <AuthRegisterPage />,
      },
      {
        element: <Layout />,
        children: [
          {
            path: "/",
            element: <AppPage />,
          },
          {
            path: "/user",
            element: <UserProfilePage />,
          },
          {
            path: "/user/profile",
            element: <UserProfilePage />,
          },
          {
            path: "/user/account",
            element: <UserAccountPage />,
          },
        ],
      },
    ],
  },
]);

export default routes;
