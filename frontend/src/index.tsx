import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { mode, StyleFunctionProps } from '@chakra-ui/theme-tools';
import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRouter from './components/AppRouter';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const customTheme = extendTheme({
  styles: {
    global: (props: StyleFunctionProps) => ({
      body: {
        bg: mode('#edeef0', '#141414')(props)
      },
      html: {
        minW: 320
      },
      '#root': {
        minH: '100vh'
      }
    })
  }
});

root.render(
  <React.StrictMode>
    <ChakraProvider
      resetCSS={true}
      theme={customTheme}
    >
      <AppRouter/>
    </ChakraProvider>
  </React.StrictMode>
);

// reportWebVitals(console.log);
