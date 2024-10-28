// src/pages/payment/Success.tsx
import React from "react";

interface PaymentSuccessProps {
  responseData: any;
}

const PaymentSuccess: React.FC<PaymentSuccessProps> = ({ responseData }) => {
  return (
    <div className="text-center text-xl font-semibold">
      <div>결제가 완료되었습니다!</div>
      {responseData && (
        <div className="mt-4">
          <p>주문번호: {responseData.orderId}</p>
          <p>결제 금액: {responseData.amount.toLocaleString()}원</p>
          <p>결제 키: {responseData.paymentKey}</p>
        </div>
      )}
    </div>
  );
};

export default PaymentSuccess;
