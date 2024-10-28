// src/components/WidgetSuccessPage.tsx
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { confirmWidgetPayment } from "../api";

export function WidgetSuccessPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [responseData, setResponseData] = useState<any>(null);

  useEffect(() => {
    async function confirm() {
      const requestData = {
        orderId: searchParams.get("orderId"),
        amount: searchParams.get("amount"),
        paymentKey: searchParams.get("paymentKey"),
      };

      try {
        const data = await confirmWidgetPayment(requestData);
        setResponseData(data);
      } catch (error: any) {
        navigate(`/fail?code=${error.code}&message=${error.message}`);
      }
    }

    confirm();
  }, [navigate, searchParams]);

  return (
    <div>
      <h2>결제가 완료되었습니다</h2>
      {responseData && <pre>{JSON.stringify(responseData, null, 4)}</pre>}
    </div>
  );
}
