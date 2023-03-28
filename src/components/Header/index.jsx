import React from 'react';
import { HeaderContainer, Logo, Nav, NavLinks, UserImg } from './styled';
import userImgPlaceholder from '../../assets/images/vitaodoidao.png';

export default function Header() {
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
    </HeaderContainer>
  );
}
