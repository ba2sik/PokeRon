import axios from 'axios';

const serverUrlWithPort = `${import.meta.env.VITE_SERVER_URL}:${import.meta.env.VITE_SERVER_PORT}`;

const apiClient = axios.create({
  baseURL: serverUrlWithPort,
  withCredentials: true,
});

export default apiClient;
