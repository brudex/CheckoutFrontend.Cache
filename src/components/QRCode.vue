<template>
  <div class="flex flex-col items-center space-y-2">
    <qrcode-vue
      :value="value"
      :size="size"
      level="H"
      render-as="svg"
      :foreground="foreground"
      :background="background"
      class="rounded-lg overflow-hidden"
    />
    <p v-if="label" class="text-xs text-gray-500">
      {{ label }}
    </p>
  </div>
</template>

<script setup lang="ts">
import QrcodeVue from 'qrcode-vue3';

defineProps<{
  value: string;
  size?: number;
  label?: string;
  foreground?: string;
  background?: string;
}>();
</script>