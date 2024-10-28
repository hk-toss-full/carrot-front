import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home";
import { PaymentCheckoutPage } from "../pages/payment/payment/paymentcheckout";
import PaymentSuccessPage from "../pages/payment/payment/paymentsuccess";
import DailyLife from "../pages/daily/DailyLife";
import MyPage from "../pages/mypage/MyPage";
import FailPage from "../pages/payment/fail";

type CustomRouteObject = {
  label?: string;
  show?: boolean;
  children?: CustomRouteObject[];
} & RouteObject;

const ROUTES: CustomRouteObject[] = [
  {
    path: "/",
    element: <Home />,
    label: "홈",
    show: true,
    children: [{ path: "/", element: <Home />, label: "홈", show: true }],
  },
  {
    path: "payment",
    children: [
      { path: "checkout", element: <PaymentCheckoutPage /> },
      { path: "success", element: <PaymentSuccessPage /> },
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
  {
    path: "/fail",
    element: <FailPage />,
    label: "결제 실패",
    show: true,
  },
];

const router = createBrowserRouter(ROUTES);

export default router;
