import React, { useRef } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

import { useEffect } from 'react';
import { useState } from 'react';
import Header from '../../../components/Header';
import Menu from '../../../components/Menu';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../../../services/firebase';
import {
  Email,
  Name,
  Tel,
  handleValidation,
} from '../../../components/Credentials';
import { CredentialsForm } from '../../Login/styled';
import { toast } from 'react-toastify';
import validator from 'validator';
import { ClientEditBox, ClientEditContainer, ClientEditTilte } from './styled';
import { useTheme } from 'styled-components';
import { ButtonPrimary } from '../../../components/Button/styled';

export default function ClientesEdit() {
  // pegando o UID presente na URL da página
  const { id } = useParams();
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  const userRef = doc(db, 'users', id);

  const $email = useRef(null);
  const $emailLabel = useRef(null);
  const $name = useRef(null);
  const $nameLabel = useRef(null);
  const $tel = useRef(null);
  const $telLabel = useRef(null);

  const theme = useTheme();
  // pegando aos dados do usuário que possui o uid da url
  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await getDoc(userRef);
        const cleanData = response.data();
        setUser(cleanData);
      } catch (error) {
        console.error(error);
      }
    };
    getUser();
  }, []);

  // declarando função assíncrona para edição do usuário
  const handleEdit = async (e) => {
    e.preventDefault();

    let email = $email.current.value;
    let name = $name.current.value;
    let tel = $tel.current.value.replace(/[^\d]/g, '');

    if (
      validator.isEmpty($name.current.value) ||
      validator.isEmpty($email.current.value) ||
      validator.isEmpty($tel.current.value)
    ) {
      toast.error('Preencha todos os campos primeiro!.');
      return;
    }

    try {
      // dando Update nos dados do usuário
      // passando os argumentos sem chave
      // pois no fireStore eles possuem o mesmo nome
      await updateDoc(userRef, { email, name, tel });
      navigate('/clientes');
      toast.success('Cliente editado com sucesso!');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header
        style={true}
        auxText={window.screen.width >= 600 ? 'ADMINISTRATIVO' : 'ADMIN'}
      />
      <ClientEditContainer>
        <Menu />
        <ClientEditBox>
          <ClientEditTilte>Editar Cliente</ClientEditTilte>
          <CredentialsForm
            onSubmit={(e) => handleEdit(e)}
            action=""
            style={{ height: 'auto' }}
            onChange={() =>
              // Função para validação de daodos dos inputs
              // Parametros useRefs sendo passados
              handleValidation(
                $email,
                $emailLabel,
                null,
                null,
                $tel,
                $telLabel,
                $name,
                $nameLabel,
              )
            }
          >
            <Name
              $ref={$name}
              $refLabel={$nameLabel}
              labelColor={theme.textColor}
              inputStyle={{ margin: '0px', backgroundColor: theme.auxColor }}
              defaultValue={user.name}
            />
            <Email
              $ref={$email}
              $refLabel={$emailLabel}
              labelColor={theme.textColor}
              inputStyle={{ margin: '0px', backgroundColor: theme.auxColor }}
              defaultValue={user.email}
            />
            <Tel
              $ref={$tel}
              $refLabel={$telLabel}
              labelColor={theme.textColor}
              inputStyle={{ margin: '0px', backgroundColor: theme.auxColor }}
              defaultValue={user.tel}
            />

            <ButtonPrimary type="submit" style={{ marginTop: '50px' }}>
              Salvar
            </ButtonPrimary>
          </CredentialsForm>
        </ClientEditBox>
      </ClientEditContainer>
    </>
  );
}
