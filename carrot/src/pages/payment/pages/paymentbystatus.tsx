import { useEffect, useState } from "react";

interface PaymentResponse {
  id: number;
  userId: number;
  amount: number;
  status: string;
  transactionId: string;
  createdAt: string;
  updatedAt: string;
}

function PaymentStatusPage({ status }: { status: string }) {
  const [payments, setPayments] = useState<PaymentResponse[]>([]);

  useEffect(() => {
    const fetchPaymentsByStatus = async () => {
      // Mock 데이터 설정
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
        {
          id: 2,
          userId: 2,
          amount: 100000,
          status: "PENDING",
          transactionId: "MC42MDYxNTg4ODY2OTY3",
          createdAt: "2023-10-28T12:30:00",
          updatedAt: "2023-10-28T12:30:00",
        },
        {
          id: 3,
          userId: 3,
          amount: 75000,
          status: "COMPLETED",
          transactionId: "MC42MDcxNDM4ODY2OTY4",
          createdAt: "2023-10-28T13:00:00",
          updatedAt: "2023-10-28T13:00:00",
        },
      ];

      // 상태에 맞는 Mock 데이터를 필터링
      const filteredPayments = mockData.filter(payment => payment.status === status);
      setPayments(filteredPayments);
    };

    fetchPaymentsByStatus();
  }, [status]);

  return (
    <div>
      <h1>결제 상태별 조회 - {status}</h1>
      <ul>
        {payments.length > 0 ? (
          payments.map((payment) => (
            <li key={payment.id}>
              결제 ID: {payment.id}, 금액: {payment.amount.toLocaleString()}원, 사용자 ID: {payment.userId}, 상태: {payment.status}
            </li>
          ))
        ) : (
          <p>해당 상태의 결제가 없습니다.</p>
        )}
      </ul>
    </div>
  );
}

export default PaymentStatusPage;
