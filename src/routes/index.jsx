import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Financeiro from '../pages/Financeiro';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Pedidos from '../pages/Pedidos';
import Recover from '../pages/Recover';
import Register from '../pages/Register';
import Clientes from '../pages/Clientes';
import PrivateRoute from './PrivateRoute';
import Estoque from '../pages/Estoque';

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/recover" element={<Recover />} />

      <Route path="/financeiro" element={<PrivateRoute />}>
        <Route path="/financeiro" element={<Financeiro />} />
      </Route>

      <Route path="/pedidos" element={<PrivateRoute />}>
        <Route path="/pedidos" element={<Pedidos />} />
      </Route>

      <Route path="/clientes" element={<PrivateRoute />}>
        <Route path="/clientes" element={<Clientes />} />
      </Route>

      <Route path="/estoque" element={<PrivateRoute />}>
        <Route path="/estoque" element={<Estoque />} />
      </Route>
    </Routes>
  );
}
