import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';

import Header from '../../../components/Header';
import Menu from '../../../components/Menu';
import { useNavigate } from 'react-router-dom';
import { db } from '../../../services/firebase';
import { toast } from 'react-toastify';
import {
  AdmItemAdd,
  formattedDate,
  handleCurrency,
} from '../../../components/Adm';
import { SecondaryDivider } from '../../../components/Utils/styled';
import {
  AdmListItemName,
  AdmSearchInput,
} from '../../../components/Adm/styled.';
import {
  ProductEditBox,
  ProductEditContainer,
  ProductEditTitle,
  ProductHistoryRowContainer,
  ProductHistoryRowTitle,
  ProductQuantity,
} from '../../Estoque/styled';
import { FaSearch } from 'react-icons/fa';
import { AdmListTitleContainer } from '../../../components/Adm/styled.';

export default function FluxoDeCaixa() {
  const navigate = useNavigate();

  const [history, setHistory] = useState(null);
  const [newHistory, setNewHistory] = useState(null);

  const historyCollection = collection(db, 'history');

  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await getDocs(historyCollection);
        // data retorna uma response com muitos parametros
        // clean data serve para pegar apenas os dados dos produtos
        const cleanData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setHistory(cleanData);
        setNewHistory(cleanData);
      } catch (error) {
        console.log(error);
      }
    };
    getProducts();
  }, []);

  function ProductHistoryRow({ name, type, quantity, price, date }) {
    return (
      <span>
        <SecondaryDivider />
        <ProductHistoryRowContainer gridTemplate="1fr 1fr 1fr 1fr 0.5fr">
          <AdmListItemName>{name}</AdmListItemName>
          <ProductQuantity>{quantity}</ProductQuantity>
          <AdmListItemName>{price}</AdmListItemName>
          <AdmListItemName>{date}</AdmListItemName>
          <AdmListItemName>{type}</AdmListItemName>
        </ProductHistoryRowContainer>
        <SecondaryDivider />
      </span>
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
          <ProductEditTitle>Fluxo de Caixa</ProductEditTitle>
          <AdmListTitleContainer>
            <AdmItemAdd
              text={'Adicionar nova compra'}
              display={window.screen.width >= 600 ? 'flex' : 'none'}
            />
            <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <AdmSearchInput />
              <FaSearch style={{ height: '40px' }} />
            </span>
          </AdmListTitleContainer>

          <ProductHistoryRowTitle gridTemplate="1fr 1fr 1fr 1fr 0.5fr">
            <AdmListItemName>Nome</AdmListItemName>
            <AdmListItemName>
              {window.screen.width >= 600 ? 'Quantidade' : 'Qtd.'}
            </AdmListItemName>
            <AdmListItemName>Preço</AdmListItemName>
            <AdmListItemName>Data</AdmListItemName>
            <AdmListItemName>
              {window.screen.width >= 600 ? 'Operação' : 'Op.'}
            </AdmListItemName>
          </ProductHistoryRowTitle>
          {newHistory &&
            newHistory.map((entry, index) => {
              return (
                <ProductHistoryRow
                  name={entry.produto}
                  type={entry.tipo}
                  price={handleCurrency(entry.valor, null)}
                  quantity={entry.qtd}
                  date={formattedDate(entry.data.seconds)}
                  key={index}
                />
              );
            })}
        </ProductEditBox>
      </ProductEditContainer>
    </>
  );
}
