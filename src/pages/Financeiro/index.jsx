import React from 'react';
import Header from '../../components/Header';
import {
  Container,
  OptionsCard,
  OptionsContainer,
  OptionsText,
} from '../../components/OptionsBox/styled';
import {
  GastosIcon,
  LucrosIcon,
  NotaIcon,
  ContratoIcon,
} from './financeiroIcons';
import Menu from '../../components/Sidemenu';

export default function Financeiro() {
  return (
    <>
      <Header
        style={true}
        auxText={window.screen.width >= 800 ? 'ADMINISTRATIVO' : 'ADMIN'}
      />
      <Container>
        <Menu />
        <OptionsContainer>
          <OptionsCard>
            <GastosIcon />
            <OptionsText>Gastos</OptionsText>
          </OptionsCard>

          <OptionsCard>
            <LucrosIcon />
            <OptionsText>Lucros</OptionsText>
          </OptionsCard>

          <OptionsCard>
            <ContratoIcon />
            <OptionsText>Emitir contrato</OptionsText>
          </OptionsCard>

          <OptionsCard>
            <NotaIcon />
            <OptionsText>
              {window.screen.width >= 800
                ? 'Emitir Nota Fiscal'
                : 'Nota Fiscal'}
            </OptionsText>
          </OptionsCard>
        </OptionsContainer>
      </Container>
    </>
  );
}
