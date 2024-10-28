import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface PaymentResponse {
  id: number;
  userId: number;
  amount: number;
  status: string;
  transactionId: string;
  createdAt: string;
  updatedAt: string;
}

function PaymentListPage() {
  const [payments, setPayments] = useState<PaymentResponse[]>([]);

  useEffect(() => {
    const mockData: PaymentResponse[] = [
      {
        id: 1,
        userId: 1,
        amount: 50000,
        status: "COMPLETED",
        transactionId: "MC42MDcxNDM4ODY2OTY3",
        createdAt: "2023-10-28T12:00:00",
        updatedAt: "2023-10-28T12:00:00",
      },
      // {
      //   id: 2,
      //   userId: 2,
      //   amount: 100000,
      //   status: "PENDING",
      //   transactionId: "MC42MDYxNTg4ODY2OTY3",
      //   createdAt: "2023-10-28T12:30:00",
      //   updatedAt: "2023-10-28T12:30:00",
      // },
    ];

    setPayments(mockData);
  }, []);

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 py-10">
      <h1 className="text-4xl font-bold text-gray-800 mb-10">결제 전체 조회</h1>
      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 w-full max-w-6xl">
        {payments.map((payment) => (
          <Link to={`/payment/${payment.id}`} key={payment.id} className="block">
            <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200 transform hover:scale-105 transition duration-300">
              <h2 className="text-lg font-semibold text-gray-700 mb-2">사용자 ID: {payment.userId}</h2>
              <p className="text-gray-600 mb-1"><span className="font-medium">금액:</span> {payment.amount.toLocaleString()}원</p>
              <p className={`text-gray-600 mb-1 ${payment.status === "COMPLETED" ? "text-green-600" : "text-yellow-600"}`}>
                <span className="font-medium">상태:</span> {payment.status === "COMPLETED" ? "완료됨" : "대기 중"}
              </p>
              <p className="text-gray-600 mb-1"><span className="font-medium">거래 ID:</span> {payment.transactionId}</p>
              <p className="text-gray-500 text-sm"><span className="font-medium">생성일:</span> {new Date(payment.createdAt).toLocaleString()}</p>
              <p className="text-gray-500 text-sm"><span className="font-medium">수정일:</span> {new Date(payment.updatedAt).toLocaleString()}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default PaymentListPage;
