import axios from 'axios';
import { getAuthStorage } from 'src/utils/storage';

export const apiWithAuth = axios.create({
  baseURL: 'https://fake-api-jwt-json-server-tau.vercel.app',
});

apiWithAuth.interceptors.request.use((config) => {
  const auth = getAuthStorage();
  if (typeof window !== 'undefined') {
    if (auth) {
      const jwt = auth.token;

      config.headers!.Authorization = `Bearer ${jwt}`;
    }
  }

  return config;
});
