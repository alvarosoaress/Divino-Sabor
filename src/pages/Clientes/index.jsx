import React from 'react';
import Header from '../../components/Header';
import { Container } from '../../components/OptionsBox/styled';
import Menu from '../../components/Menu';
import {
  CostumersAddText,
  CostumersContainer,
  CostumersName,
  CostumersSearchInput,
  CostumersTable,
  CostumersTitleContainer,
} from './styled';
import { FaPlus, FaSearch } from 'react-icons/fa';
import { SecondaryDivider } from '../../components/Utils/styled';
import { ButtonPrimary } from '../../components/Button/styled';

function CostumersRow({ name }) {
  return (
    <span>
      <SecondaryDivider />
      <span
        style={{
          display: 'grid',
          width: '100%',
          gridTemplateColumns: '2fr 0.5fr 0.5fr',
          columnGap: '5px',
          marginBlock: '5px',
        }}
      >
        <CostumersName>{name}</CostumersName>
        <ButtonPrimary
          width="150px"
          fontSize="12px"
          fontHover="16px"
          mediaQuery="800px"
          mediaQueryWidth="65px"
        >
          {window.screen.width >= 600 ? 'Editar/Visualizar' : 'Editar'}
        </ButtonPrimary>
        <ButtonPrimary
          width="150px"
          fontSize="12px"
          fontHover="16px"
          mediaQuery="800px"
          mediaQueryWidth="65px"
        >
          Excluir
        </ButtonPrimary>
      </span>
      <SecondaryDivider />
    </span>
  );
}

function CostumerAdd({ display }) {
  return (
    <a
      href="#"
      style={{
        display: display,
        alignItems: 'center',
        gap: '5px',
        marginTop: '5%',
      }}
    >
      <FaPlus />
      <CostumersAddText>Adiconar um novo cliente</CostumersAddText>
    </a>
  );
}

export default function Clientes() {
  const names = ['Alvaro', 'Matheus', 'Breno', 'Marta', 'Marcos', 'Jaime'];
  return (
    <>
      <Header
        style={true}
        auxText={window.screen.width >= 600 ? 'ADMINISTRATIVO' : 'ADMIN'}
      />
      <Container>
        <Menu />

        <CostumersContainer>
          <CostumersTitleContainer>
            <CostumerAdd
              display={window.screen.width >= 600 ? 'flex' : 'none'}
            />
            <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <CostumersSearchInput />
              <FaSearch style={{ height: '40px' }} />
            </span>
          </CostumersTitleContainer>

          <CostumersTable>
            {names.map((name, index) => (
              <CostumersRow name={name} key={index} />
            ))}
          </CostumersTable>

          <CostumerAdd display={window.screen.width < 600 ? 'flex' : 'none'} />
        </CostumersContainer>
      </Container>
    </>
  );
}
