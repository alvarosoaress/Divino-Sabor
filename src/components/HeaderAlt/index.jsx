import React from 'react';
import {
  HeaderContainer,
  LogoText,
  LogoTextAux,
  LogoTextContainer,
} from '../Header/styled';

export default function HeaderAlt(props) {
  return (
    <HeaderContainer {...props} style={{ backgroundColor: 'transparent' }}>
      <LogoTextContainer>
        <LogoText color="black" to={'/'}>
          Divino Sabor
        </LogoText>
        <LogoTextAux>ACESSO</LogoTextAux>
      </LogoTextContainer>
    </HeaderContainer>
  );
}
