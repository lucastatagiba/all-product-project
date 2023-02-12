import { FC, PropsWithChildren, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Box, useToast } from '@chakra-ui/react';
import { useIsAuthenticated } from 'src/hooks';

const PageWithAuth: FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter();
  const toast = useToast();
  const isAuthenticated = useIsAuthenticated();

  useEffect(() => {
    if (!isAuthenticated) {
      if (!toast.isActive('expiredToken') && !toast.isActive('notLogged')) {
        toast({
          description: 'Você precisa logar antes de acessar essa rota.',
          status: 'error',
          duration: 4000,
          position: 'top-right',
          containerStyle: { color: 'white' },
          isClosable: true,
          id: 'notLogged',
        });
      }
      router.push('/login');
    }
  }, [router, toast]);

  if (!isAuthenticated) return null;

  return <Box>{children}</Box>;
};

export default PageWithAuth;
