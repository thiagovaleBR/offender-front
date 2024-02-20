<template>
  <q-tr>
    <q-td> {{ modelValue.line.name }} </q-td>
    <q-td>
      <area-select v-model="innerValue.offender" dense />
    </q-td>
    <q-td>
      <q-input
        dense
        v-model="innerValue.startTime"
        mask="time"
        :rules="['time']"
        hide-bottom-space
      >
        <template v-slot:append>
          <q-icon name="access_time" class="cursor-pointer">
            <q-popup-proxy
              cover
              transition-show="scale"
              transition-hide="scale"
            >
              <q-time v-model="innerValue.startTime">
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Close" color="primary" flat />
                </div>
              </q-time>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
    </q-td>
    <q-td>
      <q-input
        dense
        v-model="innerValue.endTime"
        mask="time"
        :rules="['time']"
        hide-bottom-space
      >
        <template v-slot:append>
          <q-icon name="access_time" class="cursor-pointer">
            <q-popup-proxy
              cover
              transition-show="scale"
              transition-hide="scale"
            >
              <q-time v-model="innerValue.endTime">
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Close" color="primary" flat />
                </div>
              </q-time>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
    </q-td>
    <q-td>
      <q-input v-model="innerValue.description" dense />
    </q-td>
    <q-td>
      <q-input v-model="innerValue.ticketId" type="number" dense />
    </q-td>
    <q-td>
      <q-input v-model="innerValue.appointer" dense />
    </q-td>
    <q-td>
      <q-btn
        color="negative"
        icon="delete"
        dense
        round
        flat
        @click="$emit('remove')"
      />
    </q-td>
  </q-tr>
</template>

<script setup lang="ts">
import AreaSelect from 'src/components/AreaSelect.vue';
import { ref, watch } from 'vue';
import { CreatingAppointment } from 'src/services/appointment.service';

const props = defineProps<{
  modelValue: CreatingAppointment;
}>();

const emit = defineEmits<{
  (e: 'remove'): void;
  (e: 'update:modelValue', value: CreatingAppointment): void;
}>();

const innerValue = ref<CreatingAppointment>(props.modelValue);

watch(
  () => props.modelValue,
  (newValue) => {
    innerValue.value = newValue;
  }
);

watch(innerValue, (newValue) => {
  emit('update:modelValue', newValue);
});
</script>
