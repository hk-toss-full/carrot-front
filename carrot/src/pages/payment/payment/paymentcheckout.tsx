import { loadTossPayments, ANONYMOUS, TossPaymentsPayment } from "@tosspayments/tosspayments-sdk";
import { useEffect, useState } from "react";

const clientKey = "test_sk_zXLkKEypNArWmo50nX3lmeaxYG5R";
const customerKey = "gK3gyG1Kb5pUxqrq4ZmoE";

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
  const [payment, setPayment] = useState<TossPaymentsPayment | null>(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod | null>(null);
  const [amount, setAmount] = useState(10000);

  useEffect(() => {
    async function fetchPayment() {
      try {
        const tossPayments = await loadTossPayments(clientKey);
        const paymentInstance = tossPayments.payment({ customerKey });
        setPayment(paymentInstance);
      } catch (error) {
        console.error("Error fetching payment:", error);
      }
    }

    fetchPayment();
  }, []);

  async function requestPayment() {
    if (!payment || !selectedPaymentMethod) return;

    const orderId = generateRandomString();

    const commonParams = {
      amount  :{
        currency: "KRW",
          value: amount,
      },
      orderId,
      orderName: "토스 티셔츠 외 2건",
      successUrl: `${window.location.origin}/payment/success?orderId=${orderId}&amount=${amount}`,
      failUrl: `${window.location.origin}/fail`,
      customerEmail: "customer123@gmail.com",
      customerName: "김토스",
      customerMobilePhone: "01012341234",
    };

    try {
      const response = await payment.requestPayment({
        ...commonParams,
        method: convertToEnglishMethod(selectedPaymentMethod),
      });
      // const response = await payment.requestPayment({
      //   method: "CARD",
      //   amount: {
      //     currency: "KRW",
      //     value: 50000,
      //   },
      //   orderId,
      //   orderName: "토스 티셔츠 외 2건",
      //   successUrl: window.location.origin + "/success.html",
      //   failUrl: window.location.origin + "/fail.html",
      //   customerEmail: "customer123@gmail.com",
      //   customerName: "김토스",
      //   customerMobilePhone: "01012341234",
      //   card: {
      //     useEscrow: false,
      //     flowMode: "DEFAULT",
      //     useCardPoint: false,
      //     useAppCardOnly: false,
      //   },
      // });
      if (response.paymentKey) {
        const redirectUrl = `${window.location.origin}/payment/success?orderId=${orderId}&amount=${amount}&paymentKey=${response.paymentKey}`;
        console.log("Redirecting to:", redirectUrl);
        window.location.href = redirectUrl;
      } else {
        throw new Error("결제 키가 제공되지 않았습니다.");
      }
    } catch (error) {
      console.error("Payment request failed:", error);
    }
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
                  ${selectedPaymentMethod === method ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
                onClick={() => setSelectedPaymentMethod(method as PaymentMethod)}
              >
                {method}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-8 bg-gray-100 p-5 rounded-lg shadow-inner">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">결제 정보</h2>
          <p className="text-gray-600">상품 금액: <span className="font-bold text-blue-600">{amount.toLocaleString()}원</span></p>
        </div>

        <button
          onClick={requestPayment}
          className="w-full py-3 rounded-full text-white font-bold text-lg shadow-lg transition-transform transform hover:scale-105 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
        >
          결제하기
        </button>
      </div>
    </div>
  );
}

function generateRandomString(): string {
  return window.btoa(Math.random().toString()).slice(0, 20);
}

export default PaymentCheckoutPage;
