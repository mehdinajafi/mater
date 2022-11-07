import { createBrowserRouter } from "react-router-dom";
import App from "@/App";
import ProtectedRoute from "./ProtectedRoute";
import AuthLayout from "@/layouts/AuthLayout";
import MainLayout from "@/layouts/MainLayout";
import AppPage from "@/pages";
import UserAccountPage from "@/pages/user/account";
import UserProfilePage from "@/pages/user/profile";
import AuthLoginPage from "@/pages/auth/login";
import AuthRegisterPage from "@/pages/auth/register";
import KanbanPage from "@/pages/kanban";

const routes = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        element: <AuthLayout />,
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
        ],
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            element: <MainLayout />,
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
              {
                path: "/kanban",
                element: <KanbanPage />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

export default routes;
