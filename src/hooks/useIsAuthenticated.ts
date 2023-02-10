import { useUserContext } from 'src/context';

export const useIsAuthenticated = () => {
  const { userAuth } = useUserContext();

  return !!userAuth;
};
