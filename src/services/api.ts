import axios, { AxiosError } from 'axios';
import Router from 'next/router';
import { getAuthStorage, removeAuthStorage } from 'src/utils/storage';

const apiWithAuth = axios.create({
  baseURL: 'http://localhost:8000',
});

apiWithAuth.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const auth = getAuthStorage();

    if (auth) {
      const jwt = auth.token;

      config.headers!.Authorization = `Bearer ${jwt}`;
    }
  }

  return config;
});

apiWithAuth.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ mensagem?: string }>) => {
    if (error.response?.status === 401) {
      removeAuthStorage();
      Router.push('/login');
    }
    return error;
  }
);

export { apiWithAuth };
