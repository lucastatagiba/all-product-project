import { useState } from 'react';
import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { UserProvider } from 'src/context';
import { theme } from 'src/styles/theme';
import { windowExist } from 'src/utils/window';
import { useIsomorphicLayoutEffect } from 'framer-motion';

export default function App({ Component, pageProps }: AppProps) {
  const [showChild, setShowChild] = useState(false);

  useIsomorphicLayoutEffect(() => {
    setShowChild(true);
  }, []);

  if (!showChild || !windowExist) {
    return null;
  }

  return (
    <ChakraProvider theme={theme}>
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    </ChakraProvider>
  );
}
