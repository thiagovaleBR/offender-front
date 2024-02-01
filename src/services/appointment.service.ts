import { api } from './api.service';

type IdAndName = { id: string; name: string };

export type Appointment = {
  id: string;
  date: string;
  line: IdAndName;
  offender: IdAndName
  startTime: string;
  endTime: string;
  description: string;
  ticketId:  number | null;
  appointer: string;
};

export function getAppointmentsByLineAndDate(lineId: string, date: string): Promise<Appointment[]> {
  return api.get(`/appointments/line-date?lineId=${lineId}&date=${date}`).then((response) => response.data);
}
