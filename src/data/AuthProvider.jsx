import React from 'react';
import { useEffect } from 'react';
import { createContext } from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import LoadingAnimation from '../components/LoadingAnimation';
import { auth } from '../services/firebase';

export const AuthContext = createContext({
  user: null,
  setUser: () => {},
});

export default function AuthProvider({ children }) {
  // iniciar user como vazio para que isso funcione na função de AuthProvider
  // caso deixar em "null", o AuthProvider vai passar primeiro o valor de null
  // ou seja, a função náo espera o await e já passa null
  // isso é um grande problema para o elemento PrivateRoute!
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const handleAuth = auth.onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        setIsLoading(false);
      } else {
        setUser(null);
        setIsLoading(false);
      }
    });

    return () => {
      handleAuth();
    };
  }, []);

  if (isLoading) {
    return <LoadingAnimation isLoading={isLoading} />;
  }

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => useContext(AuthContext);
