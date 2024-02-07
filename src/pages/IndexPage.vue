<template>
  <div class="q-pa-md">
    <div class="row">
      <div class="col-1">
        <line-select v-model="lineId" />
      </div>
      <q-input label="Data" v-model="date" mask="####-##-##">
        <template v-slot:append>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy
              cover
              transition-show="scale"
              transition-hide="scale"
            >
              <q-date mask="YYYY-MM-DD" v-model="date">
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
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {
  getAppointmentsByLineAndDate,
  Appointment,
} from '../services/appointment.service';
import { QTableColumn } from 'quasar';
import LineSelect from 'src/components/LineSelect.vue';

const appointments = ref<Appointment[]>([]);

const lineId = ref<string>('');
const date = ref<string>('');

const columns: QTableColumn<Appointment>[] = [
  // os campos são: Line_id, offender_id, start_time, end_time,description, ticket_id, Appointer
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
];

async function search() {
  appointments.value = await getAppointmentsByLineAndDate(
    lineId.value,
    date.value
  );
}
</script>
