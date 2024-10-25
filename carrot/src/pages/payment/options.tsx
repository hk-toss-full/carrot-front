// src/pages/payment/Options.tsx
import React from "react";

interface PaymentOptionsProps {
  onSelectPaymentMethod: (method: string) => void;
  selectedMethod: string | null;
}

const PaymentOptions: React.FC<PaymentOptionsProps> = ({ onSelectPaymentMethod, selectedMethod }) => {
  const paymentMethods = [
    { id: "toss", name: "Toss 결제" },
    { id: "samsung", name: "Samsung Pay" },
    { id: "credit", name: "신용카드" }
  ];

  return (
    <div className="grid grid-cols-3 gap-4 mb-8">
      {paymentMethods.map((method) => (
        <button
          key={method.id}
          onClick={() => onSelectPaymentMethod(method.id)}
          className={`py-12 px-6 rounded-lg transition duration-300 ease-in-out shadow-lg text-lg font-medium flex flex-col items-center justify-center
            ${selectedMethod === method.id ? "bg-blue-700 text-white" : "bg-gray-700 text-white hover:bg-gray-800"}`}
        >
          {method.name}
        </button>
      ))}
    </div>
  );
};

export default PaymentOptions;
