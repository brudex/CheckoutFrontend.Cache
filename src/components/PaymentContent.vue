<template>
  <div>
    <Transition
      mode="out-in"
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 -translate-x-8"
      enter-to-class="opacity-100 translate-x-0"
      leave-active-class="transition-all duration-300 ease-in"
      leave-from-class="opacity-100 translate-x-0"
      leave-to-class="opacity-0 translate-x-8"
    >
      <component 
        :is="currentPaymentComponent" 
        v-if="isCurrentTabEnabled"
        @update:phone="updatePhoneData"
      />
      <div v-else class="p-8 text-center">
        <p class="text-gray-500">This payment method is currently unavailable.</p>
      </div>
    </Transition>

    <PaymentButton 
      v-if="isCurrentTabEnabled"
      :payment-type="selectedTab"
      @click="handlePayment"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import CryptoPayment from './CryptoPayment.vue';
import VisaPayment from './VisaPayment.vue';
import MobileMoneyPayment from './mobile/MobileMoneyPayment.vue';
import PaymentButton from './PaymentButton.vue';
import { usePaymentModes } from '../composables/usePaymentModes';

const props = defineProps<{
  selectedTab: string;
}>();

const emit = defineEmits<{
  (e: 'process-payment', data: any): void;
}>();

const { isPaymentModeEnabled } = usePaymentModes();

const tabToModeMapping = {
  visa: 'card',
  mobile: 'wallet',
  crypto: 'crypto'
} as const;

const isCurrentTabEnabled = computed(() => 
  isPaymentModeEnabled(tabToModeMapping[props.selectedTab as keyof typeof tabToModeMapping])
);

const currentPaymentComponent = computed(() => {
  switch (props.selectedTab) {
    case 'crypto':
      return CryptoPayment;
    case 'visa':
      return VisaPayment;
    case 'mobile':
      return MobileMoneyPayment;
    default:
      return null;
  }
});

const phoneData = ref({ countryCode: '', phoneNumber: '', network: '' });

const updatePhoneData = (data: { countryCode: string; phoneNumber: string; network: string }) => {
  phoneData.value = data;
};

const handlePayment = () => {
  const paymentData = props.selectedTab === 'mobile' 
    ? { type: 'mobile', ...phoneData.value }
    : { type: props.selectedTab };
  
  emit('process-payment', paymentData);
};
</script>