/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import {
  CardapioBox,
  CardapioCategories,
  CardapioCategoriesOption,
  CardapioContainer,
  CardapioItem,
  CardapioItemDesc,
  CardapioItemList,
  CardapioItemName,
  CardapioItemPrice,
  CardapioItemSeparator,
  CardapioList,
  CardapioSideBar,
  CardapioTitle,
} from './styled,';
import { Link } from 'react-router-dom';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../../services/firebase';
import { handleCurrency } from '../../components/Adm';
import { useAuthContext } from '../../data/AuthProvider';
import { useTheme } from 'styled-components';

export default function Cardapio() {
  const { user } = useAuthContext();

  const [loggedUser, setLoggedUser] = useState(null);

  const [update, setUpdate] = useState(false);

  const [items, setItems] = useState(null);
  const [newItems, setNewItems] = useState(null);

  const [lista, setLista] = useState([{}]);

  const [listaTotal, setListaTotal] = useState(null);
  let objItems;

  const [filter, setFilter] = useState('initial');

  const itemsCollection = collection(db, 'menu');

  const theme = useTheme();

  function CardapioItemBlock({ name, price, quantity, desc, id }) {
    return (
      <Link onClick={() => updateLista(name, Number(quantity), id)}>
        <CardapioItem>
          <CardapioItemName>{name}</CardapioItemName>
          <CardapioItemSeparator></CardapioItemSeparator>
          <CardapioItemPrice>
            {price}
            <small>{'/' + quantity + ' unid.'}</small>
          </CardapioItemPrice>
        </CardapioItem>
        <CardapioItemDesc>{desc ?? ''}</CardapioItemDesc>
      </Link>
    );
  }

  useEffect(() => {
    const getItems = async () => {
      try {
        const data = await getDocs(itemsCollection);
        // data retorna uma response com muitos parametros
        // clean data serve para pegar apenas os dados dos produtos
        const cleanData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        setItems(cleanData);
        setNewItems(cleanData);
      } catch (error) {
        console.log(error);
      }
    };
    async function getUser() {
      try {
        if (user.uid) {
          const docRef = doc(db, 'users', user.uid);
          const data = await getDoc(docRef);
          const cleanData = { ...data.data(), uid: data.id };

          setLoggedUser(cleanData);
          setLista(cleanData.lista);
          setListaTotal(cleanData.listaTotal);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getUser();
    getItems();
  }, []);

  function updateLista(name, qtd, id) {
    setUpdate(true);
    setLista((lista) => {
      if (lista) {
        const objetoExistente = lista.find((obj) => obj.id === id);

        if (objetoExistente) {
          objetoExistente.qtd += Number(qtd) / 2;
          return [...lista];
        } else {
          return [
            ...lista,
            {
              nome: name,
              qtd: Number(qtd),
              id: id,
            },
          ];
        }
      } else {
        return [
          {
            nome: name,
            qtd: Number(qtd),
            id: id,
          },
        ];
      }
    });
  }

  useEffect(() => {
    async function syncLista() {
      const usersRef = doc(db, 'users', user.uid);

      try {
        await updateDoc(usersRef, {
          lista: lista,
        });
        setUpdate(false);
      } catch (error) {
        console.log(error);
      }
    }

    if (items) {
      setListaTotal(
        lista.reduce((accumulator, currentValue) => {
          objItems = items.find((obj) => obj.id === currentValue.id);
          if (objItems !== undefined) {
            return objItems.valor * currentValue.qtd + accumulator;
          }
        }, 0),
      );
    }

    if (update) {
      syncLista();
    }
  }, [lista]);

  useEffect(() => {
    async function syncTotal() {
      const usersRef = doc(db, 'users', user.uid);

      try {
        await updateDoc(usersRef, {
          listaTotal,
        });
        setUpdate(false);
      } catch (error) {
        console.log(error);
      }
    }

    if (update) {
      syncTotal();
    }
  }, [lista, listaTotal]);

  function filterItems(category) {
    if (filter == category) {
      setFilter('initial');
      setNewItems(items);
    } else {
      const filter = items.filter((item) => item.categoria == category);
      setNewItems(filter);
      setFilter(category);
    }
  }

  return (
    <>
      <Header />
      <CardapioContainer>
        <CardapioBox>
          <CardapioSideBar>
            <CardapioTitle>Categorias</CardapioTitle>

            <CardapioCategoriesOption>
              <CardapioCategories
                style={{
                  textShadow:
                    filter == 'initial'
                      ? 'none'
                      : filter == 'doce'
                      ? '0px 0px 10px #FFFFFF'
                      : 'none',
                }}
                onClick={() => filterItems('doce')}
              >
                Doces
              </CardapioCategories>
            </CardapioCategoriesOption>

            <CardapioCategoriesOption>
              <CardapioCategories onClick={() => filterItems('salgado')}>
                Salgados
              </CardapioCategories>
            </CardapioCategoriesOption>

            <CardapioCategoriesOption>
              <CardapioCategories onClick={() => filterItems('confeitaria')}>
                Confeitaria
              </CardapioCategories>
            </CardapioCategoriesOption>

            <CardapioCategoriesOption>
              <CardapioCategories onClick={() => filterItems('bebida')}>
                Bebidas
              </CardapioCategories>
            </CardapioCategoriesOption>
          </CardapioSideBar>
          <CardapioList>
            <CardapioItemList>
              <section style={{ marginBottom: '50px' }}>
                <CardapioTitle
                  style={{
                    display:
                      filter == 'initial'
                        ? 'flex'
                        : filter == 'doce'
                        ? 'flex'
                        : 'none',
                    marginTop: '0px',
                  }}
                >
                  Doces
                </CardapioTitle>
                {newItems &&
                  newItems.map((item) =>
                    item.categoria == 'doce' ? (
                      <CardapioItemBlock
                        name={item.nome}
                        price={handleCurrency(item.valor * item.qtd_min)}
                        quantity={item.qtd_min}
                        desc={item.desc ?? ''}
                        id={item.id}
                      />
                    ) : (
                      ''
                    ),
                  )}

                <CardapioTitle
                  style={{
                    display:
                      filter == 'initial'
                        ? 'flex'
                        : filter == 'salgado'
                        ? 'flex'
                        : 'none',
                  }}
                >
                  Salgados
                </CardapioTitle>
                {newItems &&
                  newItems.map((item) =>
                    item.categoria == 'salgado' ? (
                      <CardapioItemBlock
                        name={item.nome}
                        price={handleCurrency(item.valor * item.qtd_min)}
                        quantity={item.qtd_min}
                        desc={item.desc ?? ''}
                        id={item.id}
                      />
                    ) : (
                      ''
                    ),
                  )}

                <CardapioTitle
                  style={{
                    display:
                      filter == 'initial'
                        ? 'flex'
                        : filter == 'confeitaria'
                        ? 'flex'
                        : 'none',
                  }}
                >
                  Confeitaria
                </CardapioTitle>
                {newItems &&
                  newItems.map((item) =>
                    item.categoria == 'confeitaria' ? (
                      <CardapioItemBlock
                        name={item.nome}
                        price={handleCurrency(item.valor * item.qtd_min)}
                        quantity={item.qtd_min}
                        desc={item.desc ?? ''}
                        id={item.id}
                      />
                    ) : (
                      ''
                    ),
                  )}

                <CardapioTitle
                  style={{
                    display:
                      filter == 'initial'
                        ? 'flex'
                        : filter == 'bebida'
                        ? 'flex'
                        : 'none',
                  }}
                >
                  Bebidas
                </CardapioTitle>
                {console.log(newItems)}
                {newItems &&
                  newItems.map((item) =>
                    item.categoria == 'bebida' ? (
                      <CardapioItemBlock
                        name={item.nome}
                        price={handleCurrency(item.valor * item.qtd_min)}
                        quantity={item.qtd_min}
                        desc={item.desc ?? ''}
                        id={item.id}
                      />
                    ) : (
                      ''
                    ),
                  )}
              </section>
            </CardapioItemList>
          </CardapioList>
        </CardapioBox>
      </CardapioContainer>
    </>
  );
}
