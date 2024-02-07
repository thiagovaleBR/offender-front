<template>
  <q-select :options="lines" option-label="name" label="Linha" model-value="" />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Line, getLines } from 'src/services/line.service';

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
