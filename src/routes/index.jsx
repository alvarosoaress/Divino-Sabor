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

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/recover" element={<Recover />} />

      <Route path="/financeiro" element={<PrivateRoute open={false} />}>
        <Route path="/financeiro" element={<Financeiro />} />
      </Route>

      <Route path="/pedidos" element={<Pedidos />} />
      <Route path="/clientes" element={<Clientes />} />
    </Routes>
  );
}
