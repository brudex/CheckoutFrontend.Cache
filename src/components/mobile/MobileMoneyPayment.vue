<template>
  <div class="space-y-6">
    <CountrySelector
      v-model="selectedCountry"
      :countries="countries"
    />

    <div class="space-y-2">
      <label for="phone" class="block text-sm font-medium text-gray-700">
        Phone Number
      </label>
      <div class="flex gap-2">
        <div class="flex-shrink-0 w-32">
          <div class="flex items-center px-3 py-2 border-2 rounded-lg bg-gray-50 text-gray-500">
            <img 
              :src="selectedCountry.flagUrl" 
              :alt="selectedCountry.name"
              class="w-5 h-4 mr-2"
            />
            <span>{{ selectedCountry.dialCode }}</span>
          </div>
        </div>
        <input
          id="phone"
          v-model="phoneNumber"
          type="tel"
          :placeholder="selectedCountry.placeholder"
          class="flex-1 px-4 py-2 border-2 rounded-lg focus:ring-2 focus:ring-mobile-500 focus:border-mobile-500"
          @input="emitPhoneData"
        />
      </div>
      <p class="text-sm text-gray-500">
        Enter the phone number associated with your {{ selectedCountry.provider }} account
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import CountrySelector from './CountrySelector.vue';
import { type Country } from '../../types/mobile-money';
import { countries } from '../../data/countries';

const emit = defineEmits<{
  (e: 'update:phone', value: { countryCode: string; phoneNumber: string }): void;
}>();

const selectedCountry = ref(countries[0]);
const phoneNumber = ref('');

const emitPhoneData = () => {
  emit('update:phone', {
    countryCode: selectedCountry.value.dialCode,
    phoneNumber: phoneNumber.value,
  });
};

watch(selectedCountry, emitPhoneData);
</script>