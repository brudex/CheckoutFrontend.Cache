<template>
  <button
    :class="[
      'mt-8 w-full py-4 px-6 rounded-lg text-white font-medium transition-all duration-200',
      paymentType === 'crypto'
        ? 'bg-crypto-500 hover:bg-crypto-600'
        : 'bg-visa-500 hover:bg-visa-600',
    ]"
    @click="$emit('click')"
  >
    Pay with {{ paymentType === 'crypto' ? 'Crypto' : 'Visa' }}
  </button>
</template>

<script setup lang="ts">
defineProps<{
  paymentType: string;
}>();

defineEmits<{
  (e: 'click'): void;
}>();
</script>