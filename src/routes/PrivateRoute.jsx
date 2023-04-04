import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthContext } from '../data/AuthProvider';
import { db } from '../services/firebase';

export default function PrivateRoute() {
  const { user } = useAuthContext();
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    async function getCollection() {
      const docRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(docRef);
      const isAdmin = docSnap.data().admin;
      setAdmin(isAdmin);
      isAdmin === undefined || null ? setAdmin(false) : '';
    }
    getCollection();
  }, []);

  if (admin === null) {
    return null; // ou uma tela de carregamento, por exemplo
  }

  return admin ? <Outlet /> : <Navigate to={'/login'} />;
}
