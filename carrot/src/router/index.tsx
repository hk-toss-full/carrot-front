<<<<<<< HEAD
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, RouteObject } from "react-router-dom";
import Home from "../pages/home";
// import GlobalLayout from "../layouts/global";
import Container from "../pages/payment/container";
import { BrandpayCheckoutPage } from "../pages/payment/brandpay/brandpaycheckout";
import { FailPage } from "../pages/payment/fail";
import { PaymentCheckoutPage } from "../pages/payment/payment/paymentcheckout";
import { PaymentSuccessPage } from "../pages/payment/payment/paymentsuccess";
import { BrandpaySuccessPage } from "../pages/payment/brandpay/brandpaysuccess";
import { WidgetCheckoutPage } from "../pages/payment/widget/widgetcheckout";
import { WidgetSuccessPage } from "../pages/payment/widget/widgetsuccess";
=======
import { createBrowserRouter, RouteObject } from "react-router-dom";
>>>>>>> 161e4dcc991f38ad9e8f027f67af7c019257ca47

type CustomRouteObject = {
  label?: string;
  show?: boolean;
} & RouteObject;

const ROUTES: CustomRouteObject[] = [
  {
    path: "/",
<<<<<<< HEAD
    element: <GlobalLayout />,
=======
    element: <HomePage />,
    label: "홈",
    show: true,
>>>>>>> 161e4dcc991f38ad9e8f027f67af7c019257ca47
    children: [
      { path: "/", element: <Home />, label: "홈", show: true },
      { path: "/payment", element: <Container />, label: "결제 페이지", show: true },
    ],
  },
  {
<<<<<<< HEAD
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
    path: "fail",
    element: <FailPage />,
=======
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
>>>>>>> 161e4dcc991f38ad9e8f027f67af7c019257ca47
  },
];

const router = createBrowserRouter(ROUTES);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);

export default ROUTES