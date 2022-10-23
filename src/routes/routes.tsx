import { createBrowserRouter } from "react-router-dom";
import App from "@/App";
import Layout from "@/layout";
import AppPage from "@/pages";

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
        ],
      },
    ],
  },
]);

export default routes;
