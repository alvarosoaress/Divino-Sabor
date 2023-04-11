import React from 'react';
import { SecondaryDivider } from '../../components/Utils/styled';
import { ButtonPrimary } from '../../components/Button/styled';
import { ProductQuantity } from './styled';
import Header from '../../components/Header';
import Menu from '../../components/Menu';
import { FaSearch } from 'react-icons/fa';
import {
  AdmListBox,
  AdmListContainer,
  AdmListItemName,
  AdmListTable,
  AdmListTitleContainer,
  AdmSearchInput,
} from '../../components/Adm/styled.';
import { AdmItemAdd } from '../../components/Adm';

/// const queryProductType = query(
//   productCollection,
//   where('type', '==', 'doce'),
// );

// import { collection, query, where } from 'firebase/firestore'
//
// const queryConstraints = []
// if (group != null) queryConstraints.push(where('group', '==', group))
// if (pro != null) queryConstraints.push(where('pro', '==', pro))
// const q = query(collection(db, 'videos'), ...queryConstraints)
//

function ProductRow({ name, quantity }) {
  return (
    <span>
      <SecondaryDivider />
      <span
        style={{
          display: 'grid',
          width: '100%',
          gridTemplateColumns: '1fr 1fr 0.5fr 0.5fr',
          columnGap: '5px',
          marginBlock: '5px',
        }}
      >
        <AdmListItemName>{name}</AdmListItemName>
        <ProductQuantity>Qtd: {quantity}</ProductQuantity>
        <ButtonPrimary
          width="150px"
          fontSize="12px"
          fontHover="16px"
          mediaQuery="800px"
          mediaQueryWidth="65px"
        >
          Editar
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

export default function Estoque() {
  const names = [
    'Laranja',
    'Chocolate Barra',
    'Morango',
    'Leite Condenado',
    'Marcos',
    'Jaime',
  ];
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
              text={'Adicionar novo produto'}
              display={window.screen.width >= 600 ? 'flex' : 'none'}
            />
            <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <AdmSearchInput />
              <FaSearch style={{ height: '40px' }} />
            </span>
          </AdmListTitleContainer>

          <AdmListTable>
            {names.map((name, index) => (
              <ProductRow name={name} key={index} />
            ))}
          </AdmListTable>

          <AdmItemAdd
            text={'Adicionar novo produto'}
            display={window.screen.width < 600 ? 'flex' : 'none'}
          />
        </AdmListBox>
      </AdmListContainer>
    </>
  );
}
