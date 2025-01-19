<template>
  <div class="space-y-6">
    <CountrySelector
      v-model="selectedCountry"
      :countries="countries"
    />

    <NetworkSelector
      v-model="selectedNetwork"
      :networks="selectedCountry.networks"
    />

    <PhoneInput
      v-model="phoneNumber"
      :country="selectedCountry"
      :network="selectedNetwork"
      @update:phone="emitPhoneData"
    />

    <PaymentStatusModal
      :is-open="showStatusModal"
      :status="modalStatus"
      :message="modalMessage"
      @close="handleModalClose"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import CountrySelector from './CountrySelector.vue';
import NetworkSelector from './NetworkSelector.vue';
import PhoneInput from './PhoneInput.vue';
import PaymentStatusModal from '../PaymentStatusModal.vue';
import { usePaymentFlow } from '../../composables/usePaymentFlow';

const {
  selectedCountry,
  selectedNetwork,
  phoneNumber,
  showStatusModal,
  modalStatus,
  modalMessage,
  handleModalClose,
  initiatePayment,
  emitPhoneData
} = usePaymentFlow();

// Expose initiatePayment to parent
defineExpose({ initiatePayment });

watch([selectedCountry, selectedNetwork], () => {
  emitPhoneData();
});
</script>