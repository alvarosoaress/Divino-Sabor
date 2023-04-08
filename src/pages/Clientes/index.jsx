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

export default function Clientes() {
  const [users, setUsers] = useState([]);
  const usersCollection = collection(db, 'users');

  /// const queryProductType = query(
  //   productCollection,
  //   where('type', '==', 'doce'),
  // );

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
      } catch (error) {
        console.error(error);
      }
    };
    getUsers();
  }, []);

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
              <AdmSearchInput />
              <FaSearch style={{ height: '40px' }} />
            </span>
          </AdmListTitleContainer>

          <AdmListTable>
            {users.map((user, index) => (
              <AdmItemRow name={user.email} key={index} />
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
