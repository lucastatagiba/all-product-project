import { extendTheme } from '@chakra-ui/react';

export const colors = {
  white: {
    pure: '#FFFFFF',
    '040': 'rgba(255,255,255,0.4)',
    '090': 'rgba(255,255,255,0.9)',
  },
  black: {
    pure: '#000000',
    '050': 'rgba(0, 0, 0, 0.05)',
    900: '#222222',
    800: '#292929',
    700: '#333333',
    500: '#444444',
  },
  gray: {
    800: '#666666',
    700: '#8B8B8B',
    600: '#B6B6B6',
    500: '#718096',
    400: '#B4B4B4',
    300: '#CCCCCC',
    200: '#EFEFEF',
    100: '#F2F2F2',
  },
  yellow: {
    100: '#FFF9D8',
  },
  boxShadow: {
    100: 'var(--chakra-shadows-outline)',
  },
} as const;

export const theme = extendTheme({
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
  fonts: {
    body: 'Roboto, sans-serif',
  },
  colors,
});
