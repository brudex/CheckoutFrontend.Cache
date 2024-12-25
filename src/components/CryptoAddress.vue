<template>
  <div class="p-4 bg-white rounded-md shadow-sm">
    <p class="font-mono text-sm text-crypto-700 break-all">
      {{ address }}
    </p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  address: string;
}>();
</script>