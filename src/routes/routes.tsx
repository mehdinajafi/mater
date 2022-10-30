import { createBrowserRouter } from "react-router-dom";
import App from "@/App";
import Layout from "@/layout";
import AppPage from "@/pages";
import UserAccountPage from "@/pages/user/account";
import UserProfilePage from "@/pages/user/profile";

const routes = createBrowserRouter([
  {
    element: <App />,
    children: [
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
