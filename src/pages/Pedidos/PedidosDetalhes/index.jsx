import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { toast } from 'react-toastify';
import { db } from '../../../services/firebase';
import {
  doc,
  getDoc,
  collection,
  getDocs,
  Timestamp,
  addDoc,
  deleteDoc,
} from 'firebase/firestore';
import {
  ListaItem,
  ListaItemName,
  ListaOptionsContainer,
  ListaPrice,
  ListaQuantity,
} from '../../Lista/styled';
import { CardapioItemSeparator } from '../../Cardpaio/styled,';
import {
  PercentageIcon,
  formatTel,
  formattedDate,
  handleCurrency,
} from '../../../components/Adm';
import {
  AdmLabel,
  AdmModal,
  AdmModalContainer,
  AdmModalText,
} from '../../../components/Adm/styled.';
import {
  ButtonPrimary,
  ButtonSecondary,
} from '../../../components/Button/styled';
import Header from '../../../components/Header';
import Menu from '../../../components/Menu';
import {
  ClientInfo,
  ClientInfoContainer,
  DetailSideBar,
  DetailsBox,
  DetailsContainer,
  DetailsIngredient,
  DetailsText,
  DetailsTitle,
} from './styled';
import {
  IngredientBox,
  IngredientContainer,
  IngredientQtd,
  IngredientText,
} from '../../Cardpaio/CardapioAdd/styled';

export default function PedidosDetalhes() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [menu, setMenu] = useState(null);

  const [modal, setModal] = useState(false);
  const [modalHandleFunction, setModalHandleFunction] = useState(() => {});
  const [modalText, setModalText] = useState(['']);

  const orderRef = doc(db, 'orders', id);

  let objMenu;
  let ingredientes = [];

  // pegando as informações do produto na DB
  useEffect(() => {
    const getOrder = async () => {
      try {
        let response = await getDoc(orderRef);
        if (!response.data()) {
          response = await getDoc(doc(db, 'orders-accepted', id));
        }
        if (!response.data()) {
          response = await getDoc(doc(db, 'orders-completed', id));
        }
        const cleanData = response.data();
        setOrder(cleanData);
      } catch (error) {
        console.error(error);
      }
    };
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
    getOrder();
    getMenu();
  }, []);

  function formatDate(data) {
    let myDate = new Date(data * 1000);

    const options = {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    };

    return myDate.toLocaleDateString('pt-BR', options);
  }

  // função para rendezirar 1 item por linha
  function ListaItemLine({ item }) {
    let objMenu;

    if (item.id && menu) {
      objMenu = menu.find((obj) => obj.id === item.id);
      if (objMenu) {
        return (
          <>
            <ListaItem>
              <ListaOptionsContainer></ListaOptionsContainer>
              <ListaQuantity>{item.qtd}x</ListaQuantity>
              <ListaItemName>{item.nome}</ListaItemName>
              <CardapioItemSeparator />
              <ListaPrice>
                {handleCurrency(objMenu.valor * item.qtd)}
              </ListaPrice>
            </ListaItem>
            <CardapioItemSeparator style={{ marginBottom: '15px' }} />
          </>
        );
      }
    }
  }

  // função para pegar os ingredientes necessários para o pedido
  function orderIngredients() {
    const ingredientesTotais = {}; // Objeto de objetos para armazenar as quantidades totais de cada ingrediente
    // caso atribua todas quantidades diretamente ao ingredientes
    // as quantidades ficarão duplicadas
    order &&
      order.lista.forEach((item) => {
        if (menu) {
          objMenu = menu.find((obj) => obj.id === item.id);
        }
        if (objMenu !== undefined) {
          objMenu.ingredientes.forEach((i) => {
            const qtdTotal = i.qtd * (item.qtd / objMenu.qtd_min); // Calcula a quantidade total do ingrediente
            if (ingredientesTotais[i.nome]) {
              // Se o ingrediente já existe no objeto de quantidades totais, soma a quantidade
              ingredientesTotais[i.nome].qtd += qtdTotal;
            } else {
              // Se o ingrediente não existe no objeto, adiciona com a quantidade total
              ingredientesTotais[i.nome] = {
                id: i.id,
                nome: i.nome,
                qtd: qtdTotal,
              };
            }
          });
        }
      });
    // Converte o objeto de quantidades totais em um array de ingredientes
    ingredientes = Object.values(ingredientesTotais);
    ingredientes.sort((a, b) => b.qtd - a.qtd);
  }

  function GenerateModal({ handleFunction, textArray }) {
    const map = textArray.map((text, index) => {
      return <AdmModalText key={index}>{text}</AdmModalText>;
    });

    return (
      <AdmModalContainer
        // top para calcular o quanto o cliente já rolou na pagina
        style={{ display: modal ? 'flex' : 'none', top: window.pageYOffset }}
        onClick={() => setModal(false)}
      >
        <AdmModal>
          {map}
          <ButtonSecondary
            onClick={() => setModal(false)}
            mediaquery="600px"
            style={{ placeSelf: 'center' }}
          >
            Cancelar
          </ButtonSecondary>
          <ButtonPrimary
            onClick={handleFunction}
            mediaquery="600px"
            style={{ placeSelf: 'center' }}
          >
            Confirmar
          </ButtonPrimary>
        </AdmModal>
      </AdmModalContainer>
    );
  }

  // aceitando pedido
  const handleAccept = async () => {
    let today = new Date();

    let date = formattedDate(today, true);
    let timeStamp = Timestamp.fromDate(today);

    try {
      order.dataAceito = { data: date, timeStamp };

      // trocando o pedido de collection
      await addDoc(collection(db, 'orders-accepted'), {
        ...order,
      });

      // deletando o pedido na collection antiga
      try {
        await deleteDoc(orderRef);
      } catch (error) {
        console.log(error);
      }
      navigate('/pedidos/submetidos');
      toast.success('Pedido aceito com sucesso!');
    } catch (error) {
      console.log(error);
    }
  };

  // recusando pedido
  const handleRefuse = async () => {
    try {
      // deletando o pedido na collection
      await deleteDoc(orderRef);
      navigate('/pedidos/submetidos');
      toast.success('Pedido recusado com sucesso!');
    } catch (error) {
      console.log(error);
    }
  };

  // completando o pedido
  const handleComplete = async () => {
    let today = new Date();

    let date = formattedDate(today, true);
    let timeStamp = Timestamp.fromDate(today);

    try {
      order.dataCompleto = { data: date, timeStamp };

      // trocando o pedido de collection
      await addDoc(collection(db, 'orders-completed'), {
        ...order,
      });

      // deletando o pedido na collection antiga
      try {
        await deleteDoc(doc(db, 'orders-accepted', id));
      } catch (error) {
        console.log(error);
      }
      navigate('/pedidos/ativos');
      toast.success('Pedido completado com sucesso!');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {orderIngredients()}

      <GenerateModal
        handleFunction={modal ? modalHandleFunction : () => {}}
        textArray={modalText}
      />
      <Header
        style={true}
        auxText={window.screen.width >= 800 ? 'ADMINISTRATIVO' : 'ADMIN'}
      />
      <DetailsContainer>
        <Menu showMenu={false} />
        <DetailsBox>
          <DetailSideBar>
            <ClientInfo>
              <DetailsTitle>Cliente</DetailsTitle>

              <ClientInfoContainer>
                <div>
                  <AdmLabel>Nome</AdmLabel>
                  <DetailsText>{order && order.cliente.nome}</DetailsText>
                </div>

                <div>
                  <AdmLabel>Email</AdmLabel>
                  <DetailsText>{order && order.cliente.email}</DetailsText>
                </div>

                <div>
                  <AdmLabel>Telefone</AdmLabel>
                  <DetailsText>
                    {order && formatTel(order.cliente.tel)}
                  </DetailsText>
                </div>

                <div>
                  <AdmLabel>Data submissão</AdmLabel>
                  <DetailsText>
                    {order && formatDate(order.timeStamp.seconds)}
                  </DetailsText>
                </div>

                {order && order.dataAceito ? (
                  <div>
                    <AdmLabel>Data aceito</AdmLabel>
                    <DetailsText>
                      {order && formatDate(order.dataAceito.timeStamp.seconds)}
                    </DetailsText>
                  </div>
                ) : (
                  ''
                )}

                {order && order.dataCompleto ? (
                  <div>
                    <AdmLabel>Data completo</AdmLabel>
                    <DetailsText>
                      {order &&
                        formatDate(order.dataCompleto.timeStamp.seconds)}
                    </DetailsText>
                  </div>
                ) : (
                  ''
                )}
              </ClientInfoContainer>
            </ClientInfo>

            <ClientInfo style={{ marginTop: '25px' }}>
              <DetailsTitle>Financeiro</DetailsTitle>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '15px',
                }}
              >
                <span>
                  <AdmLabel>Valor total</AdmLabel>
                  <h2>{order && handleCurrency(order.total)}</h2>
                </span>

                <span>
                  <AdmLabel>Custo</AdmLabel>
                  <h2>{order && handleCurrency(order.custo)}</h2>
                </span>

                <span>
                  <AdmLabel>Retorno</AdmLabel>
                  <h2>{order && handleCurrency(order.retorno)}</h2>
                </span>

                <span>
                  <AdmLabel>Lucratividade</AdmLabel>
                  <h2>
                    {order && order.lucratividade}%
                    <PercentageIcon percentage={order && order.lucratividade} />
                  </h2>
                </span>
              </div>
            </ClientInfo>
          </DetailSideBar>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '25px',
            }}
          >
            <div>
              {order &&
                order.lista.map((item, index) => (
                  <ListaItemLine item={item} key={index} />
                ))}
            </div>

            {order && order.dataCompleto ? (
              ''
            ) : order && order.dataAceito ? (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '25px',
                }}
              >
                <ButtonPrimary
                  mediaquery={'600px'}
                  onClick={() => {
                    setModalText(['Deseja concluir esse pedido ?']);
                    setModal(true);
                    setModalHandleFunction(() => handleComplete);
                  }}
                >
                  Completar Pedido
                </ButtonPrimary>
              </div>
            ) : (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '25px',
                }}
              >
                <ButtonSecondary
                  mediaquery={'600px'}
                  onClick={() => {
                    setModalText([
                      'Deseja recusar esse pedido ?',
                      'Não será mais possível aceitá-lo.',
                    ]);
                    setModal(true);
                    setModalHandleFunction(() => handleRefuse);
                  }}
                >
                  Recusar Pedido
                </ButtonSecondary>
                <ButtonPrimary
                  mediaquery={'600px'}
                  onClick={() => {
                    setModalText([
                      'Deseja aceitar esse pedido ?',
                      'Não será mais possível cancela-lo.',
                    ]);
                    setModal(true);
                    setModalHandleFunction(() => handleAccept);
                  }}
                >
                  Aceitar Pedido
                </ButtonPrimary>
              </div>
            )}
          </div>

          <IngredientContainer>
            {ingredientes.map((item, index) => (
              <IngredientBox key={index}>
                <DetailsIngredient>
                  <IngredientQtd>{item.qtd}x</IngredientQtd>
                  <IngredientText>{item.nome}</IngredientText>
                </DetailsIngredient>
              </IngredientBox>
            ))}
          </IngredientContainer>
        </DetailsBox>
      </DetailsContainer>
    </>
  );
}
