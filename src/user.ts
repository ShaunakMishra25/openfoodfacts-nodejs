import axios from 'axios';
import qs from 'qs';
import { BACKEND_DOMAINS, BackendType } from './consts';

const BASE_URL = `https://${BACKEND_DOMAINS[BackendType.OFF]}`;

export interface CreateUserParams {
  username: string;
  password: string;
  email: string;
  comment?: string;
}

export async function createUser(params: CreateUserParams): Promise<any> {
  const payload = {
    user_id: params.username,
    password: params.password,
    email: params.email,
    comment: params.comment || '',
    process: 'registration'
  };

  try {
    const response = await axios.post(
      `${BASE_URL}/cgi/user.pl`,
      qs.stringify(payload),
      {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      }
    );

    return response.data;
  } catch (error: any) {
    throw new Error(`Error creating user: ${error.response?.data?.error || error.message}`);
  }
}
