import React, { useRef } from 'react';
import { ButtonPrimary } from '../../components/Button/styled';
import { Email, handleValidation } from '../../components/Credentials';
import { SecondaryDivider } from '../../components/Utils/styled';
import {
  Container,
  CredentialsContainer,
  CredentialsFooterText,
  CredentialsFooterContainer,
  CredentialsTitle,
  CredentialsForm,
} from '../Login/styled';
import HeaderAlt from '../../components/HeaderAlt';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../services/firebase';
import { toast } from 'react-toastify';
import validator from 'validator';

export default function Recover() {
  const $email = useRef(null);
  const $emailLabel = useRef(null);

  async function handleRecover(e) {
    e.preventDefault();

    let email = $email.current.value;

    if (validator.isEmpty($email.current.value)) {
      toast.error('Preencha o campo primeiro!.');
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      toast.success('Link para recuperação de senha enviado!');
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        toast.error('Email não cadastrado!');
      }
      if (error.code === 'auth/too-many-requests') {
        toast.error('Muitas tentativas incorretas, tente novamente mais tarde');
      }
    }
  }

  return (
    <>
      <HeaderAlt />
      <Container>
        <CredentialsContainer>
          <CredentialsTitle>Recuperação de Senha</CredentialsTitle>
          <CredentialsForm
            onSubmit={(e) => handleRecover(e)}
            action=""
            // Função para validação de daodos dos inputs
            // Parametros useRefs sendo passados
            onChange={() => handleValidation($email, $emailLabel)}
          >
            <Email $ref={$email} $refLabel={$emailLabel} />
            <span
              style={{
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'row',
                marginTop: '5%',
                width: '80%',
              }}
            >
              <ButtonPrimary type="submit">Recuperar Senha</ButtonPrimary>
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
