// src/pages/payment/PaymentSuccess.tsx
import React from "react";
import Button from "@/components/Button";  // 버튼 컴포넌트 불러오기

const PaymentSuccess: React.FC = () => {
  const handleComplete = () => {
    // 완료 버튼 클릭 시 실행할 동작
    console.log("결제가 완료되었습니다.");
  };

  return (
    <div className="text-center text-xl font-semibold">
      <div>결제가 완료되었습니다!</div>
      <Button text="완료하기" onClick={handleComplete} /> 결제 완료하기 
    </div>
  );
};

export default PaymentSuccess;
