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
      // IF para verificar a existência de user.uid antes de fazer o get
      // super necessário para evitar o erro N IS UNDEFINED
      if (user && user.uid) {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        const isAdmin = docSnap.data().admin;
        setAdmin(isAdmin);
        isAdmin === undefined || null ? setAdmin(false) : '';
      }
    }
    getCollection();
  }, []);

  // função de LogOut
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
    <>
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
          {/* verificando se o user é admin
        se for aparecer a opção para menu admin */}
          {admin ? (
            <li>
              <NavLinks as={Link} to={'/estoque'}>
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
            <NavLinks to={'/delivery'}>Delivery</NavLinks>
          </li>
          <li>
            <NavLinks to={'/sobre'}>Sobre nós</NavLinks>
          </li>

          {/* verificando se o user está logado
        caso não esteja, quando clicar no menu de usuário
        será redirecionado para /login
        
        se estiver logado, irá aparecer o menu de opções */}
          <Link
            to={user ? '' : '/login'}
            style={{ position: 'relative' }}
            onClick={() => (user ? setOpenOptions(!openOptions) : '')}
          >
            <FaRegUserCircle size={25} />
          </Link>
        </Nav>

        {/* menu de opções de usuario
        ele existe apenas na visualização desktop
    no mobile ele está dentro do menu de opções comum */}
        <UserOptionsContainer
          style={{ display: openOptions ? 'flex' : 'none' }}
        >
          <UserOptionOrder to={'/lista'}>
            <RiFileList3Line /> Lista
          </UserOptionOrder>
          <UserOptionLogout onClick={() => logout()}>
            <BiLogOut /> Logout
          </UserOptionLogout>
        </UserOptionsContainer>

        <NavBurguer>
          <BiMenuAltRight
            size={40}
            onClick={() => setOpenBurger(!openBurger)}
          />
          <NavBurguerBackground
            style={{ display: openBurger ? 'flex' : 'none' }}
          >
            <Link
              to={'/login'}
              style={{ position: 'relative', display: user ? 'none' : 'block' }}
            >
              <FaRegUserCircle size={25} />
            </Link>
            {admin ? (
              <li>
                <NavLinks as={Link} to={'/estoque'}>
                  Administrativo
                </NavLinks>
              </li>
            ) : (
              ''
            )}
            {/* mostrar as opções de usuário apenas se ele estiver logado */}
            <UserOptionOrder
              to={'/lista'}
              style={{ display: user ? 'block' : 'none' }}
            >
              <RiFileList3Line /> Lista
            </UserOptionOrder>
            <li>
              <NavLinks to={'/cardapio'}>Cardápio</NavLinks>
            </li>
            <li>
              <NavLinks to={'/contato'}>Contato</NavLinks>
            </li>
            <li>
              <NavLinks to={'/delivery'}>Delivery</NavLinks>
            </li>
            <li>
              <NavLinks to={'/sobre'}>Sobre nós</NavLinks>
            </li>
            <UserOptionLogout
              onClick={() => logout()}
              style={{ display: user ? 'block' : 'none' }}
            >
              <BiLogOut /> Logout
            </UserOptionLogout>
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
    </>
  );
}
