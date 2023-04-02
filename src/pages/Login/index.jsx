import React, { useRef } from 'react';
import { ButtonPrimary, ButtonSecondary } from '../../components/Button/styled';
import {
  Email,
  handleValidation,
  Password,
} from '../../components/Credentials';
import { SecondaryDivider } from '../../components/Utils/styled';
import {
  Container,
  CredentialsContainer,
  CredentialsFooterText,
  CredentialsFooterContainer,
  CredentialsTitle,
  CredentialsForm,
  CredentialsText,
} from './styled';
import { Link } from 'react-router-dom';
import HeaderAlt from '../../components/HeaderAlt';

export default function Login() {
  const $email = useRef(null);
  const $emailLabel = useRef(null);
  const $password = useRef(null);
  const $passwordLabel = useRef(null);

  return (
    <>
      <HeaderAlt />
      <Container>
        <CredentialsContainer>
          <CredentialsTitle>Login</CredentialsTitle>
          <CredentialsForm
            action=""
            onChange={() =>
              // Função para validação de daodos dos inputs
              // Parametros useRefs sendo passados
              handleValidation($email, $emailLabel, $password, $passwordLabel)
            }
          >
            <Email $ref={$email} $refLabel={$emailLabel} />
            <Password $ref={$password} $refLabel={$passwordLabel} />
            <span
              style={{
                display: 'flex',
                flexDirection: 'row',
                gap: '15%',
                marginTop: '5%',
                width: '80%',
              }}
            >
              <ButtonPrimary as={Link} to="/register">
                Cadastrar
              </ButtonPrimary>
              <ButtonSecondary>Login</ButtonSecondary>
            </span>
            <CredentialsText to="/recover">Esqueci minha senha</CredentialsText>
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
