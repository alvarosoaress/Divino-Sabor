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
import { MdAddCircle } from 'react-icons/md';
import { toast } from 'react-toastify';

export default function Cardapio() {
  const { user } = useAuthContext();

  // eslint-disable-next-line no-unused-vars
  const [loggedUser, setLoggedUser] = useState(null);

  const [update, setUpdate] = useState(false);

  const [items, setItems] = useState(null);
  const [newItems, setNewItems] = useState(null);

  const [lista, setLista] = useState([{}]);

  const [listaTotal, setListaTotal] = useState(null);
  let objItems;

  const [filter, setFilter] = useState('initial');

  const itemsCollection = collection(db, 'menu');

  // função para gerar os blocos de item por categoria
  function CardapioItemBlock({ name, price, quantity, desc, id }) {
    return (
      <Link onClick={() => updateLista(name, Number(quantity), id)}>
        <CardapioItem>
          <CardapioItemName>{name}</CardapioItemName>
          <CardapioItemSeparator></CardapioItemSeparator>
          <CardapioItemPrice>
            {price}
            <small>{'/' + quantity + ' unid.'}</small>
            <MdAddCircle size={20} />
          </CardapioItemPrice>
        </CardapioItem>
        <CardapioItemDesc>{desc ?? ''}</CardapioItemDesc>
      </Link>
    );
  }

  // pegando User e Items
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

  // funçao para atualizar o state local da lista de items do user
  function updateLista(name, qtd, id) {
    setUpdate(true);
    setLista((lista) => {
      if (lista) {
        const objetoExistente = lista.find((obj) => obj.id === id);

        // para evitar existir 2 items iguais na lista
        // caso o obj já exista na item apenas sua quantidade é aumentada
        if (objetoExistente) {
          objetoExistente.qtd += Number(qtd);
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
    toast(`${name} adicionado à sua lista.`, {
      position: 'top-left',
      autoClose: 2000,
      closeOnClick: true,
      theme: 'light',
      type: 'info',
    });
  }

  // sincronizando a lista local do usuário com o BD
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
      // trocando o valor de ListaToal a cada modificação na lista
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

  // sincronizando o valor total local com o valor do BD
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

  // função para filtrar os items por categoria
  function filterItems(category) {
    if (filter == category) {
      setFilter('initial'); // inital é um valor default
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
                // style baseado em que categoria está sendo filtrada
                style={{
                  textDecoration:
                    filter == 'initial'
                      ? 'none'
                      : filter == 'doce'
                      ? 'underline'
                      : 'none',
                }}
                onClick={() => filterItems('doce')}
              >
                Doces
              </CardapioCategories>
            </CardapioCategoriesOption>

            <CardapioCategoriesOption>
              <CardapioCategories
                style={{
                  textDecoration:
                    filter == 'initial'
                      ? 'none'
                      : filter == 'salgado'
                      ? 'underline'
                      : 'none',
                }}
                onClick={() => filterItems('salgado')}
              >
                Salgados
              </CardapioCategories>
            </CardapioCategoriesOption>

            <CardapioCategoriesOption>
              <CardapioCategories
                style={{
                  textDecoration:
                    filter == 'initial'
                      ? 'none'
                      : filter == 'confeitaria'
                      ? 'underline'
                      : 'none',
                }}
                onClick={() => filterItems('confeitaria')}
              >
                Confeitaria
              </CardapioCategories>
            </CardapioCategoriesOption>

            <CardapioCategoriesOption>
              <CardapioCategories
                style={{
                  textDecoration:
                    filter == 'initial'
                      ? 'none'
                      : filter == 'bebida'
                      ? 'underline'
                      : 'none',
                }}
                onClick={() => filterItems('bebida')}
              >
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
                  newItems.map((item, index) =>
                    item.categoria == 'doce' ? (
                      <CardapioItemBlock
                        name={item.nome}
                        price={handleCurrency(item.valor * item.qtd_min)}
                        quantity={item.qtd_min}
                        desc={item.desc ?? ''}
                        id={item.id}
                        key={index}
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
                  newItems.map((item, index) =>
                    item.categoria == 'salgado' ? (
                      <CardapioItemBlock
                        name={item.nome}
                        price={handleCurrency(item.valor * item.qtd_min)}
                        quantity={item.qtd_min}
                        desc={item.desc ?? ''}
                        id={item.id}
                        key={index}
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
                  newItems.map((item, index) =>
                    item.categoria == 'confeitaria' ? (
                      <CardapioItemBlock
                        name={item.nome}
                        price={handleCurrency(item.valor * item.qtd_min)}
                        quantity={item.qtd_min}
                        desc={item.desc ?? ''}
                        id={item.id}
                        key={index}
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
                {newItems &&
                  newItems.map((item, index) =>
                    item.categoria == 'bebida' ? (
                      <CardapioItemBlock
                        name={item.nome}
                        price={handleCurrency(item.valor * item.qtd_min)}
                        quantity={item.qtd_min}
                        desc={item.desc ?? ''}
                        id={item.id}
                        key={index}
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
