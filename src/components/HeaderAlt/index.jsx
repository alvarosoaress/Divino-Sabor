import React from 'react';
import {
  HeaderContainer,
  LogoText,
  LogoTextAux,
  LogoTextContainer,
} from '../Header/styled';

export default function HeaderAlt() {
  return (
    <HeaderContainer>
      <LogoTextContainer>
        <LogoText color="black">Divino Sabor</LogoText>
        <LogoTextAux>ACESSO</LogoTextAux>
      </LogoTextContainer>
    </HeaderContainer>
  );
}
