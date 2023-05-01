import React from 'react';
import Header from '../../components/Header';
import Menu from '../../components/Menu';
import { FaSearch } from 'react-icons/fa';
import {
  AdmListBox,
  AdmListContainer,
  AdmListTable,
  AdmListTitleContainer,
  AdmModal,
  AdmModalContainer,
  AdmModalText,
  AdmSearchInput,
} from '../../components/Adm/styled.';
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { db } from '../../services/firebase';

import { AdmItemAdd, AdmItemRow } from '../../components/Adm';
import { useEffect } from 'react';
import { useState } from 'react';
import Fuse from 'fuse.js';
import { ButtonPrimary, ButtonSecondary } from '../../components/Button/styled';
import { toast } from 'react-toastify';
import { isEmpty } from '../../components/Utils';
import { ProductEditTitle } from '../Estoque/styled';

export default function Clientes() {
  const [users, setUsers] = useState([]);
  const [newUsers, setNewUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [modal, setModal] = useState(false);
  // useState para tratar do cliente sendo deletado
  const [userDelete, setUserDelete] = useState({
    name: '',
    uid: '',
    index: '',
  });

  // referência para a coleção usuers da fireStore
  const usersCollection = collection(db, 'users');

  // query para receber todas as ocorrencias de type == cliente na coleção usuários
  const queryClients = query(usersCollection, where('type', '==', 'cliente'));

  // executando a query
  useEffect(() => {
    const getUsers = async () => {
      try {
        const data = await getDocs(queryClients);
        // data retorna uma response com muitos parametros
        // clean data serve para pegar apenas os dados dos clientes
        const cleanData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        // atribuindo a response para users e newUsers
        // isso auxilia na hora do search
        setUsers(cleanData);
        setNewUsers(cleanData);
      } catch (error) {
        console.error(error);
      }
    };
    getUsers();
  }, []);

  function searchClients(e) {
    if (isEmpty(e.target.value)) {
      setNewUsers(users);
    } else {
      setSearch(e.target.value);
      // usando a biblioteca fuse js para dar search
      const fuse = new Fuse(users, {
        threshold: 0.2,
        keys: ['name', 'email', 'tel'],
      });

      // colocando o resultado da pesquisa dentro de newUsers
      setNewUsers(fuse.search(search));
    }
  }

  async function deleteClient(uid) {
    try {
      // deletando usuário baseado em seu uid
      await deleteDoc(doc(db, 'users', uid));
      setModal(false);
      // retirando o usuário do state newUsers
      // isso serve para a página atualizar a lista de clientes automaticamente
      newUsers.splice(userDelete.index, 1);
      // [...newUsers ] é estritamente necessário para que
      // o map feito com o state seja atuomaticamente atualizado
      // reduzindo a necessidade de um novo useEffect
      setNewUsers([...newUsers]);
      toast.success(`Cliente ${userDelete.name} deletado com sucesso !`);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      {/* renderizando modal de exclusão com display none */}
      <AdmModalContainer
        style={{ display: modal ? 'flex' : 'none' }}
        onClick={() => setModal(false)}
      >
        <AdmModal>
          <AdmModalText>
            Deseja realmente excluir o usuário: {<br />} {userDelete.name} ?
          </AdmModalText>

          <ButtonSecondary
            onClick={() => setModal(false)}
            mediaquery="600px"
            style={{ placeSelf: 'center' }}
          >
            Cancelar
          </ButtonSecondary>
          <ButtonPrimary
            onClick={() => deleteClient(userDelete.uid)}
            mediaquery="600px"
            style={{ placeSelf: 'center' }}
          >
            Deletar
          </ButtonPrimary>
        </AdmModal>
      </AdmModalContainer>

      <Header
        style={true}
        auxText={window.screen.width >= 600 ? 'ADMINISTRATIVO' : 'ADMIN'}
      />
      <AdmListContainer>
        <Menu />

        <AdmListBox>
          <ProductEditTitle>Clientes</ProductEditTitle>
          <AdmListTitleContainer>
            <AdmItemAdd
              link={'/clientes/add'}
              text={'Adicionar novo cliente'}
              display={window.screen.width >= 600 ? 'flex' : 'none'}
            />
            <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <AdmSearchInput
                onChange={(e) => searchClients(e)}
                placeholder="Nome, e-mail, telefone..."
              />
              <FaSearch style={{ height: '40px' }} />
            </span>
          </AdmListTitleContainer>

          <AdmListTable>
            {newUsers.map((client, index) => (
              <AdmItemRow
                name={client.name ?? client.item.name}
                uid={client.id ?? client.item.id}
                key={index}
                index={index}
                setState={setModal}
                setUser={setUserDelete}
              />
            ))}
          </AdmListTable>

          <AdmItemAdd
            link={'/clientes/add'}
            text={'Adicionar novo cliente'}
            display={window.screen.width < 600 ? 'flex' : 'none'}
          />
        </AdmListBox>
      </AdmListContainer>
    </>
  );
}
