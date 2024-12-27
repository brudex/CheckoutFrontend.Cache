import { type OrderDetails } from '../types/order';

const API_BASE_URL = 'https://checkout.cachetechs.com/api';

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

    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    // Return default values if API fails
    return {
      amount: "0",
      email: "",
      orderId: "",
      transactionId: trxnId,
      orderDescription: "Unable to fetch order details"
    };
  }
}