import React from 'react';
import { HeaderContainer, Logo, Nav, NavLinks, UserImg } from './styled';

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
            src="../../../src/assets/images/vitaodoidao.png"
            alt="User Img"
          />
        </a>
      </Nav>
    </HeaderContainer>
  );
}
