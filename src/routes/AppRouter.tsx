import { createBrowserRouter, Navigate } from "react-router";
import FormsPage from "../pages/FormsPage";
import FormDesignerPage from "../pages/FormDesignerPage";
import FormViewPage from "../pages/FormViewPage";

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
    path: "/forms/u/:id",
    element: <FormViewPage />
  },
  {
    path: "/forms/designer/:id?",
    element: <FormDesignerPage />
  }
]);

export default AppRouter;
