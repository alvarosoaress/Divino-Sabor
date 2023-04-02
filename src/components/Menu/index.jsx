import React, { useState } from 'react';
import { SecondaryDivider } from '../Utils/styled';
import { MenuBox, MenuContainer, MenuText } from './styled';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { MdKeyboardArrowLeft } from 'react-icons/md';

export default function Menu() {
  // State para verificar se o menu lateral está aberto
  const [openMenu, setOpenMenu] = useState(false);
  return (
    <>
      <MenuContainer
        // Passando estilos para o componente via JSX
        // Praticamente MediaQuery in-line 🙃
        style={{
          width: openMenu || window.screen.width >= 600 ? '370px' : '35px',
        }}
      >
        <MdKeyboardArrowRight
          size={40}
          onClick={() => setOpenMenu(!openMenu)}
          style={{
            display: openMenu || window.screen.width >= 600 ? 'none' : 'flex',
          }}
        />
        <MdKeyboardArrowLeft
          size={40}
          onClick={() => setOpenMenu(!openMenu)}
          style={{
            display: openMenu ? 'flex' : 'none',
          }}
        />
        <MenuBox
          style={{
            display: openMenu || window.screen.width >= 600 ? 'flex' : 'none',
            width: openMenu || window.screen.width >= 600 ? '370px' : '35px',
          }}
        >
          <SecondaryDivider />
          <MenuText>ESTOQUE</MenuText>

          <SecondaryDivider />
          <MenuText>PEDIDOS</MenuText>

          <SecondaryDivider />
          <MenuText>CLIENTES</MenuText>

          <SecondaryDivider />
          <MenuText>FINANCEIRO</MenuText>
          <SecondaryDivider />
        </MenuBox>
      </MenuContainer>
    </>
  );
}
