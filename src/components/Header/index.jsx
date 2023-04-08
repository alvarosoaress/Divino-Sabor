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
  UserImg,
} from './styled';
import { BiMenuAltRight } from 'react-icons/bi';
import { useState } from 'react';
import { ButtonPrimary } from '../../components/Button/styled';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaRegUserCircle } from 'react-icons/fa';

export default function Header({ style, auxText }) {
  const [openBurger, setOpenBurger] = useState(false);
  // Verificando o state de openBurguer
  // Dependendo do state, a página será bloqueada o scroll
  useEffect(() => {
    openBurger
      ? (document.body.style.overflow = 'hidden')
      : (document.body.style.overflow = 'visible');
  }, [openBurger]);

  return (
    <HeaderContainer>
      {/* Verificando style para mudar o estilo do header
        de acordo com a págoma sendo exibida
        caso esteja na parte administrativa, o style será true */}
      {style ? (
        <LogoTextContainer>
          <LogoText color="black">Divino Sabor</LogoText>
          <LogoTextAux>{auxText ?? 'ACESSO'}</LogoTextAux>
        </LogoTextContainer>
      ) : (
        <LogoText>Divino Sabor</LogoText>
      )}
      <Nav>
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

        <Link to="/login">
          {/* // A FAZER
            // COLOCAR IMAGENS DE USUÁRIOS */}
          <FaRegUserCircle size={25} />
          {/* <UserImg
            width="50px"
            height="50px"
            src={userImgPlaceholder}
            alt="User Img"
          /> */}
        </Link>
      </Nav>
      <NavBurguer>
        <BiMenuAltRight size={40} onClick={() => setOpenBurger(!openBurger)} />
        <NavBurguerBackground style={{ display: openBurger ? 'flex' : 'none' }}>
          <a href="#">
            <UserImg width="50px" height="50px" alt="User Img" />
          </a>
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