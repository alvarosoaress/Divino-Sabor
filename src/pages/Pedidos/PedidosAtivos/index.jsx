import React, { useEffect, useState } from 'react';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';

import Header from '../../../components/Header';
import Menu from '../../../components/Menu';
import { db } from '../../../services/firebase';
import {
  PercentageIcon,
  formattedDate,
  handleCurrency,
} from '../../../components/Adm';
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
import { Link } from 'react-router-dom';

export function ProductHistoryRow({ date, total, cost, value, percent, id }) {
  return (
    <span>
      <SecondaryDivider />
      <ProductHistoryRowContainer gridTemplate="repeat(5,1fr) 0.5fr">
        <AdmListItemName>{formattedDate(date)}</AdmListItemName>
        <ProductQuantity>{handleCurrency(total)}</ProductQuantity>
        <AdmListItemName>{handleCurrency(cost)}</AdmListItemName>
        <AdmListItemName>{handleCurrency(value)}</AdmListItemName>
        <AdmListItemName style={{ textAlign: 'center' }}>
          {percent}% <PercentageIcon percentage={percent} />
        </AdmListItemName>
        <ButtonPrimary
          mediaquery={'600px'}
          width="100px"
          as={Link}
          to={`/pedidos/detalhes/${id}`}
        >
          Ver mais+
        </ButtonPrimary>
      </ProductHistoryRowContainer>
      <SecondaryDivider />
    </span>
  );
}

export default function PedidosAtivos() {
  const [orders, setOrders] = useState(null);

  const ordersCollection = query(
    collection(db, 'orders-accepted'),
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
    getOrders();
  }, []);

  return (
    <>
      <Header
        style={true}
        auxText={window.screen.width >= 600 ? 'ADMINISTRATIVO' : 'ADMIN'}
      />
      <ProductEditContainer>
        <Menu showMenu={false} />
        <ProductEditBox>
          <ProductEditTitle>Pedidos Ativos</ProductEditTitle>

          <ProductHistoryRowTitle gridTemplate="repeat(5, 1fr) 0.5fr">
            <AdmListItemName>Data aceito</AdmListItemName>
            <AdmListItemName>Valor Total</AdmListItemName>
            <AdmListItemName>Custo</AdmListItemName>
            <AdmListItemName>Retorno</AdmListItemName>
            <AdmListItemName>Lucratividade</AdmListItemName>
          </ProductHistoryRowTitle>
          {orders &&
            orders.map((order, index) => (
              <ProductHistoryRow
                date={order.dataAceito.timeStamp.seconds}
                total={order.total}
                cost={order.custo}
                value={order.retorno}
                percent={order.lucratividade}
                id={order.id}
                key={index}
              />
            ))}
        </ProductEditBox>
      </ProductEditContainer>
    </>
  );
}
