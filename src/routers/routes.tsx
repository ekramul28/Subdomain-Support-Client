// src/routes/index.tsx

import DashboardLayout from "@/components/layout/DashboardLayout";
import LoginForm from "@/pages/Login";
import { NotFoundPage } from "@/pages/NotFound";
import RegisterForm from "@/pages/Register";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/dashboard",
    element: <DashboardLayout />,
  },
  {
    path: "/login",
    element: <LoginForm />,
  },
  {
    path: "/register",
    element: <RegisterForm />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default router;
