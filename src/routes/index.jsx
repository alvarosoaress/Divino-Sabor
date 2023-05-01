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
import FluxoDeCaixa from '../pages/Financeiro/FluxoDeCaixa';
import FluxoAdd from '../pages/Financeiro/FluxoAdd';
import Contato from '../pages/Contato';
import Cardapio from '../pages/Cardpaio';
import CardapioAdd from '../pages/Cardpaio/CardapioAdd';
import ProtectedRoute from './ProtectedRoute';
import Lista from '../pages/Lista';
import Delivery from '../pages/Delivery';
import PedidosSubmetidos from '../pages/Pedidos/PedidosSubmetidos';
import PedidosAtivos from '../pages/Pedidos/PedidosAtivos';
import PedidosCompletos from '../pages/Pedidos/PedidosCompletos';
import PedidosDetalhes from '../pages/Pedidos/PedidosDetalhes';
import Sobre from '../pages/Sobre';

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/recover" element={<Recover />} />
      <Route path="/contato" element={<Contato />} />
      <Route path="/delivery" element={<Delivery />} />
      <Route path="/sobre" element={<Sobre />} />

      <Route path="/cardapio" element={<ProtectedRoute />}>
        <Route path="/cardapio" element={<Cardapio />} />
        <Route path="/cardapio/add" element={<CardapioAdd />} />
      </Route>

      <Route path="/lista" element={<ProtectedRoute />}>
        <Route path="/lista" element={<Lista />} />
      </Route>

      <Route path="/financeiro" element={<PrivateRoute />}>
        <Route path="/financeiro" element={<FluxoDeCaixa />} />
        <Route path="/financeiro/caixa" element={<FluxoDeCaixa />} />
        <Route path="/financeiro/caixa/add" element={<FluxoAdd />} />
      </Route>

      <Route path="/pedidos" element={<PrivateRoute />}>
        <Route path="/pedidos" element={<Pedidos />} />
        <Route path="/pedidos/detalhes/:id" element={<PedidosDetalhes />} />
        <Route path="/pedidos/submetidos" element={<PedidosSubmetidos />} />
        <Route path="/pedidos/ativos" element={<PedidosAtivos />} />
        <Route path="/pedidos/completos" element={<PedidosCompletos />} />
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
