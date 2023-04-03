import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthContext } from '../data/AuthProvider';

export default function PrivateRoute({ open }) {
  const { user } = useAuthContext();

  if (open) return <Outlet />;

  return user === null ? <Navigate to={'/login'} /> : <Outlet />;
}
