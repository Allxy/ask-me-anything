import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { mode, StyleFunctionProps } from '@chakra-ui/theme-tools';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import AppRouter from './components/AppRouter';
import { store } from './store/store';

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
    <Provider store={store}>
      <ChakraProvider
        resetCSS={true}
        theme={customTheme}
      >
        <AppRouter/>
      </ChakraProvider>
    </Provider>
  </React.StrictMode>
);

// reportWebVitals(console.log);
