<template>
  <button
    :class="[
      'mt-8 w-full py-4 px-6 rounded-lg text-white font-medium transition-all duration-200',
      buttonStyles[paymentType],
      disabled ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'
    ]"
    :disabled="disabled"
    @click="$emit('click')"
  >
    {{ buttonText }}
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  paymentType: string;
  disabled?: boolean;
}>();

const buttonStyles = {
  visa: 'bg-visa-500',
  mobile: 'bg-mobile-500',
  crypto: 'bg-crypto-500'
} as const;

const buttonText = computed(() => {
  switch (props.paymentType) {
    case 'visa':
      return 'Pay with Visa';
    case 'mobile':
      return 'Send Payment Request';
    case 'crypto':
      return 'Pay with Crypto';
    default:
      return 'Pay Now';
  }
});

defineEmits<{
  (e: 'click'): void;
}>();
</script>