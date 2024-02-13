<template>
  <div class="q-pa-md">
    <div class="row">
      <div class="col-1">
        <line-select v-model="line" :disable="!!creating.length" />
      </div>
      <q-input
        label="Data"
        v-model="date"
        mask="####-##-##"
        :disable="!!creating.length"
      >
        <template v-slot:append>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy
              cover
              transition-show="scale"
              transition-hide="scale"
            >
              <q-date
                mask="YYYY-MM-DD"
                v-model="date"
                :disable="!!creating.length"
              >
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Close" color="primary" flat />
                </div>
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
      <q-btn label="Buscar" color="primary" @click="search" />
    </div>
    <q-table
      title="Ofensores do dia "
      flat
      bordered
      :rows="appointments"
      :columns="columns"
      row-key="name"
    >
      <template #top-right>
        <q-btn
          color="primary"
          icon="add"
          dense
          round
          @click="onCreate()"
          :disable="!line || !date"
        >
          <q-tooltip v-if="!line || !date"
            >Favor inserir Linha e Data</q-tooltip
          >
        </q-btn>
      </template>
      <template #bottom-row v-if="line && date">
        <appointment-form-row
          v-for="i in creating"
          :key="i"
          :line="line"
          :date="date"
        />
      </template>
    </q-table>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {
  getAppointmentsByLineAndDate,
  Appointment,
} from '../services/appointment.service';
import { QTableColumn } from 'quasar';
import { Line } from 'src/services/line.service';
import LineSelect from 'src/components/LineSelect.vue';
import AppointmentFormRow from 'src/components/AppointmentFormRow.vue';

const appointments = ref<Appointment[]>([]);

const creating = ref<number[]>([]);

const line = ref<Line>();

const date = ref<string>('');

const columns: QTableColumn<Appointment>[] = [
  {
    name: 'line_id',
    field: (a) => a.line.name,
    label: 'Linha',
    align: 'center',
    sortable: true,
  },
  {
    name: 'offender_id',
    field: (a) => a.offender.name,
    label: 'Área Ofensora',
    align: 'center',
    sortable: true,
  },
  {
    name: 'start_time',
    field: 'startTime',
    label: 'Início',
    align: 'center',
    sortable: true,
  },
  {
    name: 'end_time',
    field: 'endTime',
    label: 'Fim',
    align: 'center',
    sortable: true,
  },
  {
    name: 'description',
    field: 'description',
    label: 'Descrição',
    align: 'center',
    sortable: true,
  },
  {
    name: 'ticket_id',
    field: 'ticketId',
    label: 'Chamado',
    align: 'center',
    sortable: true,
  },
  {
    name: 'appointer',
    field: 'appointer',
    label: 'Responsável pelo apontamento',
    align: 'center',
    sortable: true,
  },
  {
    name: 'actions',
    field: () => undefined,
    label: 'Ações',
    align: 'center',
  },
];

function onCreate() {
  creating.value.push(getNextCreatingIndex());
}
function getNextCreatingIndex() {
  if (!creating.value.length) return 0;
  return creating.value[creating.value.length - 1] + 1;
}
async function search() {
  if (!line.value) return;
  appointments.value = await getAppointmentsByLineAndDate(
    line.value.id,
    date.value
  );
}
</script>
