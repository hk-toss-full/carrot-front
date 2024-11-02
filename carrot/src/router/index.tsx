import { createBrowserRouter, RouteObject } from "react-router-dom";
import Home from "../pages/home";
import PaymentCheckoutPage from "../pages/payment/payment/paymentcheckout";
import PaymentSuccessPage from "../pages/payment/payment/paymentsuccess";
import PaymentListPage from "../pages/payment/pages/payements";
import PaymentDetailPage from "../pages/payment/pages/paymentdetail";
import PaymentCreatePage from "../pages/payment/pages/paymentsave";
import MyPage from "../pages/mypage";
import PostDetail from "../components/home/PostDetail";
import UploadPost from "../components/home/UploadPost";
import FailPage from "../pages/payment/fail";
import GlobalLayout from "../layouts/global";
import DailyLife from "../pages/daily";
import ChatList from "../pages/chat/ChatList";
import ChatMessage from "../pages/chat/ChatMessage";
// import ChatMessage from "../pages/chat/ChatMessage";
import LoginPage from "../pages/login";
import KakaoAuth from "../components/login/kakaoAuth";

type CustomRouteObject = {
  label?: string;
  show?: boolean;
} & RouteObject;

const ROUTES: CustomRouteObject[] = [
  {
    path: "/login",
    element: <LoginPage />,
    show: true,
  },
  {
    path: "/auth/kakao",
    element: <KakaoAuth />,
    show: false,
  },
  {
    path: "/home",
    element: <Home />,
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
  {
    path: "/posts/:id",
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
    path: "/chat/rooms",
    element: <ChatList />,
    label: "채팅",
    show: true,
  },
  {
    path: "/chat/rooms/:chatRoomId",
    element: <ChatMessage />,
    label: "채팅방",
    show: true,
  },
  {
    path: "/payment/checkout",
    element: <PaymentCheckoutPage />,
    label: "결제 체크",
    show: true,
  },
  {
    path: "/payment/success",
    element: <PaymentSuccessPage />,
    label: "결제 성공",
    show: true,
  },
  {
    path: "/payment/list",
    element: <PaymentListPage />,
    label: "결제 리스트",
    show: true,
  },
  {
    path: "/payment/:paymentId",
    element: <PaymentDetailPage />,
    label: "결제 정보",
    show: true,
  },
  {
    path: "/payment/create",
    element: <PaymentCreatePage />,
    label: "결제 생성",
    show: true,
  },
  {
    path: "/fail",
    element: <FailPage />,
    label: "결제 실패",
    show: true,
  },
];

const router = createBrowserRouter([
  { path: "/", element: <GlobalLayout />, children: ROUTES },
]);

export default router;
