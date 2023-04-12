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
import ClientesEdit from '../pages/Clientes/ClientesEdit';
import ClientesAdd from '../pages/Clientes/ClientesAdd';
import EstoqueAdd from '../pages/Estoque/EstoqueAdd';
import EstoqueEdit from '../pages/Estoque/EstoqueEdit';

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
        <Route path="/clientes/add" element={<ClientesAdd />} />
        <Route path="/clientes/edit/:id" element={<ClientesEdit />} />
      </Route>

      <Route path="/estoque" element={<PrivateRoute />}>
        <Route path="/estoque" element={<Estoque />} />
        <Route path="/estoque/add" element={<EstoqueAdd />} />
        <Route path="/estoque/edit/:id" element={<EstoqueEdit />} />
      </Route>
    </Routes>
  );
}
