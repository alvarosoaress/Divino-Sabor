import React, { useEffect, useState } from 'react';
import { SecondaryDivider } from '../../components/Utils/styled';
import { ButtonPrimary } from '../../components/Button/styled';
import {
  ProductOrderButton,
  ProductOrderContainer,
  ProductQuantity,
  ProductRowContainer,
} from './styled';
import Header from '../../components/Header';
import Menu from '../../components/Menu';
import { FaSearch } from 'react-icons/fa';
import {
  AdmListBox,
  AdmListContainer,
  AdmListItemName,
  AdmListTable,
  AdmListTitleContainer,
  AdmSearchInput,
} from '../../components/Adm/styled.';
import { AdmItemAdd } from '../../components/Adm';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../services/firebase';
import { Link } from 'react-router-dom';
import { IoMdArrowDropdown } from 'react-icons/io';
import Fuse from 'fuse.js';
import { isEmpty } from '../../components/Utils';

/// const queryProductType = query(
//   productCollection,
//   where('type', '==', 'doce'),
// );

// import { collection, query, where } from 'firebase/firestore'
//
// const queryConstraints = []
// if (group != null) queryConstraints.push(where('group', '==', group))
// if (pro != null) queryConstraints.push(where('pro', '==', pro))
// const q = query(collection(db, 'videos'), ...queryConstraints)
//

function ProductRow({ name, quantity, uid }) {
  return (
    <span>
      <SecondaryDivider />
      <ProductRowContainer>
        <AdmListItemName>{name}</AdmListItemName>
        <ProductQuantity>{quantity}</ProductQuantity>
        <ButtonPrimary
          width="150px"
          fontsize="12px"
          fonthover="16px"
          mediaquery="800px"
          mediaquerywidth="65px"
          as={Link}
          to={`/estoque/edit/${uid}`}
        >
          Editar
        </ButtonPrimary>
        <ButtonPrimary
          width="150px"
          fontsize="12px"
          fonthover="16px"
          mediaquery="800px"
          mediaquerywidth="65px"
        >
          Excluir
        </ButtonPrimary>
      </ProductRowContainer>
      <SecondaryDivider />
    </span>
  );
}

export default function Estoque() {
  const [products, setProducts] = useState([]);
  const [newProducts, setNewProducts] = useState([]);

  const [orderQtd, setOrderQtd] = useState(false);
  const [orderName, setOrderName] = useState(false);

  const [search, setSearch] = useState('');

  const productsCollection = collection(db, 'products');

  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await getDocs(productsCollection);
        // data retorna uma response com muitos parametros
        // clean data serve para pegar apenas os dados dos produtos
        const cleanData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setProducts(cleanData);
        setNewProducts(cleanData);
      } catch (error) {
        console.log(error);
      }
    };
    getProducts();
  }, []);

  function handleOrderChange(name) {
    if (name) {
      setNewProducts([
        ...products.sort((a, b) => a.produto[0] - b.produto[0]).reverse(),
      ]);
    } else {
      orderQtd
        ? setNewProducts([...products.sort((a, b) => a.qtd - b.qtd)])
        : setNewProducts([...products.sort((a, b) => b.qtd - a.qtd)]);
    }
  }

  function searchClients(e) {
    if (isEmpty(e.target.value)) {
      setNewProducts(products);
    } else {
      setSearch(e.target.value);
      // usando a biblioteca fuse js para dar search
      const fuse = new Fuse(products, {
        threshold: 0.1,
        keys: ['produto', 'qtd'],
      });

      // colocando o resultado da pesquisa dentro de newProducts
      setNewProducts(fuse.search(search));
    }
  }

  return (
    <>
      <Header
        style={true}
        auxText={window.screen.width >= 600 ? 'ADMINISTRATIVO' : 'ADMIN'}
      />
      <AdmListContainer>
        <Menu />

        <AdmListBox>
          <AdmListTitleContainer>
            <AdmItemAdd
              link={'/estoque/add'}
              text={'Adicionar novo produto'}
              display={window.screen.width >= 600 ? 'flex' : 'none'}
            />
            <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <AdmSearchInput onChange={(e) => searchClients(e)} />
              <FaSearch style={{ height: '40px' }} />
            </span>
          </AdmListTitleContainer>

          <ProductOrderContainer>
            <ProductOrderButton
              disabled={orderQtd}
              onClick={() => {
                handleOrderChange(true);
                setOrderName(!orderName);
              }}
            >
              {window.screen.width >= 600 ? 'Produto' : 'Nome'}
              <IoMdArrowDropdown
                size={25}
                style={{
                  transition: 'all 200ms ease-in-out',
                  rotate: orderName ? '0deg' : '180deg',
                }}
              />
            </ProductOrderButton>
            <ProductOrderButton
              disabled={orderName}
              onClick={() => {
                handleOrderChange();
                setOrderQtd(!orderQtd);
              }}
            >
              {window.screen.width >= 600 ? 'Quantidade' : 'Qtd.'}
              <IoMdArrowDropdown
                size={25}
                style={{
                  transition: 'all 200ms ease-in-out',
                  rotate: orderQtd ? '0deg' : '180deg',
                }}
              />
            </ProductOrderButton>
          </ProductOrderContainer>

          <AdmListTable>
            {newProducts.map((product, index) => (
              <ProductRow
                uid={product.id ?? product.item.id}
                name={product.produto ?? product.item.produto}
                quantity={product.qtd ?? product.item.qtd}
                key={index}
              />
            ))}
          </AdmListTable>
          <AdmItemAdd
            link={'/estoque/add'}
            text={'Adicionar novo produto'}
            display={window.screen.width < 600 ? 'flex' : 'none'}
          />
        </AdmListBox>
      </AdmListContainer>
    </>
  );
}
