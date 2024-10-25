// src/pages/payment/Button.tsx
import React from "react";
import Button from "@/components/Button";

interface PaymentButtonProps {
  onProcessPayment: () => void;
}

const PaymentButton: React.FC<PaymentButtonProps> = ({ onProcessPayment }) => {
  return (
    <div className="text-center">
      <Button
        onClick={onProcessPayment}
        className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-20 rounded-lg shadow-lg transition duration-300 ease-in-out w-full"
      >
        결제하기
      </Button>
    </div>
  );
};

export default PaymentButton;
