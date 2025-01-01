import { type OrderDetails } from '../types/order';
import { API_BASE_URL } from './config';

export async function fetchOrderDetails(trxnId: string): Promise<OrderDetails> {
  try {
    const response = await fetch(`${API_BASE_URL}/getOrderDetails/${trxnId}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      mode: 'cors'
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return {
      ...data,
      paymentStatus: data.paymentStatus || 'NOT_INITIATED',
      status: data.status || '00'
    };
  } catch (error) {
    console.error('API Error:', error);
    return {
      amount: "0",
      email: "",
      orderId: "",
      transactionId: trxnId,
      orderDescription: "Unable to fetch order details",
      status: "00",
      paymentStatus: "NOT_INITIATED"
    };
  }
}