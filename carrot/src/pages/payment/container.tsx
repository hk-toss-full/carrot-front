// src/pages/payment/PaymentContainer.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const PaymentContainer: React.FC = () => {
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState<"options" | "requesting" | "approving" | "success" | "failed">("options");
  const [responseData, setResponseData] = useState<any>(null);
  const [errorData, setErrorData] = useState<any>(null);

  const handleSelectPaymentMethod = (method: string) => {
    setSelectedMethod(method);
  };

  const handleProcessPayment = async () => {
    if (!selectedMethod) {
      alert("결제 방법을 선택해주세요.");
      return;
    }

    setCurrentStep("requesting");

    try {
      const requestData = {
        method: selectedMethod,
        amount: 15000,
        orderId: `ORDER_${Date.now()}`,
      };

      // 결제 요청
      const response = await apiClient.post("/confirm/payment", requestData);
      setCurrentStep("approving");

      // 승인 요청
      const approvalData = {
        orderId: response.data.orderId,
        paymentKey: response.data.paymentKey,
      };

      const approvalResponse = await apiClient.post("/confirm/brandpay", approvalData);

      if (approvalResponse.data.success) {
        setResponseData(approvalResponse.data);
        setCurrentStep("success");
      } else {
        throw new Error("결제 승인 실패");
      }
    } catch (error: any) {
      console.error("결제 처리 중 오류:", error);
      setErrorData(error.response ? error.response.data : { message: "알 수 없는 오류가 발생했습니다." });
      setCurrentStep("failed");
    }
  };

  const renderSuccess = () => (
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

  const renderFailure = () => (
    <div className="text-center text-xl font-semibold">
      <div>결제가 실패했습니다!</div>
      {errorData && (
        <div className="mt-4">
          <p>에러 메시지: {errorData.message}</p>
          <p>에러 코드: {errorData.code}</p>
        </div>
      )}
      <button
        onClick={() => navigate("/")}
        className="mt-4 bg-blue-500 text-white font-bold py-2 px-4 rounded"
      >
        홈으로 돌아가기
      </button>
    </div>
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 font-sans">
      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-4xl">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">결제창</h1>

        {currentStep === "options" && (
          <>
            <div className="grid grid-cols-3 gap-4 mb-8">
              {["Toss", "Samsung Pay", "신용카드"].map((method) => (
                <button
                  key={method}
                  onClick={() => handleSelectPaymentMethod(method)}
                  className={`py-12 px-6 rounded-lg transition duration-300 ease-in-out shadow-lg text-lg font-medium flex flex-col items-center justify-center
                    ${selectedMethod === method ? "bg-blue-700 text-white" : "bg-gray-700 text-white hover:bg-gray-800"}`}
                >
                  {method}
                </button>
              ))}
            </div>
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-700 mb-4">결제 정보</h2>
              <p className="text-gray-600 mb-4">상품 금액: ₩15,000</p>
            </div>
            <div className="text-center">
              <button
                onClick={handleProcessPayment}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-20 rounded-lg shadow-lg transition duration-300 ease-in-out w-full"
              >
                결제하기
              </button>
            </div>
          </>
        )}

        {currentStep === "requesting" && <div className="text-center text-xl font-semibold">결제 요청 중입니다...</div>}

        {currentStep === "approving" && <div className="text-center text-xl font-semibold">결제 승인 중입니다...</div>}

        {currentStep === "success" && renderSuccess()}

        {currentStep === "failed" && renderFailure()}
      </div>
    </div>
  );
};

export default PaymentContainer;
