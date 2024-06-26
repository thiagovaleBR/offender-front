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
      title="Ofensores do dia"
      flat
      bordered
      :rows="appointments"
      :columns="columns"
      row-key="id"
      :rows-per-page-options="[0]"
    >
      <template #top-right>
        <q-btn
          color="primary"
          label="novo"
          @click="onCreate()"
          :disable="!line || !date"
        >
          <q-tooltip v-if="!line || !date"
            >Favor inserir Linha e Data</q-tooltip
          >
        </q-btn>
      </template>
      <template #body-cell-actions="props">
        <q-td :props="props">
          <q-btn
            flat
            round
            dense
            icon="delete"
            color="negative"
            @click="deleteAppointment(props.row)"
          />
        </q-td>
      </template>
      <template #bottom-row v-if="line && date">
        <appointment-form-row
          v-for="(appointment, idx) in creating"
          :key="idx"
          :model-value="appointment"
          @remove="creating.splice(idx, 1)"
        />
        <q-tr v-if="creating.length">
          <q-td colspan="8" class="text-right">
            <q-btn color="positive" label="Salvar" @click="onSave()" />
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {
  getAppointmentsByLineAndDate,
  deleteAppointmentById,
  Appointment,
  CreatingAppointment,
  createAppointment,
  CreateAppointmentDto,
} from '../services/appointment.service';
import { QTableColumn } from 'quasar';
import { Line } from 'src/services/line.service';
import LineSelect from 'src/components/LineSelect.vue';
import AppointmentFormRow from 'src/components/AppointmentFormRow.vue';

const appointments = ref<Appointment[]>([]);

const creating = ref<CreatingAppointment[]>([]);

const line = ref<Line>();

const date = ref<string>('');

const columns: QTableColumn<Appointment>[] = [
  {
    name: 'line_name',
    field: (row) => row.line.name,
    label: 'Linha',
    align: 'center',
    sortable: true,
  },
  {
    name: 'offender_name',
    field: (row) => row.offender.name,
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

async function deleteAppointment(appointment: Appointment) {
  if (!appointment || !appointment.id) {
    console.error('Invalid appointment data', appointment);
    return;
  }
  try {
    await deleteAppointmentById(appointment.id);
    search();
  } catch (error) {
    console.error('Failed to delete appointment', error);
  }
}

function onCreate() {
  if (!line.value) return;
  creating.value.push({
    line: line.value,
    date: date.value,
    startTime: '',
    endTime: '',
    description: '',
    ticketId: null,
    appointer: '',
  });
}

async function search() {
  if (!line.value) return;
  appointments.value = await getAppointmentsByLineAndDate(
    line.value.id,
    date.value
  );
}

async function onSave() {
  const data: CreateAppointmentDto[] = creating.value
    .filter((a) => a.offender != undefined)
    .map((a) => ({
      lineId: a.line.id,
      offenderId: a.offender!.id,
      date: a.date,
      startTime: a.startTime,
      endTime: a.endTime,
      description: a.description,
      ticketId: a.ticketId,
      appointer: a.appointer,
    }));
  await createAppointment(data);
  creating.value = [];
  search();
}
</script>
