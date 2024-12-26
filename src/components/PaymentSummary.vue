<template>
  <div class="space-y-6">
    <!-- Company Logo and Name -->
    <div class="flex items-center gap-3 pb-4 border-b border-gray-200">
      <div class="bg-blue-600 p-2 rounded-lg">
        <Building2 class="w-6 h-6 text-white" />
      </div>
      <div>
        <h2 class="font-semibold text-gray-900">TechPay Solutions</h2>
        <p class="text-sm text-gray-500">Secure Payment Processing</p>
      </div>
    </div>
    
    <!-- Payment Summary Heading -->
    <h2 class="text-lg font-semibold text-gray-900">Payment Summary</h2>
    
    <div class="space-y-4">
      <div class="flex justify-between items-center">
        <span class="text-gray-600">Subtotal</span>
        <span class="font-medium">{{ formatPrice(amount) }}</span>
      </div>
      
      <div class="flex justify-between items-center">
        <span class="text-gray-600">Processing Fee</span>
        <span class="font-medium">{{ formatPrice(processingFee) }}</span>
      </div>
      
      <div class="border-t border-gray-200 pt-4">
        <div class="flex justify-between items-center">
          <span class="text-gray-900 font-semibold">Total</span>
          <span class="text-lg font-bold text-gray-900">
            {{ formatPrice(total) }}
          </span>
        </div>
      </div>
    </div>

    <div class="bg-blue-50 rounded-lg p-4">
      <div class="flex items-start gap-3">
        <Shield class="w-5 h-5 text-blue-600 mt-0.5" />
        <div>
          <h3 class="text-sm font-medium text-blue-900">Secure Payment</h3>
          <p class="text-sm text-blue-700 mt-1">
            Your payment information is encrypted and secure
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Shield, Building2 } from 'lucide-vue-next';

const props = defineProps<{
  amount: number;
  currency: string;
}>();

const processingFee = computed(() => props.amount * 0.029 + 0.30);
const total = computed(() => props.amount + processingFee.value);

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: props.currency,
  }).format(price);
};
</script>