import { api } from './api.service';

export type Line = {
  id: string;
  createdBy: string;
  updatedBy: string;
  createdAt: string;
  updatedAt: string;
  name: string;
};

export function getLines(): Promise<Line[]> {
  return api.get('/lines').then((response) => response.data);
}
