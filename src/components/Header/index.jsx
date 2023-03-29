import React from 'react';
import {
  HeaderContainer,
  Logo,
  Nav,
  NavBurguer,
  NavBurguerBackground,
  NavLinks,
  UserImg,
} from './styled';
import userImgPlaceholder from '../../assets/images/vitaodoidao.png';
import { BiMenuAltRight } from 'react-icons/bi';
import { useState } from 'react';
import { ButtonPrimary } from '../../components/Button/styled';
import { useEffect } from 'react';

export default function Header() {
  const [openBurger, setOpenBurger] = useState(false);
  useEffect(() => {
    openBurger
      ? (document.body.style.overflow = 'hidden')
      : (document.body.style.overflow = 'visible');
  }, [openBurger]);

  return (
    <HeaderContainer>
      <Logo>Divino Sabor</Logo>
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

        <a href="#">
          <UserImg
            width="50px"
            height="50px"
            src={userImgPlaceholder}
            alt="User Img"
          />
        </a>
      </Nav>
      <NavBurguer>
        <BiMenuAltRight size={40} onClick={() => setOpenBurger(!openBurger)} />
        <NavBurguerBackground style={{ display: openBurger ? 'flex' : 'none' }}>
          <a href="#">
            <UserImg
              width="50px"
              height="50px"
              src={userImgPlaceholder}
              alt="User Img"
            />
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
