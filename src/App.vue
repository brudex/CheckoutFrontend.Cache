<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
    <div class="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
      <div class="flex flex-col md:flex-row">
        <!-- Left Sidebar - Payment Summary -->
        <div class="md:w-80 p-6 bg-gray-50 border-b md:border-b-0 md:border-r border-gray-200">
          <PaymentSummary :amount="99.99" :currency="'USD'" />
        </div>

        <!-- Right Side - Payment Options -->
        <div class="flex-1">
          <!-- Payment Tabs at Top -->
          <div class="border-b border-gray-200">
            <PaymentTabs v-model:selectedTab="selectedTab" />
          </div>

          <!-- Payment Content -->
          <div class="p-8">
            <PaymentContent 
              :selected-tab="selectedTab"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import PaymentTabs from './components/PaymentTabs.vue';
import PaymentContent from './components/PaymentContent.vue';
import PaymentSummary from './components/PaymentSummary.vue';

const selectedTab = ref('visa'); // Changed default tab to Visa
</script>