/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import {
  Timestamp,
  addDoc,
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
  ListaConfirmForm,
  ListaConfirmLabel,
  ListaContainer,
  ListaEntry,
  ListaItem,
  ListaItemName,
  ListaOptionsContainer,
  ListaPrice,
  ListaQuantity,
} from './styled';
import { HiMinus, HiPlus, HiTrash } from 'react-icons/hi';
import { formattedDate, handleCurrency } from '../../components/Adm';
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

  const [listaTotal, setListaTotal] = useState(null);

  const [menu, setMenu] = useState(null);

  const [update, setUpdate] = useState(false);

  const [modal, setModal] = useState(false);

  const navigate = useNavigate();

  let objMenu = null;
  // useState para tratar do produto sendo deletado
  const [productDelete, setProductDelete] = useState({
    name: '',
    id: '',
    index: '',
    price: '',
  });

  // função para rendezirar 1 item por linha
  function ListaItemLine({ item, index }) {
    let objMenu;

    if (item.id && menu) {
      objMenu = menu.find((obj) => obj.id === item.id);
      if (objMenu) {
        return (
          <>
            <ListaItem>
              <ListaOptionsContainer>
                {/* // botão de diminuir qtd de produto */}
                <a
                  onClick={() => {
                    // quando clicado, é criado uma nova lista auxiliar
                    // à e la é atribuida as mudanças
                    // só depois ela é atribuida à Lista em si
                    // necessário para re-renderizar o map a cada mudança de qtd
                    const newLista = [...lista];
                    newLista[index] = {
                      ...item,
                      // diminuindo a quantidade baseado na quantiddade minima sendo vendida
                      qtd: item.qtd - objMenu.qtd_min,
                    };
                    // caso a qtd - qtd_min seja <= 0 isso quer dizer que o produto será excluido
                    // assim mostrando o modal de confirmação ao usuário
                    if (item.qtd - objMenu.qtd_min <= 0) {
                      newLista[index] = { ...item, qtd: objMenu.qtd_min };
                      // colcoando as info do produto sendo deletado dentro do state ProductDelete
                      // esse state é para levar as info do produto em questão para o modal
                      setProductDelete({
                        name: item.nome,
                        id: item.id,
                        index: index,
                        // passando o price já calculando o total
                        price: item.qtd * objMenu.valor,
                      });
                      setModal(true);
                      setUpdate(true);
                    }

                    setUpdate(true);
                    setLista(newLista);
                  }}
                >
                  <HiMinus size={20} />
                </a>

                {/* // botão de adicionar produto a lista */}
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
              </ListaOptionsContainer>
              <ListaQuantity>{item.qtd}x</ListaQuantity>
              <ListaItemName>{item.nome}</ListaItemName>
              <CardapioItemSeparator
                style={{ borderBottomColor: 'transparent' }}
              />
              <ListaPrice>
                {handleCurrency(objMenu.valor * item.qtd)}
              </ListaPrice>

              {/* // botão de exclusão direta do produto da lista */}
              <a
                style={{ marginLeft: '15px' }}
                onClick={() => {
                  setProductDelete({
                    name: item.nome,
                    id: item.id,
                    index: index,
                    price: item.qtd * objMenu.valor,
                  });
                  setModal(true);
                  setUpdate(true);
                }}
              >
                <HiTrash />
              </a>
            </ListaItem>
            <CardapioItemSeparator style={{ marginBottom: '15px' }} />
          </>
        );
      }
    }
  }

  // função para deletar produto da lista
  async function deleteProduct() {
    const newLista = [...lista];

    newLista.splice(productDelete.id, 1);

    setListaTotal(listaTotal - productDelete.price);

    toast.success(`Produto ${productDelete.name} removido com sucesso !`);

    setUpdate(true);
    setLista([...newLista]);
  }

  // pegando User e Menu do BD
  useEffect(() => {
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
  }, []);

  // função para sincronizar a lista de compras do usuário
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

    if (menu && lista) {
      // trocando o valor de ListaToal a cada modificação na lista
      setListaTotal(
        lista.reduce((accumulator, currentValue) => {
          objMenu = menu.find((obj) => obj.id === currentValue.id);
          if (objMenu !== undefined) {
            return objMenu.valor * currentValue.qtd + accumulator;
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
  }, [listaTotal, lista]);

  async function handleSubmit(e) {
    e.preventDefault();
    let ordersCollection = collection(db, 'orders');

    let today = new Date();

    let date = formattedDate(today, true);
    let timeStamp = Timestamp.fromDate(today);

    try {
      await addDoc(ordersCollection, {
        data: date,
        timeStamp,
        lista,
        cliente: {
          nome: loggedUser.name,
          email: loggedUser.email,
          tel: loggedUser.tel,
        },
      });
      navigate('/');
      toast.success('Pedido realizado com sucesso!');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      {/* // modal sendo pre renderizado em cima da pagina */}
      <AdmModalContainer
        style={{ display: modal ? 'flex' : 'none' }}
        onClick={() => setModal(false)}
      >
        <AdmModal>
          <AdmModalText>
            Deseja realmente remover o produto: {<br />} {productDelete.name} ?
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
        <CardapioTitle style={{ marginTop: '0px' }}>Minha Lista</CardapioTitle>
        <ListaBox>
          <ListaEntry>
            {lista &&
              lista.map((item, index) => (
                <ListaItemLine item={item} index={index} />
              ))}
          </ListaEntry>
        </ListaBox>

        <CardapioTitle style={{ marginTop: '0px' }}>Total</CardapioTitle>
        <ListaItemName>{handleCurrency(listaTotal)}</ListaItemName>

        <ListaConfirmForm action="" onSubmit={(e) => handleSubmit(e)}>
          <ButtonPrimary
            type="submit"
            mediaquery={'600px'}
            style={{ marginTop: '50px' }}
          >
            Realizar Pedido
          </ButtonPrimary>
          <div style={{ marginTop: '15px' }}>
            <input type="checkbox" required />
            <ListaConfirmLabel>
              Aceito e concordo com todos os <a>termos</a> de pedidos.
            </ListaConfirmLabel>
          </div>
        </ListaConfirmForm>
      </ListaContainer>
    </>
  );
}
