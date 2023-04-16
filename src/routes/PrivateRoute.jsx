import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthContext } from '../data/AuthProvider';
import { db } from '../services/firebase';
import { toast } from 'react-toastify';

// função para verificar qual o nível de permissão o usuário
// logado possuí
export default function PrivateRoute() {
  const { user } = useAuthContext();
  const [admin, setAdmin] = useState(null);

  // caso o usuário não esteja logado em nenhuma conta
  // redirecionar o usuário para a página de login
  if (!user) {
    return <Navigate to="/login" />;
  }

  useEffect(() => {
    // pegando o UID do user logado e fazendo uma
    // correlação com a fireStore para ver se o user
    // possui permissão de Admin
    async function getCollection() {
      try {
        if (user.uid) {
          const docRef = doc(db, 'users', user.uid);
          const docSnap = await getDoc(docRef);
          const isAdmin = docSnap.data().admin;
          setAdmin(isAdmin);
          isAdmin === undefined || null ? setAdmin(false) : '';
        }
      } catch (error) {
        console.log(error);
      }
    }
    getCollection();
  }, []);

  if (admin === null) {
    return null; //null para a página ter tempo de esperar a resposta
    // da verificação de admin
  }

  return admin ? (
    <Outlet />
  ) : (
    (toast.error('Você não tem permissão para visualizar essa página !'),
    (<Navigate to={'/login'} />))
  );
}
