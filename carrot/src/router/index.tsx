import { RouteObject } from "react-router-dom";
import Home from "../pages/home";
import { BrandpayCheckoutPage } from "../pages/payment/brandpay/brandpaycheckout";
import { PaymentCheckoutPage } from "../pages/payment/payment/paymentcheckout";
import { PaymentSuccessPage } from "../pages/payment/payment/paymentsuccess";
import { BrandpaySuccessPage } from "../pages/payment/brandpay/brandpaysuccess";
import { WidgetCheckoutPage } from "../pages/payment/widget/widgetcheckout";
import { WidgetSuccessPage } from "../pages/payment/widget/widgetsuccess";
import DailyLife from "../pages/daily/DailyLife";
import MyPage from "../pages/mypage/MyPage";

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
    children: [
      { path: "/", element: <Home />, label: "홈", show: true }
    ],
  },
  {
    path: "widget",
    children: [
      {
        path: "checkout",
        element: <WidgetCheckoutPage />,
      },
      {
        path: "success",
        element: <WidgetSuccessPage />,
      },
    ],
  },
  {
    path: "brandpay",
    children: [
      {
        path: "checkout",
        element: <BrandpayCheckoutPage />,
      },
      {
        path: "success",
        element: <BrandpaySuccessPage />,
      },
    ],
  },
  {
    path: "payment",
    children: [
      {
        path: "checkout",
        element: <PaymentCheckoutPage />,
      },
      {
        path: "success",
        element: <PaymentSuccessPage />,
      },
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

export default ROUTES;