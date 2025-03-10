import { createBrowserRouter, Navigate } from "react-router";
import FormsPage from "../pages/FormsPage";
import FormDesignerPage from "../pages/FormDesignerPage";

const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to={"/forms"} replace />
  },
  {
    path: "/forms",
    element: <FormsPage />,
  },
  {
    path: "/forms/designer",
    element: <FormDesignerPage />
  },
]);

export default AppRouter;
