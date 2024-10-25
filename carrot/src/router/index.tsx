import { createBrowserRouter, RouteObject } from "react-router-dom";
import HomePage from "../pages/home";
import GlobalLayout from "../layouts/global";
import DailyLife from "../pages/daily/DailyLife";
import MyPage from "../pages/mypage/MyPage";

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
  {
    path: "/daily",
    element: <DailyLife />,
    label: "동네생활",
    show: true,
  },
  {
    path: "/users",
    element: <MyPage />,
    label: "마이페이지",
    show: true,
  },
];

const router = createBrowserRouter([
  { path: "/", element: <GlobalLayout />, children: ROUTES },
]);

export default router;
