import React, { useEffect, useState } from 'react';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';

import Header from '../../../components/Header';
import Menu from '../../../components/Menu';
import { db } from '../../../services/firebase';
import { AdmItemAdd, handleCurrency } from '../../../components/Adm';
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
import { isEmpty } from '../../../components/Utils';
import Fuse from 'fuse.js';

export function ProductHistoryRow({ name, type, quantity, price, date }) {
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

export default function FluxoDeCaixa() {
  //   const navigate = useNavigate();

  const [history, setHistory] = useState(null);
  const [newHistory, setNewHistory] = useState(null);

  const [search, setSearch] = useState('');

  const historyCollection = query(
    collection(db, 'history'),
    orderBy('timeStamp', 'desc'),
  );

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

  function searchHistory(e) {
    if (isEmpty(e.target.value)) {
      setNewHistory(history);
    } else {
      setSearch(e.target.value);
      // usando a biblioteca fuse js para dar search
      const fuse = new Fuse(history, {
        threshold: 0.2,
        keys: ['produto', 'tipo'],
      });

      // colocando o resultado da pesquisa dentro de newHistory
      setNewHistory([...fuse.search(search)]);
    }
  }

  //   function setFilter(e) {
  //     setNewHistory(history.filter((item) => item.tipo.match(e.target.value)));
  //   }

  return (
    <>
      <Header
        style={true}
        auxText={window.screen.width >= 600 ? 'ADMINISTRATIVO' : 'ADMIN'}
      />
      <ProductEditContainer>
        <Menu showMenu={false} />
        <ProductEditBox>
          <ProductEditTitle>Fluxo de Caixa</ProductEditTitle>
          <AdmListTitleContainer>
            <AdmItemAdd
              text={'Adicionar nova operação'}
              link={'/financeiro/caixa/add'}
              display={window.screen.width >= 600 ? 'flex' : 'none'}
            />
            <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <AdmSearchInput
                onChange={(e) => searchHistory(e)}
                placeholder="Produto, operação..."
              />
              <FaSearch style={{ height: '40px' }} />
            </span>
          </AdmListTitleContainer>

          <ProductHistoryRowTitle gridTemplate="1fr 1fr 1fr 1fr 0.5fr">
            <AdmListItemName>Nome</AdmListItemName>
            <AdmListItemName>
              {window.screen.width >= 600 ? 'Quantidade' : 'Qtd.'}
            </AdmListItemName>
            <AdmListItemName>Total</AdmListItemName>
            <AdmListItemName>Data</AdmListItemName>
            <AdmListItemName>
              {window.screen.width >= 600 ? 'Operação' : 'Op.'}
            </AdmListItemName>
          </ProductHistoryRowTitle>
          {newHistory &&
            newHistory.map((entry, index) => {
              return (
                <ProductHistoryRow
                  name={entry.produto ?? entry.item.produto}
                  type={entry.tipo ?? entry.item.tipo}
                  price={
                    entry.valor || entry.item.valor
                      ? handleCurrency(entry.valor ?? entry.item.valor, null)
                      : ''
                  }
                  quantity={entry.qtd ?? entry.item.qtd}
                  date={entry.data ?? entry.item.data}
                  key={index}
                />
              );
            })}
        </ProductEditBox>
      </ProductEditContainer>
    </>
  );
}
