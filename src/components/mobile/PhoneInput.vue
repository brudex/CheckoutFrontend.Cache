<template>
  <div class="space-y-2">
    <label for="phone" class="block text-sm font-medium text-gray-700">
      Phone Number
    </label>
    <div class="flex gap-2">
      <div class="flex-shrink-0 w-32">
        <div class="flex items-center px-3 py-2 border-2 rounded-lg bg-gray-50 text-gray-500">
          <img 
            :src="country.flagUrl" 
            :alt="country.name"
            class="w-5 h-4 mr-2"
          />
          <span>{{ country.dialCode }}</span>
        </div>
      </div>
      <input
        id="phone"
        :value="modelValue"
        type="tel"
        :placeholder="country.placeholder"
        class="flex-1 px-4 py-2 border-2 rounded-lg focus:ring-2 focus:ring-mobile-500 focus:border-mobile-500"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      />
    </div>
    <p class="text-sm text-gray-500">
      Enter the phone number associated with your {{ network }} account
    </p>
  </div>
</template>

<script setup lang="ts">
import { type Country } from '../../types/mobile-money';

defineProps<{
  modelValue: string;
  country: Country;
  network: string;
}>();

defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();
</script>