import React from 'react';
import Header from '../../components/Header';
import {
  Container,
  OptionsCard,
  OptionsContainer,
  OptionsText,
} from '../../components/OptionsBox/styled';
import { LucrosIcon, NotaIcon, ContratoIcon } from './financeiroIcons';
import Menu from '../../components/Menu';

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
          <OptionsCard to={'caixa'}>
            <LucrosIcon />
            <OptionsText>Fluxo de caixa</OptionsText>
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
