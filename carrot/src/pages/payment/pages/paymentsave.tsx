
import React, { useState } from "react";
import axios from "axios";

const PaymentSavePage: React.FC = () => {
  const [amount, setAmount] = useState<number>(0);
  const [userId, setUserId] = useState<number>(1); // 예시 사용자 ID

  const handleSubmit = async () => {
    try {
      const response = await axios.post("/api/v1/payments", { userId, amount });
      alert("결제가 성공적으로 저장되었습니다.");
    } catch (error) {
      alert("결제 저장 중 오류가 발생했습니다.");
    }
  };

  return (
    <div>
      <h2>새로운 결제 저장</h2>
      <input
        type="number"
        placeholder="금액"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
      />
      <button onClick={handleSubmit}>결제 저장</button>
    </div>
  );
};

export default PaymentSavePage;
