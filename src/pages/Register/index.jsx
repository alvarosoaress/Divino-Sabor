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
  Name,
  Password,
  Tel,
} from '../../components/Credentials';
import { Link, useNavigate } from 'react-router-dom';
import HeaderAlt from '../../components/HeaderAlt';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db } from '../../services/firebase';
import { doc, collection, setDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import validator from 'validator';
import { isEmpty } from '../../components/Utils';

export default function Register() {
  const $email = useRef(null);
  const $emailLabel = useRef(null);
  const $password = useRef(null);
  const $passwordLabel = useRef(null);
  const $tel = useRef(null);
  const $telLabel = useRef(null);
  const $name = useRef(null);
  const $nameLabel = useRef(null);

  const navigate = useNavigate();

  async function handleRegister(e) {
    e.preventDefault();

    let email = $email.current.value;
    let password = $password.current.value;
    let name = $name.current.value;
    let tel = $tel.current.value.replace(/[^\d]/g, '');

    if (
      isEmpty($email.current.value) ||
      isEmpty($password.current.value) ||
      isEmpty($name.current.value) ||
      isEmpty($tel.current.value) ||
      validator.isNumeric($tel.current.value)
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
      // criando referencia para a colleciton db na tabela users
      const usersColletion = collection(db, '/', 'users');
      // criando um doc apontando para a referencia e adicionando user UID
      const usersDoc = doc(usersColletion, user.uid);
      // atribuindo valores para o DOC e o enviando para a referencia
      // definindo type para cliente como padrão
      await setDoc(usersDoc, { name, email, tel, type: 'cliente' });
      updateProfile(user, { displayName: name });
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
            <Name $ref={$name} $refLabel={$nameLabel} />
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
