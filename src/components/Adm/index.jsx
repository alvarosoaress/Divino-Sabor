import React from 'react';
import { FaPlus } from 'react-icons/fa';
import { AdmListAddText, AdmListItemName } from './styled.';
import { SecondaryDivider } from '../Utils/styled';
import { ButtonPrimary } from '../Button/styled';

export function AdmItemAdd({ display, text }) {
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
      <AdmListAddText>{text}</AdmListAddText>
    </a>
  );
}

export function AdmItemRow({ name }) {
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
        <AdmListItemName>{name}</AdmListItemName>
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
