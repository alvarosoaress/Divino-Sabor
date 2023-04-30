import React, { useEffect, useState } from 'react';
import Header from '../../../../../components/Header';
import { Container } from '../../../../../components/OptionsBox/styled';
import Menu from '../../../../../components/Menu';
import {
  ClientInfo,
  ClientInfoContainer,
  DetailSideBar,
  DetailsBox,
  DetailsIngredient,
  DetailsText,
  DetailsTitle,
} from './styled';
import { AdmLabel } from '../../../../../components/Adm/styled.';
import { db } from '../../../../../services/firebase';
import { useParams } from 'react-router-dom';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import {
  PercentageIcon,
  formatTel,
  handleCurrency,
} from '../../../../../components/Adm';
import {
  ListaItem,
  ListaItemName,
  ListaOptionsContainer,
  ListaPrice,
  ListaQuantity,
} from '../../../../Lista/styled';
import { CardapioItemSeparator } from '../../../../Cardpaio/styled,';
import {
  IngredientBox,
  IngredientContainer,
  IngredientQtd,
  IngredientText,
} from '../../../../Cardpaio/CardapioAdd/styled';
import {
  ButtonPrimary,
  ButtonSecondary,
} from '../../../../../components/Button/styled';

export default function PedidosSubDetalhes() {
  const { id } = useParams();

  const [order, setOrder] = useState(null);
  const [menu, setMenu] = useState(null);
  const [products, setProducts] = useState(null);

  //   const [orderCost, setOrderCost] = useState('null');
  //   const [orderTotal, setOrderTotal] = useState('null');
  //   const [orderValue, setOrderValue] = useState('null');
  //   const [percent, setPercent] = useState('null');

  const orderRef = doc(db, 'orders', id);

  let objMenu;
  let objProducts;
  let orderCost;
  let orderTotal;
  let orderValue;
  let percent;
  let ingredientes = [];

  // pegando as informações do produto na DB
  useEffect(() => {
    const getOrder = async () => {
      try {
        const response = await getDoc(orderRef);
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
    async function getProducts() {
      try {
        const menuCollection = collection(db, 'products');
        const data = await getDocs(menuCollection);
        // data retorna uma response com muitos parametros
        // clean data serve para pegar apenas os dados dos produtos
        const cleanData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        setProducts(cleanData);
      } catch (error) {
        console.log(error);
      }
    }
    getOrder();
    getProducts();
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

  function CalcValue() {
    if (order && ingredientes) {
      // calculando o valor total de compra
      // reduce retorna cada obj de order.lista
      // comparando cada obj.id com menu id para encontrar
      // o valor atual do item
      orderTotal = order.lista.reduce((accumulator, currentValue) => {
        if (menu) {
          objMenu = menu.find((obj) => obj.id === currentValue.id);
        }
        if (objMenu !== undefined) {
          return objMenu.valor * currentValue.qtd + accumulator;
        }
      }, 0);

      // calculando valor de produção de cada ingrediente
      orderCost = ingredientes.reduce((accumulator, currentValue) => {
        if (products) {
          objProducts = products.find((obj) => obj.id === currentValue.id);
          if (objProducts !== undefined) {
            return objProducts.valor * currentValue.qtd + accumulator;
          }
        }
        return accumulator;
      }, 0);

      orderValue = orderTotal - orderCost;

      percent = Math.round(((orderValue * 100) / orderTotal) * 100) / 100;

      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <span>
            <AdmLabel>Valor total</AdmLabel>
            <h2>{handleCurrency(orderTotal)}</h2>
          </span>

          <span>
            <AdmLabel>Custo</AdmLabel>
            <h2>{handleCurrency(orderCost)}</h2>
          </span>

          <span>
            <AdmLabel>Retorno</AdmLabel>
            <h2>{handleCurrency(orderValue)}</h2>
          </span>

          <span>
            <AdmLabel>Lucratividade</AdmLabel>
            <h2>
              {percent}% <PercentageIcon percentage={percent} />
            </h2>
          </span>
        </div>
      );
    }
  }

  return (
    <>
      {orderIngredients()}
      <Header
        style={true}
        auxText={window.screen.width >= 800 ? 'ADMINISTRATIVO' : 'ADMIN'}
      />
      <Container>
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
              </ClientInfoContainer>
            </ClientInfo>
            <ClientInfo style={{ marginTop: '25px' }}>
              <DetailsTitle>Financeiro</DetailsTitle>
              <CalcValue />
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
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '25px',
              }}
            >
              <ButtonSecondary>Recusar Pedido</ButtonSecondary>
              <ButtonPrimary>Aceitar Pedido</ButtonPrimary>
            </div>
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
      </Container>

      <Container></Container>
    </>
  );
}
