import { api } from './api.service';

export type Area = {
  id: string;
  createdBy: string;
  updatedBy: string;
  createdAt: string;
  updatedAt: string;
  name: string;
};

export function getAreas(): Promise<Area[]> {
  return api.get('/areas').then((response) => response.data);
}
