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
import ECommerceListPage from "@/pages/e-commerce/list";
import ECommerceShopPage from "@/pages/e-commerce/shop";
import ECommerceCartPage from "@/pages/e-commerce/checkout/cart";
import ECommerceShippingPage from "@/pages/e-commerce/checkout/shipping";
import ECommercePaymentPage from "@/pages/e-commerce/checkout/payment";
import ProductPage from "@/pages/e-commerce/product";

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
              {
                path: "/e-commerce/list",
                element: <ECommerceListPage />,
              },
              {
                path: "/e-commerce/shop",
                element: <ECommerceShopPage />,
              },
              {
                path: "/e-commerce/checkout",
                element: <ECommerceCartPage />,
              },
              {
                path: "/e-commerce/checkout/cart",
                element: <ECommerceCartPage />,
              },
              {
                path: "/e-commerce/checkout/shipping",
                element: <ECommerceShippingPage />,
              },
              {
                path: "/e-commerce/checkout/payment",
                element: <ECommercePaymentPage />,
              },
              {
                path: "/e-commerce/product/:productId/:productSlug",
                element: <ProductPage />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

export default routes;
