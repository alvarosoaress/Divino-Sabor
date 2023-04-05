import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthContext } from '../data/AuthProvider';
import { db } from '../services/firebase';

// função para verificar qual o nível de permissão o usuário
// logado possuí
export default function PrivateRoute() {
  const { user } = useAuthContext();
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    // pegando o UID do user logado e fazendo uma
    // correlação com a fireStore para ver se o user
    // possui permissão de Admin
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
    return null; //null para a página ter tempo de esperar a resposta
    // da verificação de admin
  }

  return admin ? <Outlet /> : <Navigate to={'/login'} />;
}
