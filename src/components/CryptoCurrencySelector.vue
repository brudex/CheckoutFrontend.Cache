<template>
  <div class="relative">
    <button
      @click="isOpen = !isOpen"
      class="w-full flex items-center justify-between px-4 py-3 border-2 rounded-lg hover:border-crypto-500 transition-colors duration-200 bg-white shadow-sm hover:shadow-md"
    >
      <span class="flex items-center gap-2 font-medium">
        <component :is="cryptoIcons[modelValue]" class="w-5 h-5 text-crypto-600" />
        {{ modelValue }}
      </span>
      <ChevronDown
        :class="[
          'w-5 h-5 transition-transform duration-200 text-gray-500',
          isOpen ? 'transform rotate-180' : '',
        ]"
      />
    </button>

    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <div
        v-if="isOpen"
        class="absolute w-full mt-2 bg-white border rounded-lg shadow-xl z-10"
      >
        <button
          v-for="crypto in cryptocurrencies"
          :key="crypto"
          @click="selectCrypto(crypto)"
          class="w-full flex items-center gap-2 px-4 py-3 hover:bg-crypto-50 first:rounded-t-lg last:rounded-b-lg font-medium transition-colors duration-200"
        >
          <component :is="cryptoIcons[crypto]" class="w-5 h-5 text-crypto-600" />
          {{ crypto }}
        </button>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { DollarSign, ChevronDown } from 'lucide-vue-next';
import EthereumIcon from './icons/EthereumIcon.vue';

const props = defineProps<{
  modelValue: string;
  cryptocurrencies: readonly string[];
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

const cryptoIcons = {
  USDT: DollarSign,
  Ethereum: EthereumIcon,
};

const isOpen = ref(false);

const selectCrypto = (crypto: string) => {
  emit('update:modelValue', crypto);
  isOpen.value = false;
};
</script>