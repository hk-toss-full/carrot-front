import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

interface ConfirmResponse {
  orderId: string;
  amount: string;
  paymentKey: string;
  customerKey: string;
  [key: string]: any;
}

export function BrandpaySuccessPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [responseData, setResponseData] = useState<ConfirmResponse | null>(null);

  useEffect(() => {
    async function confirm() {
      const requestData = {
        orderId: searchParams.get("orderId") || "",
        amount: searchParams.get("amount") || "",
        paymentKey: searchParams.get("paymentKey") || "",
        customerKey: searchParams.get("customerKey") || "",
      };

      try {
        const response = await fetch("/api/confirm/brandpay", {
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
    <div className="flex flex-col items-center bg-gray-50 min-h-screen py-10 font-sans">
      <div className="bg-white shadow-lg rounded-2xl p-10 w-full max-w-lg">
        <img
          width="80px"
          src="https://static.toss.im/illusts/check-blue-spot-ending-frame.png"
          alt="결제 완료 아이콘"
          className="mx-auto mb-4"
        />
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">결제가 완료되었습니다</h2>

        <div className="space-y-4 text-gray-600">
          <div className="flex justify-between items-center">
            <span className="font-medium">결제 금액</span>
            <span className="text-blue-600 font-semibold">
              {`${Number(searchParams.get("amount") || 0).toLocaleString()}원`}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-medium">주문 번호</span>
            <span>{searchParams.get("orderId")}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-medium">결제 키</span>
            <span className="break-words w-2/3 text-right">{searchParams.get("paymentKey")}</span>
          </div>
        </div>

        <div className="flex justify-center space-x-4 mt-8">
          <Link to="https://docs.tosspayments.com/guides/v2/payment-widget/integration">
            <button className="px-4 py-2 rounded-md bg-blue-500 text-white font-semibold shadow hover:bg-blue-600 transition">
              연동 문서
            </button>
          </Link>
          <Link to="https://discord.gg/A4fRFXQhRu">
            <button className="px-4 py-2 rounded-md bg-gray-200 text-blue-600 font-semibold shadow hover:bg-gray-300 transition">
              실시간 문의
            </button>
          </Link>
        </div>
      </div>

      <div className="bg-white shadow-lg rounded-2xl p-8 mt-10 w-full max-w-lg">
        <h3 className="font-medium text-gray-700 mb-4">Response Data</h3>
        <div className="bg-gray-100 p-4 rounded-lg text-sm text-gray-600 whitespace-pre-wrap break-words">
          {responseData && <pre>{JSON.stringify(responseData, null, 4)}</pre>}
        </div>
      </div>
    </div>
  );
}

function generateRandomString(): string {
  return window.btoa(Math.random().toString()).slice(0, 20);
}

export default BrandpaySuccessPage;
