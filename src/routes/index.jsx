import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Financeiro from '../pages/Financeiro';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/financeiro" element={<Financeiro />} />
    </Routes>
  );
}
