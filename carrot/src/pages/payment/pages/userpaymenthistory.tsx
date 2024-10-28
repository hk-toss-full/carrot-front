import { useEffect, useState } from "react";
import { PaymentService } from "../api/paymentapi/PaymentService";

function UserPaymentHistoryPage({ userId }: { userId: string }) {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const fetchUserPayments = async () => {
      try {
        const response = await PaymentService.getUserPaymentsHistory(userId);
        setPayments(response);
      } catch (error) {
        console.error("사용자 결제 내역 조회 오류:", error);
      }
    };

    fetchUserPayments();
  }, [userId]);

  return (
    <div>
      <h1>사용자 결제 내역 조회</h1>
      <ul>
        {payments.map((payment) => (
          <li key={payment.id}>
            결제 ID: {payment.id}, 금액: {payment.amount}원, 상태: {payment.status}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserPaymentHistoryPage;
