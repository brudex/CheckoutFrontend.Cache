<template>
  <div class="px-6 py-4">
    <div class="flex gap-2">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        @click="selectTab(tab.id)"
        :class="[
          'flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-300 font-medium',
          selectedTab === tab.id
            ? tab.activeClass
            : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
        ]"
      >
        <component :is="tab.icon" class="w-5 h-5" />
        {{ tab.label }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Bitcoin, CreditCard, Smartphone } from 'lucide-vue-next';

const props = defineProps<{
  selectedTab: string;
}>();

const emit = defineEmits<{
  (e: 'update:selectedTab', value: string): void;
}>();

const tabs = [
  {
    id: 'visa',
    label: 'Visa',
    icon: CreditCard,
    activeClass: 'bg-visa-100 text-visa-700',
  },
  {
    id: 'mobile',
    label: 'Mobile Money',
    icon: Smartphone,
    activeClass: 'bg-mobile-100 text-mobile-700',
  },
  {
    id: 'crypto',
    label: 'Crypto',
    icon: Bitcoin,
    activeClass: 'bg-crypto-100 text-crypto-700',
  },
];

const selectTab = (tabId: string) => {
  emit('update:selectedTab', tabId);
};
</script>