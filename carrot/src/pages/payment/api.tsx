// src/api/paymentApi.ts
import axios from 'axios';

// 요청을 위한 기본 Axios 설정
const apiClient = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// 결제 확인 요청 함수
export async function confirmPayment(requestData: any) {
  try {
    const response = await apiClient.post('/confirm/payment', requestData);
    return response.data;
  } catch (error: any) {
    throw error.response ? error.response.data : new Error("Network Error");
  }
}

// 위젯 결제 확인 함수
export async function confirmWidgetPayment(requestData: any) {
  try {
    const response = await apiClient.post('/confirm/widget', requestData);
    return response.data;
  } catch (error: any) {
    throw error.response ? error.response.data : new Error("Network Error");
  }
}

// 브랜드페이 확인 요청 함수
export async function confirmBrandpay(requestData: any) {
  try {
    const response = await apiClient.post('/confirm/brandpay', requestData);
    return response.data;
  } catch (error: any) {
    throw error.response ? error.response.data : new Error("Network Error");
  }
}
