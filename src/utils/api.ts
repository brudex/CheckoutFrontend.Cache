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
    return {
      amount: "0",
      email: "",
      orderId: "",
      transactionId: trxnId,
      orderDescription: "Unable to fetch order details"
    };
  }
}

export async function sendWalletPaymentRequest(trxnId: string, mobileNumber: string, mobileNetwork: string) {
  const response = await fetch(`${API_BASE_URL}/walletPaymentRequest`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ 
      trxnId, 
      mobileNumber,
      mobileNetwork 
    }),
  });
  return response.json();
}

export async function checkPaymentStatus(trxnId: string) {
  const response = await fetch(`${API_BASE_URL}/paymentStatus/${trxnId}`);
  return response.json();
}