import { useUserContext } from 'src/context/authProvider';

export const useIsAuthenticated = () => {
  const { userAuth } = useUserContext();

  return !!userAuth;
};
