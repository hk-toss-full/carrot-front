import axiosInstance from '../axiosConfig';

interface PaymentRequest {
  amount: number;
  userId: string;
  orderId: string;
  orderName: string;
  status: "COMPLETED";
  transactionId: string;
}

interface PaymentResponse {
  id: number;
  amount: number;
  userId: string;
  orderId: string;
  orderName: string;
  status: string;
  transactionId: string;
  createdAt: string;
  updatedAt: string;
}

const ROUTE = '/payment/checkout';

export const PaymentService = {
  getAll: async (): Promise<PaymentResponse[]> => {
    try {
      const response = await axiosInstance.get(ROUTE);
      // 응답 데이터가 객체라면 `data` 내부의 배열을 반환하고, 아니면 그대로 반환
      return Array.isArray(response.data) ? response.data : response.data.data;
    } catch (error) {
      throw new Error(error as string);
    }
  },
    
    // 결제 ID로 결제 정보 조회
    getById: async (paymentId: string): Promise<PaymentResponse> => {
      try {
        const response = await axiosInstance.get(`${ROUTE}/${paymentId}`);
        return response.data;
      } catch (error) {
        throw new Error(error as string);
      }
    },
  };
