import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import App from './App';
import { ChakraProvider } from "@chakra-ui/react";
import { ListingsProvider } from './ListingsContext';

ReactDOM.render(
  <ChakraProvider>
    <ListingsProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </ListingsProvider>
  </ChakraProvider>,
  document.getElementById('root')
);

