import React, { useEffect, useState } from 'react';
import { SecondaryDivider } from '../../components/Utils/styled';
import { ButtonPrimary, ButtonSecondary } from '../../components/Button/styled';
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
  AdmModal,
  AdmModalContainer,
  AdmModalText,
  AdmSearchInput,
} from '../../components/Adm/styled.';
import { AdmItemAdd } from '../../components/Adm';
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { db } from '../../services/firebase';
import { Link } from 'react-router-dom';
import { IoMdArrowDropdown } from 'react-icons/io';
import Fuse from 'fuse.js';
import { isEmpty } from '../../components/Utils';
import { toast } from 'react-toastify';

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

function ProductRow({ name, quantity, id, index, setState, setUser }) {
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
          to={`/estoque/edit/${id}`}
        >
          Editar
        </ButtonPrimary>
        <ButtonPrimary
          width="150px"
          fontsize="12px"
          fonthover="16px"
          mediaquery="800px"
          mediaquerywidth="65px"
          onClick={() => {
            setState(true);
            setUser({ name, id, index });
          }}
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

  const [modal, setModal] = useState(false);
  // useState para tratar do cliente sendo deletado
  const [productDelete, setProductDelete] = useState({
    name: '',
    id: '',
    index: '',
  });

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
      // o sort() em JS tbm verifica os nomes com Upper Case
      // o que acaba dando inconsistencia na ordenação
      // para evitar isso, passa-se os parametros em que os nomes
      // irão ser organizados
      // -1 desce uma posição na lista
      // 1 sobe
      // variável orderName para saber se é para inverter ou não
      orderName
        ? setNewProducts([
            ...products.sort((a, b) =>
              a.produto.toLowerCase() < b.produto.toLowerCase() ? -1 : 1,
            ),
          ])
        : setNewProducts([
            ...products.sort((a, b) =>
              a.produto.toLowerCase() > b.produto.toLowerCase() ? -1 : 1,
            ),
          ]);
    } else {
      orderQtd
        ? setNewProducts([...products.sort((a, b) => a.qtd - b.qtd)])
        : setNewProducts([...products.sort((a, b) => b.qtd - a.qtd)]);
    }
  }

  function searchProducts(e) {
    if (isEmpty(e.target.value)) {
      setNewProducts(products);
    } else {
      setSearch(e.target.value);
      // usando a biblioteca fuse js para dar search
      const fuse = new Fuse(products, {
        threshold: 0.2,
        keys: ['produto', 'qtd', 'categoria'],
      });

      // colocando o resultado da pesquisa dentro de newProducts
      setNewProducts(fuse.search(search));
    }
  }

  async function deleteProduct(id) {
    try {
      // deletando produto baseado em seu id
      await deleteDoc(doc(db, 'products', id));
      setModal(false);
      // retirando o produto do state newProduct
      newProducts.splice(productDelete.index, 1);
      // [...newProducts ] é estritamente necessário para que
      // o map feito com o state seja atuomaticamente atualizado
      // reduzindo a necessidade de um novo useEffect
      setNewProducts([...newProducts]);
      toast.success(`Produto ${productDelete.name} deletado com sucesso !`);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      {/* renderizando modal de exclusão com display none */}
      <AdmModalContainer
        // top para calcular o quanto o cliente já rolou na pagina
        style={{ display: modal ? 'flex' : 'none', top: window.pageYOffset }}
        onClick={() => setModal(false)}
      >
        <AdmModal>
          <AdmModalText>
            Deseja realmente excluir o produto: {<br />} {productDelete.name} ?
          </AdmModalText>

          <ButtonSecondary
            onClick={() => setModal(false)}
            mediaquery="600px"
            style={{ placeSelf: 'center' }}
          >
            Cancelar
          </ButtonSecondary>
          <ButtonPrimary
            onClick={() => deleteProduct(productDelete.id)}
            mediaquery="600px"
            style={{ placeSelf: 'center' }}
          >
            Deletar
          </ButtonPrimary>
        </AdmModal>
      </AdmModalContainer>

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
              <AdmSearchInput
                onChange={(e) => searchProducts(e)}
                placeholder="Produto, categoria, qtd..."
              />
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
                id={product.id ?? product.item.id}
                name={product.produto ?? product.item.produto}
                quantity={product.qtd ?? product.item.qtd}
                key={index}
                index={index}
                setState={setModal}
                setUser={setProductDelete}
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
