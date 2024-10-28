import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

interface ConfirmResponse {
  orderId: string;
  amount: string;
  paymentKey: string;
  [key: string]: any;
}

function PaymentSuccessPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [responseData, setResponseData] = useState<ConfirmResponse | null>(null);

  useEffect(() => {
    async function confirm() {
      const requestData = {
        orderId: searchParams.get("orderId") || "",
        amount: searchParams.get("amount") || "",
        paymentKey: searchParams.get("paymentKey") || "",
      };

      try {
        const response = await fetch("http://localhost:4000/confirm/payment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        });

        const json = await response.json();

        if (!response.ok) {
          throw { message: json.message, code: json.code };
        }

        setResponseData(json);
      } catch (error: any) {
        navigate(`/fail?code=${error.code}&message=${error.message}`);
      }
    }

    confirm();
  }, [navigate, searchParams]);

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 py-10 font-sans">
      <div className="bg-white shadow-xl rounded-3xl p-10 w-full max-w-lg text-center transition-transform transform hover:scale-105">
        <img
          className="mx-auto mb-4"
          width="80px"
          src="https://static.toss.im/illusts/check-blue-spot-ending-frame.png"
          alt="결제 완료 아이콘"
        />
        <h2 className="text-3xl font-bold text-pink-600 mb-4">결제를 완료했어요</h2>
        
        <div className="bg-gray-100 p-4 rounded-lg mb-6 shadow-inner">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">결제 정보</h3>
          <div className="flex justify-between text-gray-600">
            <span>결제금액</span>
            <span className="font-bold text-blue-600">{`${Number(searchParams.get("amount") || 0).toLocaleString()}원`}</span>
          </div>
          <div className="flex justify-between text-gray-600 mt-2">
            <span>주문번호</span>
            <span className="font-semibold">{searchParams.get("orderId")}</span>
          </div>
          <div className="flex justify-between text-gray-600 mt-2">
            <span>결제 키</span>
            <span className="font-semibold break-words">{searchParams.get("paymentKey")}</span>
          </div>
        </div>

        <div className="flex justify-center space-x-4">
          <Link to="https://docs.tosspayments.com/guides/v2/payment-widget/integration">
            <button className="px-4 py-2 font-semibold text-sm bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-lg shadow-lg transition-transform transform hover:scale-105">
              연동 문서
            </button>
          </Link>
          <Link to="https://discord.gg/A4fRFXQhRu">
            <button className="px-4 py-2 font-semibold text-sm bg-gradient-to-r from-green-400 to-teal-500 text-white rounded-lg shadow-lg transition-transform transform hover:scale-105">
              실시간 문의
            </button>
          </Link>
        </div>
      </div>

      <div className="bg-white shadow-xl rounded-3xl p-6 mt-8 w-full max-w-lg text-left">
        <b className="text-lg text-gray-700">응답 데이터 :</b>
        <div id="response" className="bg-gray-50 p-4 rounded-lg shadow-inner mt-2">
          {responseData && <pre className="whitespace-pre-wrap text-sm text-gray-700">{JSON.stringify(responseData, null, 4)}</pre>}
        </div>
      </div>
    </div>
  );
}

export default PaymentSuccessPage;
