import apiClient from './apiClient';
import { isAxiosError } from 'axios';
import { AuthPayload, UserSession } from '@repo/shared-types';
import { StatusCodes } from 'http-status-codes';

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
    if (isAxiosError(error) && error.response?.status === StatusCodes.UNAUTHORIZED) {
      throw new Error('Invalid email or password');
    }

    throw error;
  }
}

async function register(credentials: AuthPayload) {
  try {
    const response = await apiClient.post('/api/auth/register', credentials);

    return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === StatusCodes.CONFLICT) {
      throw new Error('Email already in use');
    }

    throw error;
  }
}

async function logout() {
  try {
    const response = await apiClient.post('/api/auth/logout');

    return response.data;
  } catch (error) {
    console.error('Error logging out ', error);
    throw error;
  }
}

async function getSession(): Promise<UserSession> {
  try {
    const response = await apiClient.get<UserSession>('/api/auth/me');

    return response.data;
  } catch (error) {
    console.error('Error retrieving session ', error);
    throw error;
  }
}
