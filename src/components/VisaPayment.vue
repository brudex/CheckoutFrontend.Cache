<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <div class="space-y-4">
      <div>
        <label for="cardNumber" class="block text-sm font-medium text-gray-700 mb-1">
          Card Number
        </label>
        <input
          id="cardNumber"
          v-model="formData.cardNumber"
          type="text"
          placeholder="4242 4242 4242 4242"
          class="mt-1 block w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-visa-500 focus:border-visa-500 bg-white shadow-sm"
          maxlength="19"
          @input="formatCardNumber"
        />
      </div>

      <div class="grid grid-cols-2 gap-4">
        <div>
          <label for="expiry" class="block text-sm font-medium text-gray-700 mb-1">
            Expiry Date
          </label>
          <input
            id="expiry"
            v-model="formData.expiry"
            type="text"
            placeholder="MM/YY"
            class="mt-1 block w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-visa-500 focus:border-visa-500 bg-white shadow-sm"
            maxlength="5"
            @input="formatExpiry"
          />
        </div>

        <div>
          <label for="cvv" class="block text-sm font-medium text-gray-700 mb-1">
            CVV
          </label>
          <input
            id="cvv"
            v-model="formData.cvv"
            type="text"
            placeholder="123"
            class="mt-1 block w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-visa-500 focus:border-visa-500 bg-white shadow-sm"
            maxlength="3"
          />
        </div>
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import { reactive } from 'vue';

const formData = reactive({
  cardNumber: '',
  expiry: '',
  cvv: '',
});

const formatCardNumber = (event: Event) => {
  const input = event.target as HTMLInputElement;
  let value = input.value.replace(/\D/g, '');
  value = value.replace(/(\d{4})/g, '$1 ').trim();
  formData.cardNumber = value;
};

const formatExpiry = (event: Event) => {
  const input = event.target as HTMLInputElement;
  let value = input.value.replace(/\D/g, '');
  if (value.length >= 2) {
    value = value.slice(0, 2) + '/' + value.slice(2);
  }
  formData.expiry = value;
};

const handleSubmit = () => {
  // Handle payment submission
  console.log('Payment submitted:', formData);
};
</script>