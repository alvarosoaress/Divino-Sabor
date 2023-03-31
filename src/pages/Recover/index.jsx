import React, { useRef } from 'react';
import { ButtonPrimary } from '../../components/Button/styled';
import { Email, handleValidation, Tel } from '../../components/Credentials';
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
  CredentialsForm,
} from '../Login/styled';

export default function Recover() {
  const $email = useRef(null);
  const $emailLabel = useRef(null);
  const $tel = useRef(null);
  const $telLabel = useRef(null);
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
          <CredentialsTitle>Recuperação de Senha</CredentialsTitle>
          <CredentialsForm
            action=""
            // Função para validação de daodos dos inputs
            // Parametros useRefs sendo passados
            // null Sendo passado para pular chamadas não existentes nessa página
            onChange={() =>
              handleValidation($email, $emailLabel, null, null, $tel, $telLabel)
            }
          >
            <Email $ref={$email} $refLabel={$emailLabel} />
            <Tel $ref={$tel} $refLabel={$telLabel} />
            <span
              style={{
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'row',
                marginTop: '5%',
                width: '80%',
              }}
            >
              <ButtonPrimary>Recuperar Senha</ButtonPrimary>
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
