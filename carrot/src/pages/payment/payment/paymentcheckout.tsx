import { loadTossPayments, TossPaymentsPayment } from "@tosspayments/tosspayments-sdk";
import { useEffect, useState } from "react";

const clientKey = "test_ck_D5GePWvyJnrK0W0k6q8gLzN97Eoq";
const customerKey = generateRandomString();

const amount = {
  currency: "KRW",
  value: 50000,
};

type PaymentMethod = "CARD" | "TRANSFER" | "VIRTUAL_ACCOUNT" | "MOBILE_PHONE" | "CULTURE_GIFT_CERTIFICATE" | "FOREIGN_EASY_PAY";

export function PaymentCheckoutPage() {
  const [payment, setPayment] = useState<TossPaymentsPayment | null>(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod | null>(null);

  function selectPaymentMethod(method: PaymentMethod) {
    setSelectedPaymentMethod(method);
  }

  useEffect(() => {
    async function fetchPayment() {
      try {
        const tossPayments = await loadTossPayments(clientKey);
        const paymentInstance = tossPayments.payment({
          customerKey,
        });
        setPayment(paymentInstance);
      } catch (error) {
        console.error("Error fetching payment:", error);
      }
    }

    fetchPayment();
  }, []);

  async function requestPayment() {
    if (!payment || !selectedPaymentMethod) return;

    const commonParams = {
      amount,
      orderId: generateRandomString(),
      orderName: "토스 티셔츠 외 2건",
      successUrl: window.location.origin + "/payment/success",
      failUrl: window.location.origin + "/fail",
      customerEmail: "customer123@gmail.com",
      customerName: "김토스",
      customerMobilePhone: "01012341234",
    };

    try {
      await payment.requestPayment({
        ...commonParams,
        method: selectedPaymentMethod,
      });
    } catch (error) {
      console.error("Payment request failed:", error);
    }
  }

  async function requestBillingAuth() {
    if (!payment) return;
    await payment.requestBillingAuth({
      method: "CARD",
      successUrl: window.location.origin + "/payment/billing",
      failUrl: window.location.origin + "/fail",
      customerEmail: "customer123@gmail.com",
      customerName: "김토스",
    });
  }

  return (
    <div className="flex flex-col items-center bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 min-h-screen py-10 font-sans">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-lg">
        <h1 className="text-3xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
          결제하기
        </h1>

        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">결제 수단 선택</h2>
          <div className="grid grid-cols-2 gap-4">
            {["CARD", "TRANSFER", "VIRTUAL_ACCOUNT", "MOBILE_PHONE", "CULTURE_GIFT_CERTIFICATE", "FOREIGN_EASY_PAY"].map((method) => (
              <button
                key={method}
                className={`py-3 px-4 rounded-lg shadow-md transition duration-200 ease-in-out 
                  ${selectedPaymentMethod === method ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
                onClick={() => selectPaymentMethod(method as PaymentMethod)}
              >
                {method}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-8 bg-gray-50 p-4 rounded-lg shadow-inner">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">결제 정보</h2>
          <p className="text-gray-600">상품 금액: <span className="font-bold text-blue-600">{amount.value.toLocaleString()}원</span></p>
        </div>

        <button
          onClick={requestPayment}
          className="w-full py-3 rounded-lg text-white font-bold text-lg transition-transform transform hover:scale-105 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
        >
          결제하기
        </button>
      </div>

      <div className="bg-white shadow-lg rounded-2xl p-8 mt-8 w-full max-w-lg">
        <h1 className="text-lg font-semibold text-center text-purple-600 mb-4">정기 결제</h1>
        <button
          onClick={requestBillingAuth}
          className="w-full py-3 rounded-lg text-white font-bold text-lg transition-transform transform hover:scale-105 bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600"
        >
          빌링키 발급하기
        </button>
      </div>
    </div>
  );
}

function generateRandomString(): string {
  return window.btoa(Math.random().toString()).slice(0, 20);
}

export default PaymentCheckoutPage;
