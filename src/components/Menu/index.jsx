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
      <MenuContainer>
        <MdKeyboardArrowRight
          size={40}
          onClick={() => setOpenMenu(!openMenu)}
          style={{
            // Passando estilos para o componente via JSX
            // Praticamente MediaQuery in-line 🙃
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
            width: window.screen.width >= 600 ? '0' : '100vw',
          }}
        >
          <SecondaryDivider width={'80%'} />
          <MenuText to={'/estoque'}>ESTOQUE</MenuText>

          <SecondaryDivider width={'80%'} />
          <MenuText to={'/pedidos'}>PEDIDOS</MenuText>

          <SecondaryDivider width={'80%'} />
          <MenuText to={'/clientes'}>CLIENTES</MenuText>

          <SecondaryDivider width={'80%'} />
          <MenuText to={'/financeiro'}>FINANCEIRO</MenuText>
          <SecondaryDivider width={'80%'} />

          <MenuText to={'/cardapio/add'}>CARDÁPIO</MenuText>
          <SecondaryDivider width={'80%'} />
        </MenuBox>
      </MenuContainer>
    </>
  );
}
