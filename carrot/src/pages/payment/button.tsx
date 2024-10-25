// src/pages/payment/Button.tsx
import React from "react";

interface PaymentButtonProps {
  onProcessPayment: () => void;
}

const Button: React.FC<PaymentButtonProps> = ({ onProcessPayment }) => {
  return (
    <div className="text-center">
      <button
        onClick={onProcessPayment}
        className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-20 rounded-lg shadow-lg transition duration-300 ease-in-out w-full"
      >
        결제하기
      </button>
    </div>
  );
};

export default Button;
