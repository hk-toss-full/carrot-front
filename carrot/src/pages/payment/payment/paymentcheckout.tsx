import { loadTossPayments, ANONYMOUS  } from "@tosspayments/tosspayments-sdk";
import { useEffect, useState } from "react";

const clientKey = "test_ck_kYG57Eba3GZzXaRdnYYL8pWDOxmA";
const customerKey = "gK3gyG1Kb5pUxqrq4ZmoE";

const amount = {
  currency: "KRW",
  value: 50000,
};

type PaymentMethod = "카드" | "계좌이체" | "가상계좌" | "휴대폰 결제" | "문화상품권" | "해외 간편결제";

function convertToEnglishMethod(method: PaymentMethod): string {
  switch (method) {
    case "카드":
      return "CARD";
    case "계좌이체":
      return "TRANSFER";
    case "가상계좌":
      return "VIRTUAL_ACCOUNT";
    case "휴대폰 결제":
      return "MOBILE_PHONE";
    case "문화상품권":
      return "CULTURE_GIFT_CERTIFICATE";
    case "해외 간편결제":
      return "FOREIGN_EASY_PAY";
    default:
      return "";
  }
}

export function PaymentCheckoutPage() {
  const [payment, setPayment] = useState<ANONYMOUS  | null>(null);
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
        method: convertToEnglishMethod(selectedPaymentMethod), // 한국어를 영어 결제 방법으로 변환
      });
    } catch (error) {
      console.error("Payment request failed:", error);
    }
  }

  async function requestBillingAuth() {
    if (!payment) return;
    await payment.requestBillingAuth({
      method: "CARD", // 자동결제(빌링)은 카드만 지원합니다
      successUrl: window.location.origin + "/payment/billing",
      failUrl: window.location.origin + "/fail",
      customerEmail: "customer123@gmail.com",
      customerName: "김토스",
    });
  }

  return (
    <div className="flex flex-col items-center bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 min-h-screen py-10 font-sans">
      <div className="bg-white shadow-xl rounded-3xl p-10 w-full max-w-lg transition-transform transform hover:scale-105">
        <h1 className="text-4xl font-extrabold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">
          결제하기
        </h1>

        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">결제 수단 선택</h2>
          <div className="grid grid-cols-2 gap-4">
            {["카드", "계좌이체", "가상계좌", "휴대폰 결제", "문화상품권", "해외 간편결제"].map((method) => (
              <button
                key={method}
                className={`py-3 px-4 rounded-xl shadow-md transition duration-200 ease-in-out 
                  ${selectedPaymentMethod === method ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}
                  whitespace-nowrap`}
                onClick={() => selectPaymentMethod(method as PaymentMethod)}
              >
                {method}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-8 bg-gray-100 p-5 rounded-lg shadow-inner">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">결제 정보</h2>
          <p className="text-gray-600">상품 금액: <span className="font-bold text-blue-600">{amount.value.toLocaleString()}원</span></p>
        </div>

        <button
          onClick={requestPayment}
          className="w-full py-3 rounded-full text-white font-bold text-lg shadow-lg transition-transform transform hover:scale-105 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
        >
          결제하기
        </button>
      </div>

      <div className="bg-white shadow-xl rounded-3xl p-10 mt-10 w-full max-w-lg transition-transform transform hover:scale-105">
        <h1 className="text-xl font-semibold text-center text-purple-600 mb-4">정기 결제</h1>
        <button
          onClick={requestBillingAuth}
          className="w-full py-3 rounded-full text-white font-bold text-lg shadow-lg transition-transform transform hover:scale-105 bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600"
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
