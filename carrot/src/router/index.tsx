import { createBrowserRouter, RouteObject } from "react-router-dom";
import HomePage from "../pages/home";
import GlobalLayout from "../layouts/global";

type CustomRouteObject = {
  label?: string;
  show?: boolean;
} & RouteObject;

export const ROUTES: CustomRouteObject[] = [
  {
    path: "/",
    element: <HomePage />,
    label: "홈",
    show: true,
  },
];

const router = createBrowserRouter([
  { path: "/", element: <GlobalLayout />, children: ROUTES },
]);

export default router;
