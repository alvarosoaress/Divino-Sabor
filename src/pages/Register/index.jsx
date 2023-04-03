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
import { Link, useNavigate } from 'react-router-dom';
import HeaderAlt from '../../components/HeaderAlt';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../services/firebase';
import { doc, collection, setDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import validator from 'validator';

export default function Register() {
  const $email = useRef(null);
  const $emailLabel = useRef(null);
  const $password = useRef(null);
  const $passwordLabel = useRef(null);
  const $tel = useRef(null);
  const $telLabel = useRef(null);

  const navigate = useNavigate();

  async function handleRegister(e) {
    e.preventDefault();

    let email = $email.current.value;
    let password = $password.current.value;
    let tel = $tel.current.value.replace(/[^\d]/g, '');

    if (
      validator.isEmpty($email.current.value) ||
      validator.isEmpty($password.current.value) ||
      validator.isEmpty($tel.current.value)
    ) {
      toast.error('Preencha todos os campos primeiro!.');
      return;
    }

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );

      const usersColletion = collection(db, '/', 'users');
      const usersDoc = doc(usersColletion, user.uid);
      await setDoc(usersDoc, { email, tel });
      navigate('/login');
      toast.success('Usuário criado com sucesso!');
    } catch (error) {
      if (error.code == 'auth/email-already-in-use') {
        toast.error('Email já vínculado à outra conta!');
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
          <CredentialsTitle>Cadastro</CredentialsTitle>
          <CredentialsForm
            onSubmit={(e) => handleRegister(e)}
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
              <ButtonSecondary type="submit">Cadastrar</ButtonSecondary>
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
