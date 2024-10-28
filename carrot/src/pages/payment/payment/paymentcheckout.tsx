import { loadTossPayments, TossPaymentsPayment } from "@tosspayments/tosspayments-sdk";
import { useEffect, useState } from "react";

// ------ SDK 초기화 ------
// TODO: clientKey는 개발자센터의 API 개별 연동 키 > 결제창 연동에 사용하려할 MID > 클라이언트 키로 바꾸세요.
// TODO: server.js 의 secretKey 또한 결제위젯 연동 키가 아닌 API 개별 연동 키의 시크릿 키로 변경해야 합니다.
// TODO: 구매자의 고유 아이디를 불러와서 customerKey로 설정하세요. 이메일・전화번호와 같이 유추가 가능한 값은 안전하지 않습니다.
// @docs https://docs.tosspayments.com/sdk/v2/js#토스페이먼츠-초기화
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

        // 회원 결제
        // @docs https://docs.tosspayments.com/sdk/v2/js#tosspaymentspayment
        const paymentInstance = tossPayments.payment({
          customerKey,
        });
        // 비회원 결제
        // const paymentInstance = tossPayments.payment({ customerKey: ANONYMOUS });

        setPayment(paymentInstance);
      } catch (error) {
        console.error("Error fetching payment:", error);
      }
    }

    fetchPayment();
  }, []);

  // ------ '결제하기' 버튼 누르면 결제창 띄우기 ------
  // @docs https://docs.tosspayments.com/sdk/v2/js#paymentrequestpayment
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
      switch (selectedPaymentMethod) {
        case "CARD":
          await payment.requestPayment({
            ...commonParams,
            method: "CARD",
            card: {
              useEscrow: false,
              flowMode: "DEFAULT",
              useCardPoint: false,
              useAppCardOnly: false,
            },
          });
          break;
        case "TRANSFER":
          await payment.requestPayment({
            ...commonParams,
            method: "TRANSFER",
            transfer: {
              cashReceipt: {
                type: "소득공제",
              },
              useEscrow: false,
            },
          });
          break;
        case "VIRTUAL_ACCOUNT":
          await payment.requestPayment({
            ...commonParams,
            method: "VIRTUAL_ACCOUNT",
            virtualAccount: {
              cashReceipt: {
                type: "소득공제",
              },
              useEscrow: false,
              validHours: 24,
            },
          });
          break;
        case "MOBILE_PHONE":
          await payment.requestPayment({
            ...commonParams,
            method: "MOBILE_PHONE",
          });
          break;
        case "CULTURE_GIFT_CERTIFICATE":
          await payment.requestPayment({
            ...commonParams,
            method: "CULTURE_GIFT_CERTIFICATE",
          });
          break;
        case "FOREIGN_EASY_PAY":
          await payment.requestPayment({
            ...commonParams,
            method: "FOREIGN_EASY_PAY",
            amount: {
              value: 100,
              currency: "USD",
            },
            foreignEasyPay: {
              provider: "PAYPAL",
              country: "KR",
            },
          });
          break;
      }
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
    <div className="wrapper">
      <div className="box_section">
        <h1>일반 결제</h1>
        <div id="payment-method" style={{ display: "flex" }}>
          {["CARD", "TRANSFER", "VIRTUAL_ACCOUNT", "MOBILE_PHONE", "CULTURE_GIFT_CERTIFICATE", "FOREIGN_EASY_PAY"].map((method) => (
            <button
              key={method}
              id={method}
              className={`button2 ${selectedPaymentMethod === method ? "active" : ""}`}
              onClick={() => selectPaymentMethod(method as PaymentMethod)}
            >
              {method}
            </button>
          ))}
        </div>
        <button className="button" onClick={() => requestPayment()}>
          결제하기
        </button>
      </div>
      <div className="box_section">
        <h1>정기 결제</h1>
        <button className="button" onClick={() => requestBillingAuth()}>
          빌링키 발급하기
        </button>
      </div>
    </div>
  );
}

function generateRandomString(): string {
  return window.btoa(Math.random().toString()).slice(0, 20);
}
