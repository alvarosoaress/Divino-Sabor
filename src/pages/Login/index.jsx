import React, { useRef } from 'react';
import { ButtonPrimary } from '../../components/Button/styled';
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
import { useNavigate } from 'react-router-dom';
import HeaderAlt from '../../components/HeaderAlt';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../services/firebase';
import { toast } from 'react-toastify';
import { isEmpty } from '../../components/Utils';

export default function Login() {
  const $email = useRef(null);
  const $emailLabel = useRef(null);
  const $password = useRef(null);
  const $passwordLabel = useRef(null);

  const navigate = useNavigate();

  async function handeLogin(e) {
    e.preventDefault();

    let email = $email.current.value;
    let password = $password.current.value;

    if (isEmpty($email.current.value) || isEmpty($password.current.value)) {
      toast.error('Preencha todos os campos primeiro!.');
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
      toast.success('Login realizado com sucesso!');
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        toast.error('Usuário não encontrado!.');
        return;
      }

      if (error.code === 'auth/wrong-password') {
        toast.error('Email e/ou Senha incorreto(s).');
        return;
      }

      if (error.code === 'auth/too-many-requests') {
        toast.error(
          'Muitas tentativas incorretas, tente novamente mais tarde ou recupere sua senha',
        );
        return;
      }
    }
  }

  return (
    <>
      <HeaderAlt />
      <Container>
        <CredentialsContainer height={'550px'} width={'450px'}>
          <CredentialsTitle>Login</CredentialsTitle>
          <CredentialsForm
            onSubmit={(e) => handeLogin(e)}
            action=""
            onChange={() =>
              // Função para validação de daodos dos inputs
              // Parametros useRefs sendo passados
              handleValidation($email, $emailLabel, $password, $passwordLabel)
            }
          >
            <Email $ref={$email} $refLabel={$emailLabel} />
            <Password $ref={$password} $refLabel={$passwordLabel} />

            <ButtonPrimary type="submit" style={{ marginBlock: '5%' }}>
              Login
            </ButtonPrimary>
            <CredentialsText to="/recover">Esqueci minha senha</CredentialsText>

            <CredentialsText to="/register" style={{ marginTop: '10%' }}>
              Novo por aqui?{' '}
              <text style={{ textDecoration: 'underline' }}>Cadastre-se</text>
            </CredentialsText>
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
