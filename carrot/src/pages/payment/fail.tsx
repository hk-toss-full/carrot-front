import { Link, useSearchParams } from "react-router-dom";

export function FailPage() {
  const [searchParams] = useSearchParams();
  const errorCode = searchParams.get("code");
  const errorMessage = searchParams.get("message") || "알 수 없는 오류입니다";

  // 오류 코드별 사용자 안내 메시지
  const errorDetails = () => {
    switch (errorCode) {
      case "PAY_PROCESS_CANCELED":
        return "결제가 사용자의 요청으로 취소되었습니다.";
      case "PAY_PROCESS_ABORTED":
        return "결제가 실패했습니다. 다시 시도해주세요.";
      case "REJECT_CARD_COMPANY":
        return "카드 정보에 문제가 있습니다. 올바른 정보를 입력했는지 확인해주세요.";
      default:
        return "결제 과정에서 문제가 발생했습니다.오류 메시지를 확인하고 다시 시도해주세요.";
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-50 font-sans">
      <div className="bg-white shadow-lg rounded-3xl p-8 w-full max-w-md text-center">
        <img
          width="100px"
          src="https://static.toss.im/lotties/error-spot-no-loop-space-apng.png"
          alt="에러 이미지"
          className="mx-auto mb-4"
        />
        <h2 className="text-2xl font-bold text-red-500 mb-6">결제를 실패했어요</h2>

        <div className="text-left mb-6">
          <div className="flex justify-between items-center mb-2">
            <b className="text-gray-700">에러 코드</b>
            <span className="text-gray-600">{errorCode || "N/A"}</span>
          </div>
          <div className="flex justify-between items-center">
            <b className="text-gray-700">실패 사유</b>
            <span className="text-gray-600">{errorMessage}</span>
          </div>
          <p className="mt-4 text-sm text-gray-500">{errorDetails()}</p>
        </div>

        <div className="flex justify-around mt-4">
          <Link to="https://docs.tosspayments.com/guides/v2/payment-widget/integration">
            <button className="w-32 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition duration-200 text-gray-700 font-semibold">
              연동 문서
            </button>
          </Link>
          <Link to="https://discord.gg/A4fRFXQhRu">
            <button className="w-32 py-2 rounded-lg bg-blue-100 hover:bg-blue-200 transition duration-200 text-blue-700 font-semibold">
              실시간 문의
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default FailPage;
