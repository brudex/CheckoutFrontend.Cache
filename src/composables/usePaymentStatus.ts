import { ref } from 'vue';
import { checkPaymentStatus } from '../utils/api';

interface PaymentStatusHookProps {
  onStatusUpdate: (status: string, message: string) => void;
}

export function usePaymentStatus({ onStatusUpdate }: PaymentStatusHookProps) {
  const intervalId = ref<number>();

  const startStatusCheck = (trxnId: string) => {
    // Clear any existing interval
    if (intervalId.value) {
      clearInterval(intervalId.value);
    }

    // Start new interval
    intervalId.value = setInterval(async () => {
      try {
        const response = await checkPaymentStatus(trxnId);
        onStatusUpdate(response.status, response.message);
      } catch (error) {
        console.error('Failed to check payment status:', error);
      }
    }, 15000); // 15 seconds
  };

  const stopStatusCheck = () => {
    if (intervalId.value) {
      clearInterval(intervalId.value);
      intervalId.value = undefined;
    }
  };

  return {
    startStatusCheck,
    stopStatusCheck,
  };
}