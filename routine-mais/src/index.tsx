import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import PrivateRoute from './PrivateRoute';
import { Main } from './pages/home/main';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ChakraProvider value={defaultSystem}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route element={<PrivateRoute />}>
            <Route path="/home" element={<Main />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
</React.StrictMode>
);

reportWebVitals();
