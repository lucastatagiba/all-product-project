import { useState } from 'react';
import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { UserProvider } from 'src/context/authProvider';
import { theme } from 'src/styles/theme';
import { windowExist } from 'src/utils/window';
import { useIsomorphicLayoutEffect } from 'framer-motion';
import { ReportProvider } from 'src/context/reportProvider';

const App = ({ Component, pageProps }: AppProps) => {
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
        <ReportProvider>
          <Component {...pageProps} />
        </ReportProvider>
      </UserProvider>
    </ChakraProvider>
  );
};
export default App;
