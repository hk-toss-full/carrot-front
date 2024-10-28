import { loadTossPayments, TossPaymentsBrandpay } from "@tosspayments/tosspayments-sdk";
import { useEffect, useState } from "react";

const clientKey = "test_ck_D5GePWvyJnrK0W0k6q8gLzN97Eoq";
const customerKey = generateRandomString();

export function BrandpayCheckoutPage() {
  const [brandpay, setBrandpay] = useState<TossPaymentsBrandpay | null>(null);

  useEffect(() => {
    async function fetchBrandpay() {
      try {
        const tossPayments = await loadTossPayments(clientKey);
        const brandpayInstance = tossPayments.brandpay({
          customerKey,
          redirectUrl: "http://localhost:3000/api/callback-auth",
        });
        setBrandpay(brandpayInstance);
      } catch (error) {
        console.error("Error fetching brandpay:", error);
      }
    }
    fetchBrandpay();
  }, []);

  async function requestPayment() {
    if (!brandpay) return;
    await brandpay.requestPayment({
      amount: {
        currency: "KRW",
        value: 50000,
      },
      orderId: generateRandomString(),
      orderName: "토스 티셔츠 외 2건",
      successUrl: `${window.location.origin}/brandpay/success?customerKey=${customerKey}&`,
      failUrl: `${window.location.origin}/fail`,
      customerEmail: "customer123@gmail.com",
      customerName: "김토스",
    });
  }

  async function addPaymentMethod() {
    if (!brandpay) return;
    await brandpay.addPaymentMethod();
  }

  async function changeOneTouchPay() {
    if (!brandpay) return;
    await brandpay.changeOneTouchPay();
  }

  async function changePassword() {
    if (!brandpay) return;
    await brandpay.changePassword();
  }

  async function isOneTouchPayEnabled() {
    if (!brandpay) return;
    const result = await brandpay.isOneTouchPayEnabled();
    alert(result);
  }

  async function openSettings() {
    if (!brandpay) return;
    await brandpay.openSettings();
  }

  return (
    <div className="flex flex-col items-center bg-gray-50 min-h-screen py-10 font-sans">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-lg">
        <h1 className="text-3xl font-semibold text-center mb-6 text-gray-700">브랜드페이 결제</h1>

        <div className="flex flex-col gap-4">
          <button
            className="py-3 rounded-md text-white font-medium shadow transition-colors bg-blue-500 hover:bg-blue-600 focus:outline-none"
            onClick={requestPayment}
          >
            결제하기
          </button>
          <button
            className="py-3 rounded-md text-gray-700 font-medium shadow-sm transition-colors bg-gray-200 hover:bg-gray-300 focus:outline-none"
            onClick={addPaymentMethod}
          >
            결제 수단 추가
          </button>
          <button
            className="py-3 rounded-md text-gray-700 font-medium shadow-sm transition-colors bg-gray-200 hover:bg-gray-300 focus:outline-none"
            onClick={changeOneTouchPay}
          >
            원터치페이 설정 변경
          </button>
          <button
            className="py-3 rounded-md text-gray-700 font-medium shadow-sm transition-colors bg-gray-200 hover:bg-gray-300 focus:outline-none"
            onClick={changePassword}
          >
            비밀번호 변경
          </button>
          <button
            className="py-3 rounded-md text-gray-700 font-medium shadow-sm transition-colors bg-gray-200 hover:bg-gray-300 focus:outline-none"
            onClick={isOneTouchPayEnabled}
          >
            원터치 결제 가능 여부 조회
          </button>
          <button
            className="py-3 rounded-md text-gray-700 font-medium shadow-sm transition-colors bg-gray-200 hover:bg-gray-300 focus:outline-none"
            onClick={openSettings}
          >
            브랜드페이 설정 열기
          </button>
        </div>
      </div>
    </div>
  );
}

function generateRandomString(): string {
  return window.btoa(Math.random().toString()).slice(0, 20);
}

export default BrandpayCheckoutPage;
