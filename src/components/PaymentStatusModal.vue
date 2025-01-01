<template>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="onClose" class="relative z-10">
      <TransitionChild
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-4">
          <TransitionChild
            enter="ease-out duration-300"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
              <DialogTitle
                as="h3"
                class="text-xl font-semibold leading-6 text-center mb-4"
                :class="statusTextColor"
              >
                {{ status === 'loading' ? 'Processing' : status.toUpperCase() }}
              </DialogTitle>

              <div class="mt-4">
                <div v-if="status === 'loading'" class="flex flex-col items-center">
                  <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-mobile-500"></div>
                  <p class="mt-4 text-sm text-gray-500">{{ message }}</p>
                </div>
                
                <div v-else class="text-center">
                  <component
                    :is="statusIcon"
                    class="mx-auto h-12 w-12"
                    :class="statusIconColor"
                  />
                  <p class="mt-4 text-sm text-gray-600">{{ message }}</p>
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue';
import { CheckCircle, XCircle, Loader } from 'lucide-vue-next';

const props = defineProps<{
  isOpen: boolean;
  status: 'loading' | 'success' | 'error';
  message: string;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
}>();

const statusIcon = computed(() => {
  switch (props.status) {
    case 'success':
      return CheckCircle;
    case 'error':
      return XCircle;
    default:
      return Loader;
  }
});

const statusIconColor = computed(() => {
  switch (props.status) {
    case 'success':
      return 'text-green-500';
    case 'error':
      return 'text-red-500';
    default:
      return 'text-mobile-500';
  }
});

const statusTextColor = computed(() => {
  switch (props.status) {
    case 'success':
      return 'text-green-600';
    case 'error':
      return 'text-red-600';
    default:
      return 'text-mobile-600';
  }
});

const onClose = () => {
  emit('close');
};
</script>