import React from 'react';
import { FaPlus } from 'react-icons/fa';
import { AdmAddText, AdmListAddText, AdmListItemName } from './styled.';
import { SecondaryDivider } from '../Utils/styled';
import { ButtonPrimary } from '../Button/styled';
import { Link } from 'react-router-dom';

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

  if ($ref) {
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
}

export function formattedDate(data, string) {
  let myDate;
  string
    ? ((myDate = new Date(data)),
      myDate.setMinutes(myDate.getMinutes() + myDate.getTimezoneOffset()))
    : (myDate = new Date(data * 1000));

  const options = {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
  };

  return myDate.toLocaleDateString('pt-BR', options);
}

export function PercentageIcon({ percentage }) {
  return (
    <svg
      width="45"
      height="30"
      viewBox="0 0 526 470"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient
          // atribuindo percentage ao id pora cada figura ter um id diferente
          // caso seja o msm id todas irão ficar com o mesmo tanto de verde
          id={`${percentage}gradient`}
          x1="0%"
          y1="0%"
          x2="0%"
          y2={`${100 - percentage}%`}
        >
          <stop offset={'100%'} stopColor="#FF5733" />
          <stop offset={'100%'} stopColor="#FF5733" />
          <stop offset={'100%'} stopColor="#00DE71" />
          <stop offset={'100%'} stopColor="#00DE71" />
        </linearGradient>
      </defs>
      <path
        d="M287.509 0.000916921C277.442 0.0375789 268.579 4.70832 263.345 11.7942L263.278 11.889C257.943 4.76881 249.085 0.156273 239.047 0.156273C222.947 0.156273 209.885 12.0201 209.788 26.6886C209.788 66.5246 263.279 79.881 263.279 79.881C263.279 79.881 316.768 66.5319 316.768 26.6964C316.768 11.9523 303.669 0.000916921 287.509 0.000916921ZM525.699 469.275H0.857422V448.419H525.699V469.275ZM55.0325 308.679H471.523V469.275H55.0325V308.679ZM448.665 329.536H77.8924V448.417H448.665V329.536ZM120.638 189.171H405.919V329.744H120.638V189.171ZM383.059 210.027H143.498V308.888H383.059V210.027ZM186.244 109.289H340.313V210.027H186.244L186.244 109.289ZM317.454 130.146H209.102V189.17H317.455L317.454 130.146ZM162.241 401.303C160.534 401.303 158.812 401.261 157.075 401.178C122.436 399.58 92.6869 381.897 76.4534 356.207L76.1993 355.773L56.5403 324.259L76.4052 313.935L96.0641 345.428C109.429 366.492 134.011 380.437 162.163 380.437C187.585 380.437 210.095 369.067 223.92 351.597L224.073 351.393L253.996 313.037L272.625 325.134L242.703 363.531C224.616 386.511 195.412 401.302 162.42 401.302L162.241 401.303ZM364.315 401.303H364.175C331.196 401.303 302.003 386.52 284.12 363.821L283.919 363.552L253.974 325.155L272.604 313.059L302.55 351.435C316.53 369.099 339.033 380.461 364.445 380.461C392.607 380.461 417.198 366.506 430.364 345.763L430.559 345.429L450.218 313.957L470.083 324.281L450.424 355.774C433.932 381.905 404.173 399.589 369.76 401.171L369.526 401.179C367.773 401.263 366.037 401.303 364.315 401.303ZM143.496 199.599H120.638V159.554H143.496V199.599ZM77.8914 319.108H55.033V279.271H77.8914V319.108ZM405.918 199.599H383.059V159.554H405.918V199.599ZM471.523 319.108H448.665V279.271H471.523V319.108ZM318.368 319.108H295.508V279.271H318.367L318.368 319.108ZM231.046 319.108H208.188V279.271H231.046V319.108ZM274.707 119.718H251.848V59.8595H274.707V119.718Z"
        fill={`url(#${percentage}gradient)`}
      />
    </svg>
  );
}
