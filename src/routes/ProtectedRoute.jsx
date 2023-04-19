import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthContext } from '../data/AuthProvider';
import { toast } from 'react-toastify';

// função para verificar qual o nível de permissão o usuário
// logado possuí
export default function ProtectedRoute() {
  const { user } = useAuthContext();

  // caso o usuário não esteja logado em nenhuma conta
  // redirecionar o usuário para a página de login
  if (!user) {
    return <Navigate to="/login" />;
  }

  return user ? (
    <Outlet />
  ) : (
    (toast.error('Você precisa estar logado para visualizar essa página !'),
    (<Navigate to={'/login'} />))
  );
}
