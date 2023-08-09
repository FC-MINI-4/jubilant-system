import axios from 'axios';
import { clientInstance } from '@/api/axios';
import { IMemberListProps } from '@/types/IMyPages';
import { Cookies } from 'react-cookie';

const cookie = new Cookies();
const employeeId = cookie.get('employeeId');

export default async function memberList(): Promise<IMemberListProps> {
  try {
    const response = await axios.get<IMemberListProps>(
      `${clientInstance.defaults.baseURL}/api/personal-info/schedules/${employeeId}`
    );
    return response.data;
  } catch (error) {
    console.error('List_FAILURE', error);
    throw error;
  }
}