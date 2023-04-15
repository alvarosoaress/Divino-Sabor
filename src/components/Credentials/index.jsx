import React from 'react';
import { CredentialsInput, CredentialsLabel } from './styled';
import validator from 'validator';
import { formatTel } from '../Adm';

// Validar os campos de input
export function handleValidation(
  $email,
  $emailLabel,
  $password,
  $passwordLabel,
  $tel,
  $telLabel,
  $name,
  $nameLabel,
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
  if ($name) {
    let name = $name.current.value.length;
    name < 10 // verificando se o nome é maior de 10 digitos
      ? (($name.current.style.border = '2px solid red'),
        ($nameLabel.current.innerText =
          'Nome | Insira uma nome maior que 10 caracteres!'))
      : (($name.current.style.border = '2px solid green'),
        ($nameLabel.current.innerText = 'Nome'));
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

export function Email({
  $ref,
  $refLabel,
  labelColor,
  inputStyle,
  labelStyle,
  defaultValue,
}) {
  return (
    <>
      <CredentialsLabel color={labelColor} ref={$refLabel} style={labelStyle}>
        E-mail
      </CredentialsLabel>
      <CredentialsInput
        type="e-mail"
        name="email"
        id=""
        ref={$ref}
        style={inputStyle}
        defaultValue={defaultValue}
      ></CredentialsInput>
    </>
  );
}

export function Name({
  $ref,
  $refLabel,
  labelColor,
  inputStyle,
  labelStyle,
  defaultValue,
}) {
  return (
    <>
      <CredentialsLabel color={labelColor} ref={$refLabel} style={labelStyle}>
        Nome
      </CredentialsLabel>
      <CredentialsInput
        type="text"
        name="text"
        id=""
        maxLength={40}
        minLength={10}
        ref={$ref}
        style={inputStyle}
        defaultValue={defaultValue}
      ></CredentialsInput>
    </>
  );
}

export function Password({
  $ref,
  $refLabel,
  labelColor,
  inputStyle,
  labelStyle,
  defaultValue,
}) {
  return (
    <>
      <CredentialsLabel color={labelColor} ref={$refLabel} style={labelStyle}>
        Senha
      </CredentialsLabel>
      <CredentialsInput
        type="password"
        name="password"
        id=""
        ref={$ref}
        style={inputStyle}
        defaultValue={defaultValue}
      ></CredentialsInput>
    </>
  );
}

export function Tel({
  $ref,
  $refLabel,
  labelColor,
  inputStyle,
  labelStyle,
  defaultValue,
}) {
  return (
    <>
      <CredentialsLabel color={labelColor} ref={$refLabel} style={labelStyle}>
        Telefone
      </CredentialsLabel>
      <CredentialsInput
        type="tel"
        name="tel"
        id=""
        onChange={() => formatTel(null, $ref)}
        ref={$ref}
        maxLength={15}
        placeholder="(xx) xxxxx-xxxx"
        title="Telefone (xx) xxxxx-xxxx"
        style={inputStyle}
        defaultValue={defaultValue}
      ></CredentialsInput>
    </>
  );
}
