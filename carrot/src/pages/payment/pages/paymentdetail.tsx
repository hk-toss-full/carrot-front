import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface PaymentResponse {
  id: number;
  userId: number;
  amount: number;
  status: string;
  transactionId: string;
  createdAt: string | null; // 날짜가 없을 수 있으므로 null 허용
  updatedAt: string | null;
  paymentMethod: string; // 결제 수단
  currency: string; // 통화
  description: string; // 결제 설명
}

function PaymentDetailPage() {
  const { paymentId } = useParams<{ paymentId: string }>();
  const [payment, setPayment] = useState<PaymentResponse | null>(null);

  useEffect(() => {
    const fetchPayment = async () => {
      // Mock 데이터 설정
      const mockData: PaymentResponse = {
        id: parseInt(paymentId || "0"), // paymentId로부터 ID를 설정
        userId: 1,
        amount: 50000,
        status: "COMPLETED",
        transactionId: "MC42MDcxNDM4ODY2OTY3",
        createdAt: "2023-10-28T12:00:00",
        updatedAt: "2023-10-28T12:00:00",
        paymentMethod: "카드", // 결제 수단 추가
        currency: "KRW", // 통화 추가
        description: "토스 결제 테스트", // 결제 설명 추가
      };

      // 이 부분에서 실제 API 호출을 주석 처리하고 Mock 데이터를 설정합니다.
      // const response = await PaymentService.getById(paymentId);
      // setPayment(response);
      
      // Mock 데이터 설정
      setPayment(mockData);
    };

    fetchPayment();
  }, [paymentId]);

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 py-10">
      <h1 className="text-4xl font-bold text-gray-800 mb-10">결제 단일 조회</h1>
      
      {payment ? (
        <div className="bg-white shadow-lg rounded-lg p-10 border border-gray-200 max-w-lg w-full">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">결제 정보</h2>
          <p className="text-gray-600 mb-2"><span className="font-medium">사용자 ID:</span> {payment.userId}</p>
          <p className="text-gray-600 mb-2"><span className="font-medium">금액:</span> {payment.amount.toLocaleString()}원</p>
          <p className={`text-gray-600 mb-2 ${payment.status === "COMPLETED" ? "text-green-600" : "text-yellow-600"}`}>
            <span className="font-medium">상태:</span> {payment.status === "COMPLETED" ? "완료됨" : "대기 중"}
          </p>
          <p className="text-gray-600 mb-2"><span className="font-medium">거래 ID:</span> {payment.transactionId}</p>
          <p className="text-gray-500 text-sm mb-2">
            <span className="font-medium">생성일:</span>{" "}
            {payment.createdAt ? new Date(payment.createdAt).toLocaleString() : "N/A"}
          </p>
          <p className="text-gray-500 text-sm mb-2">
            <span className="font-medium">수정일:</span>{" "}
            {payment.updatedAt ? new Date(payment.updatedAt).toLocaleString() : "N/A"}
          </p>
          <p className="text-gray-500 text-sm mb-2"><span className="font-medium">결제 수단:</span> {payment.paymentMethod}</p>
          <p className="text-gray-500 text-sm mb-2"><span className="font-medium">통화:</span> {payment.currency}</p>
          <p className="text-gray-500 text-sm"><span className="font-medium">설명:</span> {payment.description}</p>
        </div>
      ) : (
        <p className="text-gray-600">결제 정보를 불러오는 중...</p>
      )}
    </div>
  );
}

export default PaymentDetailPage;
