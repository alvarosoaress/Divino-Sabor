import React, { useEffect, useState } from 'react';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';

import Header from '../../../components/Header';
import Menu from '../../../components/Menu';
import { db } from '../../../services/firebase';
import { handleCurrency } from '../../../components/Adm';
import { SecondaryDivider } from '../../../components/Utils/styled';
import { AdmListItemName } from '../../../components/Adm/styled.';
import {
  ProductEditBox,
  ProductEditContainer,
  ProductEditTitle,
  ProductHistoryRowContainer,
  ProductHistoryRowTitle,
  ProductQuantity,
} from '../../Estoque/styled';
import { ButtonPrimary } from '../../../components/Button/styled';

export function ProductHistoryRow({ date, total, cost, value, percent }) {
  // função para Lucratividade mudar de cor de acordo com valor de percent
  // quanto mais próximo de 100 mais verde será
  // o número multiplicando percent define o quanto de verde terá
  // quanto maior esse número, mais cedo irá começar o verde

  // por ex -> em 2 40% é vermelho
  // por ex -> em 3.5 40% é verde amarelado
  // por ex -> em 4 40% é verde claro

  const color = `rgb(${Math.round(255 - percent * 4.5)}, ${Math.round(
    percent * 4.5,
  )}, 0)`;

  return (
    <span>
      <SecondaryDivider />
      <ProductHistoryRowContainer gridTemplate="repeat(5,1fr) 0.5fr">
        <AdmListItemName>{date}</AdmListItemName>
        <ProductQuantity>{handleCurrency(total)}</ProductQuantity>
        <AdmListItemName>{handleCurrency(cost)}</AdmListItemName>
        <AdmListItemName>{handleCurrency(value)}</AdmListItemName>
        <AdmListItemName style={{ color: color, textAlign: 'center' }}>
          {percent}%
        </AdmListItemName>
        <ButtonPrimary width="100px">Ver mais+</ButtonPrimary>
      </ProductHistoryRowContainer>
      <SecondaryDivider />
    </span>
  );
}

export default function PedidosSubmetidos() {
  const [orders, setOrders] = useState(null);

  const [menu, setMenu] = useState(null);

  const [products, setProducts] = useState(null);

  let objMenu;
  let menuItem;
  let objProducts;

  const ordersCollection = query(
    collection(db, 'orders'),
    orderBy('timeStamp', 'desc'),
  );

  useEffect(() => {
    const getOrders = async () => {
      try {
        const data = await getDocs(ordersCollection);
        const cleanData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setOrders(cleanData);
      } catch (error) {
        console.log(error);
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
    getOrders();
    getMenu();
    getProducts();
  }, []);

  function OrderRow({ order, index }) {
    // calculando o valor total de compra
    // reduce retorna cada obj de order.lista
    // comparando cada obj.id com menu id para encontrar
    // o valor atual do item
    let orderTotal = order.lista.reduce((accumulator, currentValue) => {
      if (menu) {
        objMenu = menu.find((obj) => obj.id === currentValue.id);
      }
      if (objMenu !== undefined) {
        return objMenu.valor * currentValue.qtd + accumulator;
      }
    }, 0);

    // calculando o valor de produção de cada item dentro de order
    // map retorna cada item dentro da order.lista
    // find comapara cada item.id com menu id para encontrar
    // o item em questão dentro da collection menu
    // qual contem os ingredientes desse item
    // logo fazendo um reduce nessa lista de ingredientes
    // comparando cada ingrediente.id com product.id para encontrar
    // o valor unitário atual de cada ingrediente
    let orderCost = order.lista.map((item) => {
      if (menu) {
        menuItem = menu.find((menuItem) => menuItem.id === item.id);
        if (objMenu !== undefined) {
          return menuItem.ingredientes.reduce((accumulator, currentValue) => {
            if (products) {
              objProducts = products.find((obj) => obj.id === currentValue.id);
              if (objProducts !== undefined) {
                return (
                  objProducts.valor *
                    currentValue.qtd *
                    (item.qtd / menuItem.qtd_min) +
                  accumulator
                );
              }
            }
            // adiciona um return do accumulator para não quebrar a redução
            // está sendo realizado um map e um reduce dentro desse map
            // maps retornam um novo array, ou seja, sem esse return accumulator
            // iria ser atribuido um novo array à orderCost
            return accumulator;
          }, 0);
        }
      }
    });

    let orderValue = orderTotal - orderCost;

    let percent = Math.round(((orderValue * 100) / orderTotal) * 100) / 100;

    return (
      <ProductHistoryRow
        date={order.data}
        total={orderTotal}
        cost={orderCost}
        value={orderValue}
        percent={percent}
        key={index}
      />
    );
  }

  return (
    <>
      <Header
        style={true}
        auxText={window.screen.width >= 600 ? 'ADMINISTRATIVO' : 'ADMIN'}
      />
      <ProductEditContainer>
        <Menu />
        <ProductEditBox>
          <ProductEditTitle>Pedidos Submetidos</ProductEditTitle>

          <ProductHistoryRowTitle gridTemplate="repeat(5, 1fr) 0.5fr">
            <AdmListItemName>Data</AdmListItemName>
            <AdmListItemName>Valor Total</AdmListItemName>
            <AdmListItemName>Custo</AdmListItemName>
            <AdmListItemName>Retorno</AdmListItemName>
            <AdmListItemName>Lucratividade</AdmListItemName>
          </ProductHistoryRowTitle>
          {orders &&
            orders.map((order, index) => (
              <OrderRow order={order} index={index} key={index} />
            ))}
        </ProductEditBox>
      </ProductEditContainer>
    </>
  );
}
