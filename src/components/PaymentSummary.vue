<template>
  <div class="space-y-6">
    <!-- Company Logo or Name -->
    <div class="flex justify-center mb-2">
      <template v-if="orderDetails?.logoUrl">
        <img 
          :src="orderDetails.logoUrl" 
          alt="Company Logo"
          class="h-12 object-contain"
          @error="handleImageError"
        />
      </template>
      <template v-else>
        <div class="flex items-center gap-3">
          <div class="bg-blue-600 p-2 rounded-lg">
            <Building2 class="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 class="font-semibold text-gray-900">TechPay Solutions</h2>
            <p class="text-sm text-gray-500">Secure Payment Processing</p>
          </div>
        </div>
      </template>
    </div>

    <!-- Order Details -->
    <div v-if="orderDetails?.orderId || orderDetails?.email" 
         class="bg-gray-50 rounded-lg p-4 border border-gray-100">
      <div class="space-y-2">
        <div v-if="orderDetails?.orderId" class="flex items-center gap-2">
          <span class="text-sm font-medium text-gray-500">Order ID:</span>
          <span class="text-sm font-semibold text-gray-900">{{ orderDetails.orderId }}</span>
        </div>
        <div v-if="orderDetails?.email" class="flex items-center gap-2">
          <span class="text-sm font-medium text-gray-500">Email:</span>
          <span class="text-sm font-semibold text-gray-900">{{ orderDetails.email }}</span>
        </div>
      </div>
    </div>
    
    <!-- Payment Summary -->
    <div class="space-y-4">
      <h2 class="text-lg font-semibold text-gray-900">Payment Summary</h2>
      
      <div v-if="orderDetails?.orderDescription" 
           class="text-gray-700 text-sm bg-gray-50 p-3 rounded-md">
        {{ orderDetails.orderDescription }}
      </div>

      <div class="border-t border-gray-200 pt-4">
        <div class="flex justify-between items-center">
          <span class="text-gray-900 font-semibold">Total</span>
          <span class="text-lg font-bold text-gray-900">
            {{ formatPrice(Number(orderDetails?.amount || amount)) }}
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
import { fetchOrderDetails } from '../utils/api';
import type { OrderDetails } from '../types/order';

const props = defineProps<{
  amount: number;
  currency: string;
}>();

const orderDetails = ref<OrderDetails | null>(null);
const hasImageError = ref(false);

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: props.currency,
  }).format(price);
};

const handleImageError = () => {
  hasImageError.value = true;
};

onMounted(async () => {
  const trxnIdMeta = document.querySelector('meta[name="trxn-id"]');
  const trxnId = trxnIdMeta?.getAttribute('content');
  
  if (trxnId) {
    try {
      const details = await fetchOrderDetails(trxnId);
      orderDetails.value = details;
    } catch (error) {
      console.error('Failed to fetch order details:', error);
    }
  }
});
</script>