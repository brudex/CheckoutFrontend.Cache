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
        @update:phone="updatePhoneData"
      />
    </Transition>

    <PaymentButton 
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

const props = defineProps<{
  selectedTab: string;
}>();

const emit = defineEmits<{
  (e: 'process-payment', data: any): void;
}>();

const phoneData = ref({ countryCode: '', phoneNumber: '' });

const currentPaymentComponent = computed(() => {
  switch (props.selectedTab) {
    case 'crypto':
      return CryptoPayment;
    case 'visa':
      return VisaPayment;
    case 'mobile':
      return MobileMoneyPayment;
    default:
      return CryptoPayment;
  }
});

const updatePhoneData = (data: { countryCode: string; phoneNumber: string }) => {
  phoneData.value = data;
};

const handlePayment = () => {
  const paymentData = props.selectedTab === 'mobile' 
    ? { type: 'mobile', ...phoneData.value }
    : { type: props.selectedTab };
  
  emit('process-payment', paymentData);
};
</script>