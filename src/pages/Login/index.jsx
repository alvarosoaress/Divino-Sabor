import React from 'react';
import { ButtonPrimary, ButtonSecondary } from '../../components/Button/styled';
import {
  LogoText,
  LogoTextAux,
  LogoTextContainer,
} from '../../components/Header/styled';
import { SecondaryDivider } from '../../components/Utils/styled';
import {
  Container,
  HeaderContainer,
  CredentialsContainer,
  CredentialsFooterText,
  CredentialsFooterContainer,
  CredentialsTitle,
  CredentialsInput,
  CredentialsForm,
  CredentialsLabel,
  CredentialsText,
} from './styled';

export default function Login() {
  return (
    <>
      <HeaderContainer>
        <LogoTextContainer>
          <LogoText color="black">Divino Sabor</LogoText>
          <LogoTextAux>ACESSO</LogoTextAux>
        </LogoTextContainer>
      </HeaderContainer>
      <Container>
        <CredentialsContainer>
          <CredentialsTitle>Login</CredentialsTitle>
          <CredentialsForm action="">
            <CredentialsLabel>E-mail</CredentialsLabel>
            <CredentialsInput
              type="e-mail"
              name="e-mail"
              id=""
            ></CredentialsInput>
            <CredentialsLabel>Senha</CredentialsLabel>
            <CredentialsInput
              type="password"
              name="password"
              id=""
            ></CredentialsInput>
            <span
              style={{
                display: 'flex',
                flexDirection: 'row',
                gap: '15%',
                marginTop: '5%',
                width: '80%',
              }}
            >
              <ButtonPrimary>Cadastrar</ButtonPrimary>
              <ButtonSecondary>Login</ButtonSecondary>
            </span>
            <CredentialsText to="#">Esqueci minha senha</CredentialsText>
          </CredentialsForm>
        </CredentialsContainer>
      </Container>
      <CredentialsFooterContainer>
        <SecondaryDivider width="60%" />
        <CredentialsFooterText>Celebre Conosco!</CredentialsFooterText>
      </CredentialsFooterContainer>
    </>
  );
}
