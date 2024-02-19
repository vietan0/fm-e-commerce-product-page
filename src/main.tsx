import './index.css';

import { NextUIProvider } from '@nextui-org/system';
import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App.tsx';
import CartProvider from './CartContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <NextUIProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </NextUIProvider>
  </React.StrictMode>,
);
