import React from 'react';
import { CredentialsInput, CredentialsLabel } from './styled';
import validator from 'validator';

const handleTel = (ref) => {
  // Remove todos os caracteres não numéricos do valor do input
  const telValue = ref.current.value.replace(/\D/g, '');

  // Formata o valor do telefone com a máscara "(##) #####-####"
  let telefoneFormatado = '';

  // ifs para formatar o numero conforme o usuário digita
  if (telValue.length > 0) {
    telefoneFormatado = `(${telValue.slice(0, 2)}`;
  }

  if (telValue.length >= 3) {
    telefoneFormatado += `) ${telValue.slice(2, 7)}`;
  }

  if (telValue.length >= 8) {
    telefoneFormatado += `-${telValue.slice(7, 11)}`;
  }

  // atribuindo o novo valor modificado para o input de telefone
  ref.current.value = telefoneFormatado;
};

// Validar os campos de input
export function handleValidation(
  $email,
  $emailLabel,
  $password,
  $passwordLabel,
  $tel,
  $telLabel,
) {
  // chcecando cada input passado para verificar se ele existe
  if ($email) {
    let email = $email.current.value;
    validator.isEmail(email) // verificando se é email
      ? (($email.current.style.border = '2px solid green'),
        ($emailLabel.current.innerText = 'E-mail'))
      : (($email.current.style.border = '2px solid red'),
        ($emailLabel.current.innerText = 'E-mail | Insira um e-mail válido!'));
  }
  if ($password) {
    let password = $password.current.value.length;
    password < 6 // verificando se a senha é maior de 5 digitos
      ? (($password.current.style.border = '2px solid red'),
        ($passwordLabel.current.innerText =
          'Senha | Insira uma senha maior que 5 caracteres!'))
      : (($password.current.style.border = '2px solid green'),
        ($passwordLabel.current.innerText = 'Senha'));
  }

  if ($tel) {
    let tel = $tel.current.value.length;

    tel != 15 // verificando se o telefone tem 15 caracteres (o tanto que precisa depois de formatado)
      ? (($tel.current.style.border = '2px solid red'),
        ($telLabel.current.innerText = 'Telefone | Insira um telefone válido!'))
      : (($tel.current.style.border = '2px solid green'),
        ($telLabel.current.innerText = 'Telefone'));
  }
}

// epxortando cada input juntamente com seu label
// pedindo useRef como parametro para validação poder funcionar

export function Email({ $ref, $refLabel }) {
  return (
    <>
      <CredentialsLabel ref={$refLabel}>E-mail</CredentialsLabel>
      <CredentialsInput
        type="e-mail"
        name="email"
        id=""
        ref={$ref}
      ></CredentialsInput>
    </>
  );
}

export function Password({ $ref, $refLabel }) {
  return (
    <>
      <CredentialsLabel ref={$refLabel}>Senha</CredentialsLabel>
      <CredentialsInput
        type="password"
        name="password"
        id=""
        ref={$ref}
      ></CredentialsInput>
    </>
  );
}

export function Tel({ $ref, $refLabel }) {
  return (
    <>
      <CredentialsLabel ref={$refLabel}>Telefone</CredentialsLabel>
      <CredentialsInput
        type="tel"
        name="tel"
        id=""
        onKeyUp={() => handleTel($ref)}
        ref={$ref}
        maxLength={15}
        pattern="\([0-9]{2}\) [0-9]{5}\-[0-9]{4}" // regex foramatar como numero telefonico
        placeholder="(xx) xxxxx-xxxx"
        title="Telefone (xx) xxxxx-xxxx"
      ></CredentialsInput>
    </>
  );
}
