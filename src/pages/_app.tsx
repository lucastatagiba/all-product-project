import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { UserProvider } from 'src/context';
import { theme } from 'src/styles/theme';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    </ChakraProvider>
  );
}
