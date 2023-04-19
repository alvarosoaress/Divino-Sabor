/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from 'firebase/firestore';
import { useAuthContext } from '../../data/AuthProvider';
import { db } from '../../services/firebase';
import Header from '../../components/Header';
import { CardapioItemSeparator, CardapioTitle } from '../Cardpaio/styled,';
import {
  ListaBox,
  ListaContainer,
  ListaEntry,
  ListaItem,
  ListaItemName,
  ListaPrice,
  ListaQuantity,
} from './styled';
import { HiMinus, HiPlus } from 'react-icons/hi';
import { handleCurrency } from '../../components/Adm';
import {
  AdmModal,
  AdmModalContainer,
  AdmModalText,
} from '../../components/Adm/styled.';
import { ButtonPrimary, ButtonSecondary } from '../../components/Button/styled';
import { toast } from 'react-toastify';

export default function Lista() {
  const { user } = useAuthContext();

  const [loggedUser, setLoggedUser] = useState(null);

  const [lista, setLista] = useState([{}]);

  const [listaTotal, setListaTotal] = useState(0);

  const [menu, setMenu] = useState([{}]);

  const [update, setUpdate] = useState(false);

  const [modal, setModal] = useState(false);

  let objMenu = null;
  // useState para tratar do produto sendo deletado
  const [productDelete, setProductDelete] = useState({
    name: '',
    id: '',
    index: '',
  });

  function ListaItemLine({ item, index }) {
    let objMenu;

    if (item.id) {
      objMenu = menu.find((obj) => obj.id === item.id);
      if (objMenu) {
        return (
          <>
            <ListaItem>
              <a
                onClick={() => {
                  const newLista = [...lista];
                  newLista[index] = {
                    ...item,
                    qtd: item.qtd - objMenu.qtd_min,
                  };
                  if (item.qtd - objMenu.qtd_min <= 0) {
                    // remove o item do array se a (quantidade - 1) for menor ou igual a 0
                    //   newLista.splice(index, 1);
                    newLista[index] = { ...item, qtd: objMenu.qtd_min };
                    setProductDelete(item);
                    setModal(true);
                    setUpdate(true);
                  }
                  setUpdate(true);
                  setLista(newLista);
                }}
              >
                <HiMinus size={20} />
              </a>
              <ListaQuantity>{item.qtd}x</ListaQuantity>
              <ListaItemName>{item.nome}</ListaItemName>
              <CardapioItemSeparator
                style={{ borderBottomColor: 'transparent' }}
              />
              <ListaPrice>
                {handleCurrency(objMenu.valor * item.qtd)}
              </ListaPrice>
              <a
                // criando um novo array baseado no de state de lista
                // necessário para re-renderizar o map a cada mudança de qtd
                onClick={() => {
                  const newLista = [...lista];
                  newLista[index] = {
                    ...item,
                    qtd: item.qtd + objMenu.qtd_min,
                  };
                  setLista(newLista);
                  setUpdate(true);
                }}
              >
                <HiPlus size={20} />
              </a>
            </ListaItem>
            <CardapioItemSeparator style={{ marginBottom: '15px' }} />
          </>
        );
      }
    }
  }

  async function deleteProduct() {
    const newLista = [...lista];
    newLista.splice(productDelete.id, 1);
    toast.success(`Produto ${productDelete.nome} removido com sucesso !`);
    setUpdate(true);
    setLista([...newLista]);
  }

  useEffect(() => {
    async function getUser() {
      try {
        if (user.uid) {
          const docRef = doc(db, 'users', user.uid);
          const data = await getDoc(docRef);
          const cleanData = { ...data.data(), uid: data.id };

          setLoggedUser(cleanData.listaTotal);
          setLista(cleanData.lista);
        }
      } catch (error) {
        console.log(error);
      }
    }
    async function getMenu() {
      try {
        const menuCollection = collection(db, 'menu');
        const data = await getDocs(menuCollection);
        // data retorna uma response com muitos parametros
        // clean data serve para pegar apenas os dados dos produtos
        const cleanData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        setMenu(cleanData);
      } catch (error) {
        console.log(error);
      }
    }
    getUser();
    getMenu();
  }, [listaTotal]);

  useEffect(() => {
    async function syncLista() {
      const usersRef = doc(db, 'users', user.uid);

      try {
        await updateDoc(usersRef, {
          lista: lista,
          listaTotal,
        });
        setUpdate(false);
      } catch (error) {
        console.log(error);
      }
    }

    console.log(menu.length);
    console.log(lista.length);

    if (menu.length > 1 && lista.length > 1) {
      setListaTotal(
        lista.reduce((accumulator, currentValue) => {
          objMenu = menu.find((obj) => obj.id === currentValue.id);
          if (objMenu) {
            return accumulator + objMenu.valor * currentValue.qtd;
          }
        }, 0),
      );
      setUpdate(true);
      syncTotal();
    }

    if (update) {
      syncLista();
    }
  }, [lista, listaTotal]);

  async function syncTotal() {
    const usersRef = doc(db, 'users', user.uid);
    try {
      await updateDoc(usersRef, {
        listaTotal,
      });
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
            Deseja realmente remover o produto: {<br />} {productDelete.nome} ?
          </AdmModalText>

          <ButtonSecondary
            onClick={() => setModal(false)}
            mediaquery="600px"
            style={{ placeSelf: 'center' }}
          >
            Cancelar
          </ButtonSecondary>
          <ButtonPrimary
            onClick={() => deleteProduct()}
            mediaquery="600px"
            style={{ placeSelf: 'center' }}
          >
            Remover
          </ButtonPrimary>
        </AdmModal>
      </AdmModalContainer>

      <Header />
      <ListaContainer>
        <CardapioTitle>Minha Lista</CardapioTitle>
        <ListaBox>
          <ListaEntry>
            {lista &&
              lista.map((item, index) => (
                <ListaItemLine item={item} index={index} />
              ))}
          </ListaEntry>
        </ListaBox>

        <CardapioTitle>Total</CardapioTitle>
        <ListaItemName>{handleCurrency(loggedUser)}</ListaItemName>

        <ButtonPrimary mediaquery={'600px'} style={{ marginTop: '50px' }}>
          Realizar Pedido
        </ButtonPrimary>
      </ListaContainer>
    </>
  );
}
