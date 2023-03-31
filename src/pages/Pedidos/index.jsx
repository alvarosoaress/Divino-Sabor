import React from 'react';
import Header from '../../components/Header';
import {
  Container,
  OptionsCard,
  OptionsContainer,
  OptionsText,
} from '../../components/OptionsBox/styled';
import Menu from '../../components/SideMenu';
import PedidosIcon from './pedidosIcons';

export default function Pedidos() {
  return (
    <>
      <Header
        style={true}
        auxText={window.screen.width >= 800 ? 'ADMINISTRATIVO' : 'ADMIN'}
      />
      <Container>
        <Menu />
        <OptionsContainer style={{ alignItems: 'center' }}>
          <OptionsCard>
            <PedidosIcon />
            <OptionsText>Submetidos</OptionsText>
          </OptionsCard>

          <OptionsCard>
            <PedidosIcon />
            <OptionsText>Ativos</OptionsText>
          </OptionsCard>

          <OptionsCard>
            <PedidosIcon />
            <OptionsText>Desistências</OptionsText>
          </OptionsCard>
        </OptionsContainer>
      </Container>
    </>
  );
}
