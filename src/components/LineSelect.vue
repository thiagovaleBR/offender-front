<template>
  <q-select
    :options="lines"
    option-value="id"
    option-label="name"
    label="Linha"
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
    :loading="isLoading"
    :disable="disable"
  />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Line, getLines } from 'src/services/line.service';

defineProps<{
  modelValue: Line | undefined;
  disable?: boolean;
}>();

defineEmits<{
  (e: 'update:modelValue', value: Line | undefined): void;
}>();

const lines = ref<Line[]>([]);

const isLoading = ref<boolean>(false);

async function loadLines() {
  try {
    isLoading.value = true;
    lines.value = await getLines();
  } finally {
    isLoading.value = false;
  }
}

onMounted(loadLines);
</script>
