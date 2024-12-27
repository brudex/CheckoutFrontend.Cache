<template>
  <div class="space-y-6">
    <!-- Order Details -->
    <div v-if="orderDetails.orderId || orderDetails.email" class="space-y-4 pb-4 border-b border-gray-200">
      <div>
        <p v-if="orderDetails.orderId" class="text-sm text-gray-600">Order ID: {{ orderDetails.orderId }}</p>
        <p v-if="orderDetails.email" class="text-sm text-gray-600">Email: {{ orderDetails.email }}</p>
      </div>
    </div>

    <!-- Company Logo or Name -->
    <div class="flex items-center gap-3">
      <template v-if="orderDetails.logoUrl">
        <img 
          :src="orderDetails.logoUrl" 
          alt="Company Logo"
          class="h-8 object-contain"
          @error="handleImageError"
        />
      </template>
      <template v-else>
        <div class="bg-blue-600 p-2 rounded-lg">
          <Building2 class="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 class="font-semibold text-gray-900">TechPay Solutions</h2>
          <p class="text-sm text-gray-500">Secure Payment Processing</p>
        </div>
      </template>
    </div>
    
    <!-- Payment Summary -->
    <div class="space-y-4">
      <h2 class="text-lg font-semibold text-gray-900">Payment Summary</h2>
      
      <div v-if="orderDetails.orderDescription" class="text-gray-600 text-sm">
        {{ orderDetails.orderDescription }}
      </div>

      <div class="border-t border-gray-200 pt-4">
        <div class="flex justify-between items-center">
          <span class="text-gray-900 font-semibold">Total</span>
          <span class="text-lg font-bold text-gray-900">
            {{ formatPrice(Number(orderDetails.amount || amount)) }}
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
import { ref, onMounted } from 'vue';
import { Shield, Building2 } from 'lucide-vue-next';
import type { OrderDetails } from '../types/order';
import { fetchOrderDetails } from '../utils/api';

const props = defineProps<{
  amount: number;
  currency: string;
}>();

const orderDetails = ref<OrderDetails>({
  amount: props.amount.toString(),
  email: "",
  orderId: "",
  transactionId: "",
  orderDescription: ""
});

const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement;
  if (orderDetails.value.logoUrl === img.src) {
    orderDetails.value.logoUrl = undefined;
  }
};

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: props.currency,
  }).format(price);
};

onMounted(async () => {
  const metaTag = document.querySelector('meta[name="trxn-id"]');
  if (metaTag) {
    const trxnId = metaTag.getAttribute('content');
    if (trxnId) {
      const data = await fetchOrderDetails(trxnId);
      orderDetails.value = data;
    }
  }
});
</script>