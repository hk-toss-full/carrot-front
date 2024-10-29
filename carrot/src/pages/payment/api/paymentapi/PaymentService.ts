import axiosInstance from '../axiosConfig';

interface PaymentRequest {
  userId: string;
  amount: number;
  status: "COMPLETED";
  transactionId: string;
}

interface PaymentResponse {
  id: number;
  userId: string;
  amount: number;
  status: string;
  transactionId: string;
  createdAt: string;
  updatedAt: string;
}

const ROUTE = '/api/v1/payments';

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
