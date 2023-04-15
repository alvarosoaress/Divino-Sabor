import React from 'react';
import { FaPlus } from 'react-icons/fa';
import { AdmAddText, AdmListAddText, AdmListItemName } from './styled.';
import { SecondaryDivider } from '../Utils/styled';
import { ButtonPrimary } from '../Button/styled';
import { Link } from 'react-router-dom';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../services/firebase';

export function AdmItemAdd({ display, text, link }) {
  return (
    <AdmAddText to={link} display={display}>
      <FaPlus />
      <AdmListAddText>{text}</AdmListAddText>
    </AdmAddText>
  );
}

export function AdmItemRow({ name, uid, index, setState, setUser }) {
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
            setUser({ name, uid, index });
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
}

export const formatTel = (tel, $ref) => {
  // Formata o valor do telefone com a máscara "(##) #####-####"
  let telefoneFormatado = '';

  if ($ref) tel = $ref.current.value.replace(/\D/g, '');

  // ifs para formatar o numero conforme o usuário digita
  if (tel.length > 0) {
    telefoneFormatado = `(${tel.slice(0, 2)}`;
  }

  if (tel.length >= 3) {
    telefoneFormatado += `) ${tel.slice(2, 7)}`;
  }

  if (tel.length >= 8) {
    telefoneFormatado += `-${tel.slice(7, 11)}`;
  }

  // atribuindo o novo valor modificado para o input de telefone
  if ($ref) $ref.current.value = telefoneFormatado;
  return telefoneFormatado;
};

export function handleCurrency(value, $ref) {
  // Intl para formatar para BRL o preço
  let BRreal = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  });

  // formatando o input de preço dentro da variável value
  if (value) {
    // formatar valor em moeda BRL
    return BRreal.format(value);
  }

  // formatando o input de preço dentro do useRef
  const currencyValue = $ref.current.value.replace(/\D/g, '');
  // verificar se é um número válido
  if (!isNaN(currencyValue / 100)) {
    // formatar valor em moeda BRL
    $ref.current.value = BRreal.format(currencyValue / 100);
  } else {
    // definir valor como vazio
    $ref.current.value = '';
  }
}

export async function productHistory(productId, arraySetState) {
  const docRef = collection(db, 'history');

  const queryProduct = query(docRef, where('produto', '==', productId));

  try {
    const data = await getDocs(queryProduct);
    // data retorna uma response com muitos parametros
    // clean data para pegar apenas os dados importantes
    const cleanData = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    // atribuindo a response para users e newUsers
    // isso auxilia na hora do search
    arraySetState(cleanData);
  } catch (error) {
    console.error(error);
  }
}

export function formattedDate(seconds) {
  let myDate = new Date(seconds * 1000);
  const options = {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
  };

  return myDate.toLocaleDateString('pt-BR', options);
}
