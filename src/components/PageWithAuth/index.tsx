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
      toast({
        description: 'Você precisa logar antes de acessar essa rota.',
        status: 'error',
        duration: 4000,
        position: 'top-right',
        containerStyle: { color: 'white' },
        isClosable: true,
      });
      router.push('/login');
    }
  }, []);

  return <Box>{children}</Box>;
};

export default PageWithAuth;
