import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import App from './App';
import { ChakraProvider } from "@chakra-ui/react";
import { ListingsProvider } from './contexts/ListingsContext';
import AuthProvider from './contexts/AuthContext';

ReactDOM.render(
  <ChakraProvider>
    <AuthProvider>
      <ListingsProvider>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </ListingsProvider>
    </AuthProvider>
  </ChakraProvider>,
  document.getElementById('root')
);
