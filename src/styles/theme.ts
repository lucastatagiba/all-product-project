import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
  fonts: {
    body: 'Roboto, sans-serif',
  },

  styles: {
    global: {
      body: {
        bg: 'lightgray',
      },
    },
  },
});
