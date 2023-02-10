import { windowExist } from './window';

export interface IAuthState {
  token: string;
  usuario: {
    id: number;
    email: string;
    isAdmin: boolean;
  };
}

const AUTH_STORAGE_KEY = '@allProduct:auth';

export const getAuthStorage = () => {
  const authStorage = windowExist && localStorage.getItem(AUTH_STORAGE_KEY);
  return authStorage ? (JSON.parse(authStorage) as IAuthState) : undefined;
};

export const setAuthStorage = (auth: IAuthState) => {
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(auth));
};

export const removeAuthStorage = () => {
  localStorage.removeItem(AUTH_STORAGE_KEY);
};
