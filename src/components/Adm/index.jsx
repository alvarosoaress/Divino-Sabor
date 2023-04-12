import React from 'react';
import { FaPlus } from 'react-icons/fa';
import { AdmListAddText, AdmListItemName } from './styled.';
import { SecondaryDivider } from '../Utils/styled';
import { ButtonPrimary } from '../Button/styled';
import { Link } from 'react-router-dom';

export function AdmItemAdd({ display, text, link }) {
  return (
    <Link
      to={link}
      style={{
        display: display,
        alignItems: 'center',
        gap: '5px',
        marginTop: '5%',
      }}
    >
      <FaPlus />
      <AdmListAddText>{text}</AdmListAddText>
    </Link>
  );
}

export function AdmItemRow({ name, uid, key, setState, setUser }) {
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
          fontzize="12px"
          fonthover="16px"
          mediaquery="800px"
          mediaquerywidth="65px"
          as={Link}
          to={`/clientes/edit/${uid}`}
        >
          Editar
        </ButtonPrimary>
        <ButtonPrimary
          width="150px"
          fontzize="12px"
          fonthover="16px"
          mediaquery="800px"
          mediaquerywidth="65px"
          onClick={() => {
            setState(true);
            setUser({ name, uid, index: key });
          }}
        >
          Excluir
        </ButtonPrimary>
      </span>
      <SecondaryDivider />
    </span>
  );
}

export function handleProductValidation(
  $name,
  $nameLabel,
  //   $category,
  //   $categoryLabel,
) {
  if ($name) {
    let name = $name.current.value.length;
    name < 3 // verificando se o nome é maior de 3 digitos
      ? (($name.current.style.border = '2px solid red'),
        ($nameLabel.current.innerText =
          'Nome | Insira uma nome maior que 3 caracteres!'))
      : (($name.current.style.border = '2px solid green'),
        ($nameLabel.current.innerText = 'Nome'));
  }

  //   if ($category) {
  //     let category = $category.current.checked;
  //     console.log(category);
  //     !category // verificando se a checkbox tem ao menos uma opção marcada
  //       ? (($category.current.style.border = '2px solid red'),
  //         ($categoryLabel.current.innerText = 'Marque ao menos uma categoria!'))
  //       : (($category.current.style.border = '2px solid green'),
  //         ($categoryLabel.current.innerText = ''));
  //   }
}
