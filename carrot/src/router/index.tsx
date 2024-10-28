import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home";
import { PaymentCheckoutPage } from "../pages/payment/payment/paymentcheckout";
import PaymentSuccessPage from "../pages/payment/payment/paymentsuccess";
import PaymentListPage from "../pages/payment/pages/payements";
import PaymentDetailPage from "../pages/payment/pages/paymentdetail";
import PaymentCreatePage from "../pages/payment/pages/paymentsave";
import DailyLife from "../pages/daily/DailyLife";
import MyPage from "../pages/mypage/MyPage";
import PostDetail from "../components/home/PostDetail";
import UploadPost from "../components/home/UploadPost";
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
      { path: "list", element: <PaymentListPage /> },
      { path: ":paymentId", element: <PaymentDetailPage /> },
      { path: "create", element: <PaymentCreatePage /> },
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
    path: "/post/:id",
    element: <PostDetail />,
    label: "상품상세정보",
    show: true,
  },
  {
    path: "/write",
    element: <UploadPost />,
    label: "상품 등록",
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
