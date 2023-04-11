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
import validator from 'validator';
import { ButtonPrimary, ButtonSecondary } from '../../components/Button/styled';
import { toast } from 'react-toastify';

export default function Clientes() {
  // TODO: COMENTE !@!
  const [users, setUsers] = useState([]);
  const [newUsers, setNewUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [modal, setModal] = useState(false);
  const [userDelete, setUserDelete] = useState({
    name: '',
    uid: '',
    index: '',
  });

  const usersCollection = collection(db, 'users');

  /// const queryProductType = query(
  //   productCollection,
  //   where('type', '==', 'doce'),
  // );

  // import { collection, query, where } from 'firebase/firestore'
  //
  // const queryConstraints = []
  // if (group != null) queryConstraints.push(where('group', '==', group))
  // if (pro != null) queryConstraints.push(where('pro', '==', pro))
  // const q = query(collection(db, 'videos'), ...queryConstraints)
  //

  const queryClients = query(usersCollection, where('type', '==', 'cliente'));

  useEffect(() => {
    const getUsers = async () => {
      try {
        const data = await getDocs(queryClients);
        const cleanData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setUsers(cleanData);
        setNewUsers(cleanData);
      } catch (error) {
        console.error(error);
      }
    };
    getUsers();
  }, []);

  function searchClients(e) {
    if (validator.isEmpty(e.target.value)) {
      setNewUsers(users);
    } else {
      setSearch(e.target.value);

      const fuse = new Fuse(users, {
        keys: ['name', 'email', 'tel'],
      });

      setNewUsers(fuse.search(search));
    }
  }

  async function deleteClient(uid) {
    try {
      await deleteDoc(doc(db, 'users', uid));
      setModal(false);
      newUsers.splice(userDelete.index, 1);
      setNewUsers([...newUsers]);
      toast.success(`Cliente ${userDelete.name} deletado com sucesso !`);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <AdmModalContainer
        style={{ display: modal ? 'flex' : 'none' }}
        onClick={() => setModal(false)}
      >
        <AdmModal>
          <AdmModalText>
            Deseja realmente excluir o usuário: {<br />} {userDelete.name} ?
          </AdmModalText>
          <span
            style={{
              display: 'grid',
              alignSelf: 'center',
              justifySelf: 'center',
              gridAutoFlow: 'column',
              gridColumnGap: '20px',
            }}
          >
            <ButtonSecondary onClick={() => setModal(false)}>
              Cancelar
            </ButtonSecondary>
            <ButtonPrimary onClick={() => deleteClient(userDelete.uid)}>
              Deletar
            </ButtonPrimary>
          </span>
        </AdmModal>
      </AdmModalContainer>

      <Header
        style={true}
        auxText={window.screen.width >= 600 ? 'ADMINISTRATIVO' : 'ADMIN'}
      />
      <AdmListContainer>
        <Menu />

        <AdmListBox>
          <AdmListTitleContainer>
            <AdmItemAdd
              link={'/clientes/add'}
              text={'Adicionar novo cliente'}
              display={window.screen.width >= 600 ? 'flex' : 'none'}
            />
            <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <AdmSearchInput onChange={(e) => searchClients(e)} />
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
