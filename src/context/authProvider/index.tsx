import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from 'react';
import { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { useToast } from '@chakra-ui/react';
import {
  IAuthState,
  getAuthStorage,
  removeAuthStorage,
  setAuthStorage,
} from 'src/utils/storage';
import { apiWithAuth } from 'src/services';

interface UserAuthContext {
  handleLogin: (auth: IAuthState) => void;
  handleLogout: () => void;
  userAuth: IAuthState | undefined;
}

const UserContext = createContext({} as UserAuthContext);

export const UserProvider = ({ children }: PropsWithChildren) => {
  const [userAuth, setUserAuth] = useState<IAuthState | undefined>(() =>
    getAuthStorage()
  );
  const router = useRouter();
  const toast = useToast();

  const handleLogin = (auth: IAuthState) => {
    setUserAuth(auth);
    setAuthStorage(auth);
    router.push('/');
  };

  const handleLogout = useCallback(() => {
    setUserAuth(undefined);
    router.push('/login');
    removeAuthStorage();
  }, [router]);

  useEffect(() => {
    if (!userAuth) {
      removeAuthStorage();
    }
  }, [userAuth]);

  useEffect(() => {
    apiWithAuth.interceptors.response.use(
      (response) => response,
      (error) => {
        if (
          error?.status === 401 &&
          error?.message !== 'Incorrect email or password'
        ) {
          handleLogout();
          if (!toast.isActive('expiredToken')) {
            toast({
              description:
                'Token de autenticação expirado, para continuar refaça login',
              status: 'error',
              duration: 4000,
              position: 'top-right',
              containerStyle: { color: 'white' },
              isClosable: true,
              id: 'expiredToken',
            });
          }
        }

        return Promise.reject(error?.response?.data);
      }
    );
  }, [handleLogout, toast]);

  return (
    <UserContext.Provider value={{ handleLogin, handleLogout, userAuth }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
