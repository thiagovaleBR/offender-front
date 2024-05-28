import { api } from './api.service';

export type IdAndName = { id: string; name: string };

export type Appointment = {
  id: string;
  date: string;
  line: IdAndName;
  offender: IdAndName;
  startTime: string;
  endTime: string;
  description: string;
  ticketId: number | null;
  appointer: string;
};

export type CreatingAppointment = Omit<Appointment, 'id' | 'offender'> & {
  id?: string;
  offender?: IdAndName;
};

export function getAppointmentsByLineAndDate(
  lineId: string,
  date: string
): Promise<Appointment[]> {
  return api
    .get(`/appointments/line-date?lineId=${lineId}&date=${date}`)
    .then((response) => response.data);
}

export type CreateAppointmentDto = {
  date: string;
  lineId: string;
  offenderId: string;
  startTime: string;
  endTime: string;
  description: string;
  ticketId: number | null;
  appointer: string;
};

export function createAppointment(
  dtos: CreateAppointmentDto[]
): Promise<Appointment[]> {
  return api.post('/appointments', dtos).then((response) => response.data);
}
export function deleteAppointmentById(id: string): Promise<void> {
  return api.delete(`/appointments/${id}`).then((response) => response.data);
}
