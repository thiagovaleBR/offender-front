<template>
  <q-tr>
    <q-td> {{ line.name }} </q-td>
    <q-td>
      <area-select v-model="area" />
    </q-td>
    <q-td>
      <q-input filled v-model="initialTime" mask="time" :rules="['time']">
        <template v-slot:append>
          <q-icon name="access_time" class="cursor-pointer">
            <q-popup-proxy
              cover
              transition-show="scale"
              transition-hide="scale"
            >
              <q-time v-model="initialTime">
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
      <q-input filled v-model="finalTime" mask="time" :rules="['time']">
        <template v-slot:append>
          <q-icon name="access_time" class="cursor-pointer">
            <q-popup-proxy
              cover
              transition-show="scale"
              transition-hide="scale"
            >
              <q-time v-model="finalTime">
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
      <q-input v-model="description" />
    </q-td>
    <q-td>
      <q-input v-model="ticketID" type="number" />
    </q-td>
    <q-td>
      <q-input v-model="Appointer" />
    </q-td>
    <q-td> + - DELETE </q-td>
  </q-tr>
</template>

<script setup lang="ts">
import { Line } from 'src/services/line.service';
import { Area } from 'src/services/area.service';
import AreaSelect from 'src/components/AreaSelect.vue';
import { ref } from 'vue';

const area = ref<Area>();
const description = ref<string>();
const ticketID = ref<number>();
const Appointer = ref<string>();
const initialTime = ref<string>();
const finalTime = ref<string>();

defineProps<{
  line: Line;
  date: string;
}>();
</script>
