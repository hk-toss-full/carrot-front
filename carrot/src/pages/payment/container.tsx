// src/pages/payment/PaymentContainer.tsx
import React, { useState } from "react";
import PaymentOptions from "./Options";
import PaymentInfo from "./Info";
import PaymentButton from "./Button";
import ProcessingRequest from "./Request";
import ProcessingApproval from "./Approval";  // 결제 승인 중 컴포넌트
import PaymentSuccess from "./Success";  // 결제 완료 컴포넌트

const PaymentContainer: React.FC = () => {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null); // 선택된 결제 방법 저장
  const [currentStep, setCurrentStep] = useState<"options" | "info" | "requesting" | "approving" | "success">("options");

  // 결제 방법 선택 시 처리
  const handleSelectPaymentMethod = (method: string) => {
    setSelectedMethod(method); // 결제 방법 선택 시 상태 업데이트
  };

  // 결제 처리 시작 (결제하기 버튼 클릭 시 실행)
  const handleProcessPayment = () => {
    if (!selectedMethod) {
      alert("결제 방법을 선택해주세요."); // 결제 방법이 선택되지 않았을 때 알림
      return;
    }

    // 1단계: 결제 요청 중 (요청 처리 중 상태)
    setCurrentStep("requesting");

    // 2단계: 2초 후 결제 승인 중으로 상태 변경
    setTimeout(() => {
      setCurrentStep("approving");

      // 3단계: 결제 승인 중 2초 후 결제 성공 화면으로 전환
      setTimeout(() => {
        setCurrentStep("success");
      }, 2000); // 결제 승인 후 2초 후 완료
    }, 2000); // 결제 요청 중 2초 후 승인 중으로 이동
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 font-sans">
      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-4xl">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">결제창</h1>

        {/* 결제 옵션 및 결제 정보 표시 */}
        {currentStep === "options" && (
          <>
            <PaymentOptions onSelectPaymentMethod={handleSelectPaymentMethod} selectedMethod={selectedMethod} />
            <PaymentInfo />
            <PaymentButton onProcessPayment={handleProcessPayment} />
          </>
        )}

        {/* 결제 요청 중 */}
        {currentStep === "requesting" && <ProcessingRequest />}

        {/* 결제 승인 중 */}
        {currentStep === "approving" && <ProcessingApproval />}

        {/* 결제 완료 */}
        {currentStep === "success" && <PaymentSuccess />}
      </div>
    </div>
  );
};

export default PaymentContainer;
