import {
  IAuthState,
  getAuthStorage,
  removeAuthStorage,
  setAuthStorage,
} from 'src/utils/storage';
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

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

  const handleLogin = (auth: IAuthState) => {
    setUserAuth(auth);
    setAuthStorage(auth);
  };

  const handleLogout = () => {
    setUserAuth(undefined);
    removeAuthStorage();
  };

  useEffect(() => {
    if (!userAuth) {
      removeAuthStorage();
    }
  }, [userAuth]);

  return (
    <UserContext.Provider value={{ handleLogin, handleLogout, userAuth }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
