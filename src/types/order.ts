export interface OrderDetails {
  amount: string;
  email: string;
  orderId: string;
  transactionId: string;
  orderDescription: string;
  logoUrl?: string;
  status: string;
  redirectUrl?: string;
  paymentStatus: 'PENDING' | 'NOT_INITIATED' | 'COMPLETED' | 'FAILED';
}