<template>
  <div class="relative">
    <button
      type="button"
      @click="isOpen = !isOpen"
      class="w-full flex items-center justify-between px-4 py-3 border-2 rounded-lg hover:border-mobile-500 transition-colors duration-200"
    >
      <div class="flex items-center gap-2">
        <img 
          :src="modelValue.flagUrl" 
          :alt="modelValue.name"
          class="w-5 h-4"
        />
        <span class="font-medium">{{ modelValue.name }}</span>
      </div>
      <ChevronDown
        :class="[
          'w-5 h-5 transition-transform duration-200',
          isOpen ? 'transform rotate-180' : ''
        ]"
      />
    </button>

    <transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <div
        v-if="isOpen"
        class="absolute z-10 w-full mt-2 bg-white border rounded-lg shadow-lg"
      >
        <button
          v-for="country in countries"
          :key="country.code"
          @click="selectCountry(country)"
          class="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg"
        >
          <img 
            :src="country.flagUrl" 
            :alt="country.name"
            class="w-5 h-4"
          />
          <span class="font-medium">{{ country.name }}</span>
          <span class="text-gray-500 text-sm">{{ country.provider }}</span>
        </button>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ChevronDown } from 'lucide-vue-next';
import type { Country } from '../../types/mobile-money';

const props = defineProps<{
  modelValue: Country;
  countries: Country[];
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: Country): void;
}>();

const isOpen = ref(false);

const selectCountry = (country: Country) => {
  emit('update:modelValue', country);
  isOpen.value = false;
};
</script>