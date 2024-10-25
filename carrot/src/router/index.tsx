import { createBrowserRouter, RouteObject } from "react-router-dom";
import Home from "@/pages/home";
import GlobalLayout from "@/layouts/global";
import Container from "../pages/payment/container";

type CustomRouteObject = {
  label?: string;
  show?: boolean;
} & RouteObject;

export const ROUTES: CustomRouteObject[] = [
  {
    path: "/",
    element: <Home />,
    label: "홈",
    show: true,
    children: [
      { path: "/", element: <Home /> },
      { path: "/payment", element: <Container /> },  // 결제 페이지 경로 추가
    ],
  },
];

const router = createBrowserRouter([
  { path: "/", element: <Container />, children: ROUTES },
]);

export default router;
