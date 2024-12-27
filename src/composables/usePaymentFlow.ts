import { ref } from 'vue';
import { countries } from '../data/countries';
import { sendWalletPaymentRequest } from '../utils/api';
import { usePaymentStatus } from './usePaymentStatus';
import type { Country } from '../types/mobile-money';

export function usePaymentFlow() {
  const selectedCountry = ref<Country>(countries[0]);
  const selectedNetwork = ref(countries[0].networks[0]);
  const phoneNumber = ref('');
  
  const showStatusModal = ref(false);
  const modalStatus = ref<'loading' | 'success' | 'error'>('loading');
  const modalMessage = ref('');

  const { startStatusCheck, stopStatusCheck } = usePaymentStatus({
    onStatusUpdate: (status, message) => {
      if (['FAILED', 'COMPLETED', 'SUCCESS'].includes(status)) {
        modalStatus.value = status === 'FAILED' ? 'error' : 'success';
        modalMessage.value = message;
        stopStatusCheck();
      }
    }
  });

  const handleModalClose = () => {
    showStatusModal.value = false;
    stopStatusCheck();
  };

  const emitPhoneData = () => {
    return {
      countryCode: selectedCountry.value.dialCode,
      phoneNumber: phoneNumber.value,
      network: selectedNetwork.value
    };
  };

  const initiatePayment = async () => {
    try {
      showStatusModal.value = true;
      modalStatus.value = 'loading';
      modalMessage.value = 'Processing your payment request...';

      const trxnId = document.querySelector('meta[name="trxn-id"]')?.getAttribute('content');
      if (!trxnId) throw new Error('Transaction ID not found');

      const fullNumber = `${selectedCountry.value.dialCode.replace('+', '')}${phoneNumber.value}`;
      const response = await sendWalletPaymentRequest(
        trxnId, 
        fullNumber,
        selectedNetwork.value
      );
      
      if (response.status === '00') {
        modalMessage.value = response.message;
        startStatusCheck(trxnId);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      modalStatus.value = 'error';
      modalMessage.value = error instanceof Error ? error.message : 'Payment request failed';
    }
  };

  return {
    selectedCountry,
    selectedNetwork,
    phoneNumber,
    showStatusModal,
    modalStatus,
    modalMessage,
    handleModalClose,
    initiatePayment,
    emitPhoneData
  };
}