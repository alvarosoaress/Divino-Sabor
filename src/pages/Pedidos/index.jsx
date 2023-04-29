import React from 'react';
import Header from '../../components/Header';
import {
  Container,
  OptionsCard,
  OptionsContainer,
  OptionsText,
} from '../../components/OptionsBox/styled';
import Menu from '../../components/Menu';
import {
  PedidosIconCheck,
  PedidosIconPlus,
  PedidosIconRemove,
} from './pedidosIcons';

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
          <OptionsCard to={'/pedidos/submetidos'}>
            <PedidosIconPlus />
            <OptionsText>Submetidos</OptionsText>
          </OptionsCard>

          <OptionsCard>
            <PedidosIconCheck />
            <OptionsText>Ativos</OptionsText>
          </OptionsCard>

          <OptionsCard>
            <PedidosIconRemove />
            <OptionsText>Completos</OptionsText>
          </OptionsCard>
        </OptionsContainer>
      </Container>
    </>
  );
}
