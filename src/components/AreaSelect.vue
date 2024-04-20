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
import { getAreas } from 'src/services/area.service';
import { IdAndName } from 'src/services/appointment.service';

defineProps<{
  modelValue: IdAndName | undefined;
  disable?: boolean;
}>();

defineEmits<{
  (e: 'update:modelValue', value: IdAndName | undefined): void;
}>();

const areas = ref<IdAndName[]>([]);

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
