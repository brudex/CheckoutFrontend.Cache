import { ref, onMounted } from 'vue';
import { fetchOrderDetails } from '../api/orders';
import { usePaymentStatus } from './usePaymentStatus';

export function useOrderDetails() {
  const isPaymentEnabled = ref(true);
  const orderDetails = ref(null);

  const { startStatusCheck } = usePaymentStatus({
    onStatusUpdate: (status) => {
      if (['COMPLETED', 'SUCCESS'].includes(status)) {
        isPaymentEnabled.value = false;
      }
    }
  });

  onMounted(async () => {
    const trxnId = document.querySelector('meta[name="trxn-id"]')?.getAttribute('content');
    if (!trxnId) return;

    try {
      const details = await fetchOrderDetails(trxnId);
      orderDetails.value = details;

      // Handle redirect if status is not "00"
      if (details.status !== "00" && details.redirectUrl) {
        window.location.href = details.redirectUrl;
        return;
      }

      // Only disable buttons for completed payments
      if (['COMPLETED', 'SUCCESS'].includes(details.paymentStatus)) {
        isPaymentEnabled.value = false;
      }
    } catch (error) {
      console.error('Failed to fetch order details:', error);
    }
  });

  return {
    isPaymentEnabled,
    orderDetails
  };
}