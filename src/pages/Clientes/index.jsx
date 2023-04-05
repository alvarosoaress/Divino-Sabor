import React from 'react';
import Header from '../../components/Header';
import Menu from '../../components/Menu';
import { FaSearch } from 'react-icons/fa';
import {
  AdmListBox,
  AdmListContainer,
  AdmListTable,
  AdmListTitleContainer,
  AdmSearchInput,
} from '../../components/Adm/styled.';
import { AdmItemAdd, AdmItemRow } from '../../components/Adm';

export default function Clientes() {
  const names = ['Alvaro', 'Matheus', 'Breno', 'Marta', 'Marcos', 'Jaime'];
  return (
    <>
      <Header
        style={true}
        auxText={window.screen.width >= 600 ? 'ADMINISTRATIVO' : 'ADMIN'}
      />
      <AdmListContainer>
        <Menu />

        <AdmListBox>
          <AdmListTitleContainer>
            <AdmItemAdd
              text={'Adicionar novo cliente'}
              display={window.screen.width >= 600 ? 'flex' : 'none'}
            />
            <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <AdmSearchInput />
              <FaSearch style={{ height: '40px' }} />
            </span>
          </AdmListTitleContainer>

          <AdmListTable>
            {names.map((name, index) => (
              <AdmItemRow name={name} key={index} />
            ))}
          </AdmListTable>

          <AdmItemAdd
            text={'Adicionar novo cliente'}
            display={window.screen.width < 600 ? 'flex' : 'none'}
          />
        </AdmListBox>
      </AdmListContainer>
    </>
  );
}
