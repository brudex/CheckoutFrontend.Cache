import { ref, onMounted } from 'vue';

export type PaymentMode = 'card' | 'wallet' | 'crypto';

export function usePaymentModes() {
  const enabledModes = ref<PaymentMode[]>([]);

  const isPaymentModeEnabled = (mode: PaymentMode) => {
    return enabledModes.value.includes(mode);
  };

  onMounted(() => {
    const modesMetaElement = document.querySelector('meta[name="payment-modes"]');
    if (modesMetaElement) {
      try {
        const modes = JSON.parse(modesMetaElement.getAttribute('content') || '[]');
        const modeMapping: Record<string, PaymentMode> = {
          card: 'card',
          wallet: 'wallet',
          crypto: 'crypto'
        };
        enabledModes.value = modes
          .map((mode: string) => modeMapping[mode])
          .filter(Boolean);
      } catch (error) {
        console.error('Failed to parse payment modes:', error);
        enabledModes.value = [];
      }
    }
  });

  return {
    enabledModes,
    isPaymentModeEnabled
  };
}