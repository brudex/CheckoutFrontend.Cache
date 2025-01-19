<template>
  <form id="payment-form" @submit.prevent="handleSubmit" class="space-y-6">
    <div id="payment-element">
        <!--Stripe.js injects the Payment Element-->
    </div>
    
    <button type="submit" class="btn btn-primary">Submit Payment</button>
  </form>
  <StatusModal v-if="showStatusModal" :status="modalStatus" :message="modalMessage" @close="handleModalClose" />
</template>

<script setup lang="ts">
import { reactive, onMounted } from 'vue';
import { useVisaPaymentFlow } from '../composables/useVisaPaymentFlow';



const { showStatusModal, modalStatus, modalMessage, handleModalClose,initialize, initiatePayment } = useVisaPaymentFlow();

onMounted(() => {
  initialize();
});

const handleSubmit = () => {
  initiatePayment();
};
</script>