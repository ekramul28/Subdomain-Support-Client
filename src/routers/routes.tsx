// src/routes/index.tsx

import LoginForm from "@/pages/Login";
import { NotFoundPage } from "@/pages/NotFound";
import RegisterForm from "@/pages/Register";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
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
