import React, { useState } from 'react';
import { SecondaryDivider } from '../Utils/styled';
import { MenuBox, MenuContainer, MenuText } from './styled';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { MdKeyboardArrowLeft } from 'react-icons/md';

export default function Menu({ showMenu }) {
  // State para verificar se o menu lateral está aberto
  const [openMenu, setOpenMenu] = useState(showMenu ?? true);

  return (
    <>
      <MenuContainer>
        <MdKeyboardArrowRight
          size={40}
          onClick={() => setOpenMenu(!openMenu)}
          style={{
            // Passando estilos para o componente via JSX
            // Praticamente MediaQuery in-line 🙃
            display: openMenu ? 'none' : 'flex',
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
          // verificação de menu para fechar ele em certas paginas
          style={{
            display:
              window.screen.width <= 600 // se for mobile é fechado por padrão
                ? !openMenu // sendo controlado sua visibilidade pelo openMenu state
                  ? 'flex'
                  : 'none'
                : openMenu // se for widescreen é aberto por padrão
                ? 'flex' // sendo controlado sua visibilidade pelo openMenu state
                : 'none',
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
