/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import {
  CardapioBox,
  CardapioCategories,
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
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../services/firebase';
import { handleCurrency } from '../../components/Adm';

function CardapioItemBlock({ name, price, quantity, desc }) {
  return (
    <Link>
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

function CardapioItemBuild({ category, items }) {
  return items.length > 0 ? (
    <section style={{ marginBottom: '50px' }}>
      <CardapioTitle>{category}</CardapioTitle>
      {items.map((item) => (
        <CardapioItemBlock
          name={item.nome}
          price={handleCurrency(item.valor)}
          quantity={item.qtd_min}
          desc={item.desc ?? ''}
        />
      ))}
    </section>
  ) : (
    <></>
  );
}

export default function Cardapio() {
  const [doces, setDoces] = useState([]);
  const [salgados, setSalgados] = useState([]);
  const [confeitaria, setConfeitaria] = useState([]);
  const [bebidas, setBebidas] = useState([]);

  const [items, setItems] = useState(null);
  const [newItems, setNewItems] = useState(null);

  const itemsCollection = collection(db, 'menu');

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
    getItems();
  }, []);

  useEffect(() => {
    items
      ? items.map((item) => {
          if (item.categoria == 'doce') {
            setDoces((doces) => [...doces, item]);
          } else if (item.categoria == 'salgado') {
            setSalgados((salgados) => [...salgados, item]);
          } else if (item.categoria == 'confeitaria') {
            setConfeitaria((confeitaria) => [...confeitaria, item]);
          } else {
            setBebidas((bebidas) => [...bebidas, item]);
          }
        })
      : '';
  }, [items]);

  return (
    <>
      <Header />
      <CardapioContainer>
        <CardapioBox>
          <CardapioSideBar>
            <CardapioTitle>Categorias</CardapioTitle>
            <CardapioCategories>Doces</CardapioCategories>
            <CardapioCategories>Salgados</CardapioCategories>
            <CardapioCategories>Confeitaria</CardapioCategories>
            <CardapioCategories>Bebidas</CardapioCategories>
          </CardapioSideBar>
          <CardapioList>
            <CardapioItemList>
              <CardapioItemBuild category={'Doces'} items={doces} />
              <CardapioItemBuild category={'Salgados'} items={salgados} />
              <CardapioItemBuild category={'Confeitaria'} items={confeitaria} />
              <CardapioItemBuild category={'Bebidas'} items={bebidas} />
            </CardapioItemList>
          </CardapioList>
        </CardapioBox>
      </CardapioContainer>
    </>
  );
}
