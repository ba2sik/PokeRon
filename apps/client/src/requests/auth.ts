import { AuthPayload } from '../components/AuthForm/types/auth-payload-schema';
import apiClient from './apiClient';

export default {
  login,
  register,
  logout,
};

async function login(credentials: AuthPayload) {
  try {
    const response = await apiClient.post('/api/auth/login', credentials, {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    console.error('Error logging in ', error);
    throw error;
  }
}

async function register(credentials: AuthPayload) {
  try {
    const response = await apiClient.post('/api/auth/register', credentials);

    return response.data;
  } catch (error) {
    console.error('Error logging in ', error);
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
