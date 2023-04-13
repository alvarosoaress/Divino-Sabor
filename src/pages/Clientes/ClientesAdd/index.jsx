import React, { useRef } from 'react';
import { addDoc, collection } from 'firebase/firestore';

import Header from '../../../components/Header';
import Menu from '../../../components/Menu';
import { Link, useNavigate } from 'react-router-dom';
import { db } from '../../../services/firebase';
import {
  Email,
  Name,
  Tel,
  handleValidation,
} from '../../../components/Credentials';
import { CredentialsForm } from '../../Login/styled';
import { toast } from 'react-toastify';
import { useTheme } from 'styled-components';
import {
  ButtonPrimary,
  ButtonSecondary,
} from '../../../components/Button/styled';
import {
  ClientEditBox,
  ClientEditContainer,
  ClientEditTilte,
} from '../ClientesEdit/styled';
import { isEmpty } from '../../../components/Utils';

export default function ClientesAdd() {
  const navigate = useNavigate();

  // criando Referência para a coleção users do fireStore
  const userRef = collection(db, 'users');

  const $email = useRef(null);
  const $emailLabel = useRef(null);
  const $name = useRef(null);
  const $nameLabel = useRef(null);
  const $tel = useRef(null);
  const $telLabel = useRef(null);

  const theme = useTheme();

  const handleAdd = async (e) => {
    e.preventDefault();

    let email = $email.current.value;
    let name = $name.current.value;
    let tel = $tel.current.value.replace(/[^\d]/g, '');

    if (
      isEmpty($name.current.value) ||
      isEmpty($email.current.value) ||
      isEmpty($tel.current.value)
    ) {
      toast.error('Preencha todos os campos primeiro!.');
      return;
    }

    try {
      // adicionando usuário com os dados preenchidos
      // passando os paramêtros sem chaves pois possuem o msm nome no fireStore
      // passando type com chave type e valor cliente
      await addDoc(userRef, { email, name, tel, type: 'cliente' });
      navigate('/clientes');
      toast.success('Cliente adicionado com sucesso!');
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
          <ClientEditTilte>Adicionar Cliente</ClientEditTilte>
          <CredentialsForm
            onSubmit={(e) => handleAdd(e)}
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
            />
            <Email
              $ref={$email}
              $refLabel={$emailLabel}
              labelColor={theme.textColor}
              inputStyle={{ margin: '0px', backgroundColor: theme.auxColor }}
            />
            <Tel
              $ref={$tel}
              $refLabel={$telLabel}
              labelColor={theme.textColor}
              inputStyle={{ margin: '0px', backgroundColor: theme.auxColor }}
            />
            <span style={{ display: 'flex', marginTop: '50px', gap: '20px' }}>
              <ButtonSecondary as={Link} to={'/clientes'}>
                Cancelar
              </ButtonSecondary>
              <ButtonPrimary type="submit">Salvar</ButtonPrimary>
            </span>
          </CredentialsForm>
        </ClientEditBox>
      </ClientEditContainer>
    </>
  );
}
