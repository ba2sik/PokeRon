import apiClient from './apiClient';
import { AuthPayload } from '../components/AuthForm/types/auth-payload-schema';
import { isAxiosError } from 'axios';

export type UserSession = {
  loggedIn: boolean;
  email: string;
};

export default {
  login,
  register,
  logout,
  getSession,
};

async function login(credentials: AuthPayload) {
  try {
    const response = await apiClient.post('/api/auth/login', credentials, {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 401) {
      return error.response.data;
    }

    throw error;
  }
}

async function register(credentials: AuthPayload) {
  try {
    const response = await apiClient.post('/api/auth/register', credentials);

    return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 409) {
      return error.response.data;
    }

    throw error;
  }
}

async function logout() {
  try {
    const response = await apiClient.post('/api/auth/logout');

    return response.data;
  } catch (error) {
    console.error('Error logging in ', error);
    throw error;
  }
}

async function getSession(): Promise<UserSession> {
  try {
    const response = await apiClient.get<UserSession>('/api/auth/me');

    return response.data;
  } catch (error) {
    console.error('Error logging in ', error);
    throw error;
  }
}
