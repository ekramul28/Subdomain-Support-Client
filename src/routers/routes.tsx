// src/routes/index.tsx

import { NotFoundPage } from "@/pages/NotFound";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default router;
