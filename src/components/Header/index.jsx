import React from 'react';
import {
  HeaderContainer,
  LogoText,
  LogoTextAux,
  LogoTextContainer,
  Nav,
  NavBurguer,
  NavBurguerBackground,
  NavLinks,
  UserOptionLogout,
  UserOptionOrder,
  UserOptionsContainer,
} from './styled';
import { BiLogOut, BiMenuAltRight } from 'react-icons/bi';
import { useState } from 'react';
import { ButtonPrimary } from '../../components/Button/styled';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaRegUserCircle } from 'react-icons/fa';
import { RiFileList3Line } from 'react-icons/ri';
import { auth, db } from '../../services/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useAuthContext } from '../../data/AuthProvider';
import { signOut } from 'firebase/auth';
import { toast } from 'react-toastify';

export default function Header({ style, auxText }) {
  const { user } = useAuthContext();
  const [admin, setAdmin] = useState(false);

  const [openOptions, setOpenOptions] = useState(false);

  const [openBurger, setOpenBurger] = useState(false);
  // Verificando o state de openBurguer
  // Dependendo do state, a página será bloqueada o scroll
  useEffect(() => {
    openBurger
      ? (document.body.style.overflow = 'hidden')
      : (document.body.style.overflow = 'visible');
  }, [openBurger]);

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

  function logout() {
    signOut(auth)
      .then(() => {
        toast.success('Usuário desconectado!');
        location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <HeaderContainer>
      {/* Verificando style para mudar o estilo do header
        de acordo com a págoma sendo exibida
        caso esteja na parte administrativa, o style será true */}
      {style ? (
        <LogoTextContainer>
          <LogoText color="black" to={'/'}>
            Divino Sabor
          </LogoText>
          <LogoTextAux>{auxText ?? 'ACESSO'}</LogoTextAux>
        </LogoTextContainer>
      ) : (
        <LogoText to={'/'}>Divino Sabor</LogoText>
      )}
      <Nav>
        {admin ? (
          <li>
            <NavLinks as={Link} to={'/financeiro'}>
              Administrativo
            </NavLinks>
          </li>
        ) : (
          ''
        )}
        <li>
          <NavLinks to={'/cardapio'}>Cardápio</NavLinks>
        </li>
        <li>
          <NavLinks to={'/contato'}>Contato</NavLinks>
        </li>
        <li>
          <NavLinks href="#">Delivery</NavLinks>
        </li>
        <li>
          <NavLinks href="#">Sobre nós</NavLinks>
        </li>

        <Link
          to={user ? '' : '/login'}
          style={{ position: 'relative' }}
          onClick={() => (user ? setOpenOptions(!openOptions) : '')}
        >
          <FaRegUserCircle size={25} />
        </Link>
      </Nav>

      <UserOptionsContainer style={{ display: openOptions ? 'flex' : 'none' }}>
        <UserOptionOrder>
          <RiFileList3Line /> Lista
        </UserOptionOrder>
        <UserOptionLogout onClick={() => logout()}>
          <BiLogOut /> Logout
        </UserOptionLogout>
      </UserOptionsContainer>

      <NavBurguer>
        <BiMenuAltRight size={40} onClick={() => setOpenBurger(!openBurger)} />
        <NavBurguerBackground style={{ display: openBurger ? 'flex' : 'none' }}>
          <Link to={user ? '/' : '/login'}>
            <FaRegUserCircle size={25} />
          </Link>
          {admin ? (
            <li>
              <NavLinks as={Link} to={'/financeiro'}>
                Administrativo
              </NavLinks>
            </li>
          ) : (
            ''
          )}
          <li>
            <NavLinks href="#">Cardápio</NavLinks>
          </li>
          <li>
            <NavLinks href="#">Contato</NavLinks>
          </li>
          <li>
            <NavLinks href="#">Delivery</NavLinks>
          </li>
          <li>
            <NavLinks href="#">Sobre nós</NavLinks>
          </li>
          <li>
            <ButtonPrimary
              width="100px"
              onClick={() => setOpenBurger(!openBurger)}
            >
              Fechar
            </ButtonPrimary>
          </li>
        </NavBurguerBackground>
      </NavBurguer>
    </HeaderContainer>
  );
}
