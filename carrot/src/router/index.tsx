import { createBrowserRouter, RouteObject } from "react-router-dom";

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
    children: [
      { path: "/", element: <Home /> },
      { path: "/payment", element: <Container /> },  // 결제 페이지 경로 추가
    ],
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
  { path: "/", element: <Container />, children: ROUTES },
]);

export default router;
