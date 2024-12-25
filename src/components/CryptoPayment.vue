<template>
  <div class="space-y-6">
    <CryptoCurrencySelector
      v-model="selectedCrypto"
      :cryptocurrencies="cryptocurrencies"
    />

    <div class="p-6 bg-crypto-50 rounded-lg border-2 border-crypto-100">
      <p class="text-sm font-medium text-crypto-700 mb-4">
        Send your payment to the following address:
      </p>
      
      <div class="flex flex-col items-center space-y-6">
        <QRCode
          :value="cryptoAddress"
          :size="200"
          label="Scan to pay"
          foreground="#15803d"
          background="#ffffff"
        />
        
        <CryptoAddress :address="cryptoAddress" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import QRCode from './QRCode.vue';
import CryptoAddress from './CryptoAddress.vue';
import CryptoCurrencySelector from './CryptoCurrencySelector.vue';
import { getCryptoAddress } from '../utils/crypto';

const cryptocurrencies = ['USDT', 'Ethereum'] as const;
type CryptoType = typeof cryptocurrencies[number];

const selectedCrypto = ref<CryptoType>('USDT');
const cryptoAddress = computed(() => getCryptoAddress(selectedCrypto.value));
</script>