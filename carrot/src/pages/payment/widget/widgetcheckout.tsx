import { loadTossPayments, TossPaymentsWidgets } from "@tosspayments/tosspayments-sdk";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const clientKey = "test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm";
const customerKey = generateRandomString();

export function WidgetCheckoutPage() {
  const navigate = useNavigate();

  const [amount, setAmount] = useState({
    currency: "KRW",
    value: 50000,
  });
  const [ready, setReady] = useState(false);
  const [widgets, setWidgets] = useState<TossPaymentsWidgets | null>(null);

  useEffect(() => {
    async function fetchPaymentWidgets() {
      try {
        const tossPayments = await loadTossPayments(clientKey);
        const widgetsInstance = tossPayments.widgets({
          customerKey,
        });
        setWidgets(widgetsInstance);
      } catch (error) {
        console.error("Error fetching payment widget:", error);
      }
    }
    fetchPaymentWidgets();
  }, []);

  useEffect(() => {
    async function renderPaymentWidgets() {
      if (widgets == null) return;

      await widgets.setAmount(amount);

      await Promise.all([
        widgets.renderPaymentMethods({
          selector: "#payment-method",
          variantKey: "DEFAULT",
        }),
        widgets.renderAgreement({
          selector: "#agreement",
          variantKey: "AGREEMENT",
        }),
      ]);

      setReady(true);
    }
    renderPaymentWidgets();
  }, [widgets, amount]);

  return (
    <div className="wrapper">
      <div className="box_section">
        <div id="payment-method" />
        <div id="agreement" />
        <div style={{ paddingLeft: "30px" }}>
          <label htmlFor="coupon-box" className="checkable typography--p">
            <input
              id="coupon-box"
              className="checkable__input"
              type="checkbox"
              aria-checked="true"
              disabled={!ready}
              onChange={async (event) => {
                const newValue = event.target.checked ? amount.value - 5000 : amount.value;
                await widgets?.setAmount({
                  currency: amount.currency,
                  value: newValue,
                });
              }}
            />
            <span className="checkable__label-text">5,000원 쿠폰 적용</span>
          </label>
        </div>

        {/* 결제하기 버튼만 스타일 변경 */}
        <button
          className="py-3 mt-6 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold shadow-md hover:from-purple-600 hover:to-pink-600 transition duration-300"
          style={{ width: 'calc(100% - 40px)', marginLeft: '20px', marginRight: '20px' }}
          disabled={!ready}
          onClick={async () => {
            try {
              await widgets?.requestPayment({
                orderId: generateRandomString(),
                orderName: "토스 티셔츠 외 2건",
                successUrl: window.location.origin + "/widget/success",
                failUrl: window.location.origin + "/fail",
                customerEmail: "customer123@gmail.com",
                customerName: "김토스",
                customerMobilePhone: "01012341234",
              });
            } catch (error) {
              console.error(error);
            }
          }}
        >
          결제하기
        </button>
        <button
          className="py-3 mt-6 rounded-lg bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 font-bold shadow-md hover:from-gray-150 hover:to-gray-300 transition duration-300"
          style={{ width: 'calc(100% - 40px)', marginLeft: '20px', marginRight: '20px' }}
          onClick={() => {
            navigate("/payment/checkout");
          }}
        >
          위젯 없이 결제창만 연동하기
        </button>
      </div>
    </div>
  );
}

function generateRandomString(): string {
  return window.btoa(Math.random().toString()).slice(0, 20);
}

export default WidgetCheckoutPage;
