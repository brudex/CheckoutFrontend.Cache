<template>
  <div class="space-y-2">
    <label class="block text-sm font-medium text-gray-700">
      Network
    </label>
    <select
      :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
      class="w-full px-4 py-2 border-2 rounded-lg focus:ring-2 focus:ring-mobile-500 focus:border-mobile-500"
    >
      <option value="" disabled>Select network</option>
      <option
        v-for="network in networks"
        :key="network"
        :value="network"
      >
        {{ network }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: string;
  networks: string[];
}>();

defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();
</script>