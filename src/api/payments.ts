import { API_BASE_URL } from './config';

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

export const sendVisaPaymentRequest = async (trxnId: string) => {
  const response = await fetch('/api/visaPaymentRequest', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ trxnId })
  });
  
  return response.json();
};