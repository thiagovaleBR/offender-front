<template>
  <q-select
    :options="areas"
    option-value="id"
    option-label="name"
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
    :loading="isLoading"
    :disable="disable"
  />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Area, getAreas } from 'src/services/area.service';

defineProps<{
  modelValue: Area | undefined;
  disable?: boolean;
}>();

defineEmits<{
  (e: 'update:modelValue', value: Area | undefined): void;
}>();

const areas = ref<Area[]>([]);

const isLoading = ref<boolean>(false);

async function loadAreas() {
  try {
    isLoading.value = true;
    areas.value = await getAreas();
  } finally {
    isLoading.value = false;
  }
}

onMounted(loadAreas);
</script>
