import React from 'react';
import Header from '../../components/Header';
import Menu from '../../components/Menu';
import { FaSearch } from 'react-icons/fa';
import {
  AdmListBox,
  AdmListContainer,
  AdmListTable,
  AdmListTitleContainer,
  AdmSearchInput,
} from '../../components/Adm/styled.';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../services/firebase';

import { AdmItemAdd, AdmItemRow } from '../../components/Adm';
import { useEffect } from 'react';
import { useState } from 'react';
import Fuse from 'fuse.js';
import validator from 'validator';

export default function Clientes() {
  const [users, setUsers] = useState([]);
  const [newUsers, setNewUsers] = useState([]);
  const [search, setSearch] = useState('');

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

  const searchClients = (e) => {
    if (validator.isEmpty(e.target.value)) {
      setNewUsers(users);
    } else {
      setSearch(e.target.value);

      const fuse = new Fuse(users, {
        keys: ['name', 'email', 'tel'],
      });

      setNewUsers(fuse.search(search));
    }
  };

  return (
    <>
      <Header
        style={true}
        auxText={window.screen.width >= 600 ? 'ADMINISTRATIVO' : 'ADMIN'}
      />
      <AdmListContainer>
        <Menu />

        <AdmListBox>
          <AdmListTitleContainer>
            <AdmItemAdd
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
              />
            ))}
          </AdmListTable>

          <AdmItemAdd
            text={'Adicionar novo cliente'}
            display={window.screen.width < 600 ? 'flex' : 'none'}
          />
        </AdmListBox>
      </AdmListContainer>
    </>
  );
}
