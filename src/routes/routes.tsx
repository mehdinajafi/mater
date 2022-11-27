import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "@/App";
import MainLayout from "@/layouts/MainLayout";
import ProtectedRoute from "./ProtectedRoute";
import PageLoading from "./PageLoading";

const AuthLayout = lazy(() => import("@/layouts/AuthLayout"));
const AuthLoginPage = lazy(() => import("@/pages/auth/login"));
const AuthRegisterPage = lazy(() => import("@/pages/auth/register"));

const HomePage = lazy(() => import("@/pages"));
const UserProfilePage = lazy(() => import("@/pages/user/profile"));
const UserAccountPage = lazy(() => import("@/pages/user/account"));
const KanbanPage = lazy(() => import("@/pages/kanban"));
const ECommerceListPage = lazy(() => import("@/pages/e-commerce/list"));
const ECommerceShopPage = lazy(() => import("@/pages/e-commerce/shop"));
const ECommerceCartPage = lazy(
  () => import("@/pages/e-commerce/checkout/cart")
);
const ECommerceShippingPage = lazy(
  () => import("@/pages/e-commerce/checkout/shipping")
);
const ECommercePaymentPage = lazy(
  () => import("@/pages/e-commerce/checkout/payment")
);
const ProductPage = lazy(() => import("@/pages/e-commerce/product"));

const routes = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        element: <PageLoading />,
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
        ],
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            element: <MainLayout />,
            children: [
              {
                element: <PageLoading />,

                children: [
                  {
                    path: "/",
                    element: <HomePage />,
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
    ],
  },
]);

export default routes;
