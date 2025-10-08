import { AxiosResponse } from './../../node_modules/axios/index.d';
import { api } from './config';

export interface Condolence {
  message: string;
}

export interface MemorialCaseResponse {
  id: number;
  firstName: string;
  lastName: string;
  middleName: string | null;
  bornDate: string;
  deathDate: string;
  biography: string;
  obituary: string;
  profileImageUrl: string | null;
  placeOfBirth: string;
  placeOfDeath: string;
  createdAt: string;
  updatedAt: string;
  condolences: Condolence[];
}

export async function getCases(): Promise<AxiosResponse<Array<MemorialCaseResponse>>> {
  return await api.get(`${process.env.REACT_APP_API_URL}/api/memorial`);
}
