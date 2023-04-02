import React, { useRef } from 'react';
import { ButtonPrimary, ButtonSecondary } from '../../components/Button/styled';
import { SecondaryDivider } from '../../components/Utils/styled';
import {
  Container,
  CredentialsContainer,
  CredentialsFooterText,
  CredentialsFooterContainer,
  CredentialsTitle,
  CredentialsForm,
} from '../Login/styled';
import {
  Email,
  handleValidation,
  Password,
  Tel,
} from '../../components/Credentials';
import { Link } from 'react-router-dom';
import HeaderAlt from '../../components/HeaderAlt';

export default function Register() {
  const $email = useRef(null);
  const $emailLabel = useRef(null);
  const $password = useRef(null);
  const $passwordLabel = useRef(null);
  const $tel = useRef(null);
  const $telLabel = useRef(null);

  return (
    <>
      <HeaderAlt />
      <Container>
        <CredentialsContainer>
          <CredentialsTitle>Cadastro</CredentialsTitle>
          <CredentialsForm
            action=""
            // Função para validação de daodos dos inputs
            // Parametros useRefs sendo passados
            onChange={() =>
              handleValidation(
                $email,
                $emailLabel,
                $password,
                $passwordLabel,
                $tel,
                $telLabel,
              )
            }
          >
            <Email $ref={$email} $refLabel={$emailLabel} />
            <Password $ref={$password} $refLabel={$passwordLabel} />
            <Tel $ref={$tel} $refLabel={$telLabel} />
            <span
              style={{
                display: 'flex',
                flexDirection: 'row',
                gap: '15%',
                marginTop: '5%',
                width: '80%',
              }}
            >
              <ButtonPrimary as={Link} to="/login">
                Login
              </ButtonPrimary>
              <ButtonSecondary>Cadastrar</ButtonSecondary>
            </span>
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
