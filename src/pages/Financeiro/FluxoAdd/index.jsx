import React, { useEffect, useRef, useState } from 'react';
import {
  Timestamp,
  addDoc,
  collection,
  doc,
  getDocs,
  updateDoc,
} from 'firebase/firestore';

import { Link, useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';
import Header from '../../../components/Header';
import {
  ProductEditBox,
  ProductEditContainer,
  ProductEditTitle,
  ProductInput,
  ProductLabel,
} from '../../Estoque/styled';
import Menu from '../../../components/Menu';

import {
  ButtonPrimary,
  ButtonSecondary,
} from '../../../components/Button/styled';
import Select from 'react-select';
import { OperationForm } from './styled';
import { db } from '../../../services/firebase';
import { formattedDate } from '../../../components/Adm';

export default function FluxoAdd() {
  const navigate = useNavigate();

  const [product, setProduct] = useState({});
  const [operation, setOperation] = useState(null);
  const $quantity = useRef(null);
  const $date = useRef(null);

  const [products, setProducts] = useState([]);

  // pegando data atual e transformando para o padrão ISO
  // substr para tirar a parte de horas e segundos, deixando apenas a data
  const today = new Date().toISOString().substr(0, 10);

  const newProducts = [];

  const productsCollection = collection(db, 'products');

  const historyCollection = collection(db, 'history');

  // opções para o select de operações
  const operationOptions = [
    { value: 'compra', label: 'Compra' },
    { value: 'venda', label: 'Venda' },
  ];

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
      } catch (error) {
        console.log(error);
      }
    };
    getProducts();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();

    let quantity = $quantity.current.value;
    let date = formattedDate($date.current.value, true);

    let timeStampData = new Date($date.current.value);
    timeStampData.setMinutes(
      timeStampData.getMinutes() + timeStampData.getTimezoneOffset(),
    );
    let timeStamp = Timestamp.fromDate(timeStampData);

    try {
      await addDoc(historyCollection, {
        data: date,
        produto: product.product,
        qtd: Number(quantity),
        valor: Number(product.price * quantity),
        tipo: operation,
        timeStamp,
      });
      navigate('/financeiro/caixa');
      toast.success('Operação adicionada com sucesso!');
    } catch (error) {
      console.log(error);
    }

    try {
      if (operation == 'venda') quantity = Number(quantity) * -1;
      let newQtd = Number(Number(product.oldQtd) + Number(quantity));
      await updateDoc(doc(db, 'products', product.name), {
        qtd: newQtd,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // customStyles para os Selects
  const customStyles = {
    // option = dropDown menu com as opções
    option: (defaultStyles, state) => ({
      ...defaultStyles,
      color: state.isSelected ? '#ffffff' : '#212529',
      backgroundColor: state.isSelected ? '#212529' : '#ffffff',
      ':hover': {
        backgroundColor: '#000000',
        color: 'white',
      },
    }),

    // control = input estático (sem foco)
    control: (defaultStyles) => ({
      ...defaultStyles,
      backgroundColor: '#ffffff',
      border: '1px solid black',
      boxShadow: 'none',
      height: '40px',
      color: '#000000',
      ':hover': {
        border: '1px solid gray',
      },
    }),

    // singleValue = valor selecionado no input
    singleValue: (defaultStyles) => ({
      ...defaultStyles,
    }),
  };

  return (
    <>
      <Header
        style={true}
        auxText={window.screen.width >= 600 ? 'ADMINISTRATIVO' : 'ADMIN'}
      />
      <ProductEditContainer>
        <Menu />
        <ProductEditBox>
          <ProductEditTitle>Adicionar Operação</ProductEditTitle>
          <OperationForm
            onSubmit={(e) => handleAdd(e)}
            action=""
            style={{ height: 'auto' }}
          >
            <div>
              {/* verificando o tamanho de products antes de realizar um map
                map para criar um objeto de options para o Select de produtos */}
              {products.length > 0
                ? products.map((product) => {
                    newProducts.push({
                      value: product.id,
                      label: product.produto,
                      price: product.valor,
                      qtd: product.qtd,
                    });
                  })
                : ''}

              <ProductLabel>Produto</ProductLabel>
              <div style={{ width: '230px' }}>
                <Select
                  options={newProducts}
                  styles={customStyles}
                  placeholder="Selecione..."
                  required
                  onChange={(e) => {
                    setProduct({
                      name: e.value,
                      price: e.price,
                      oldQtd: e.qtd,
                    });
                  }}
                />
              </div>

              <ProductLabel>Quantidade</ProductLabel>
              <ProductInput ref={$quantity} type="number" required />

              <ProductLabel>Operação</ProductLabel>
              <div style={{ width: '230px' }}>
                <Select
                  options={operationOptions}
                  styles={customStyles}
                  placeholder="Selecione..."
                  required
                  onChange={(e) => {
                    setOperation(e.value);
                  }}
                />
              </div>

              <ProductLabel>Data</ProductLabel>
              <ProductInput
                ref={$date}
                type="date"
                defaultValue={today}
                required
              />
            </div>

            <div
              style={{
                display: 'flex',
                gap: '20px',
                marginTop: '50px',
              }}
            >
              <ButtonSecondary as={Link} to={'/financeiro/caixa'}>
                Cancelar
              </ButtonSecondary>
              <ButtonPrimary type="submit">Salvar</ButtonPrimary>
            </div>
          </OperationForm>
        </ProductEditBox>
      </ProductEditContainer>
    </>
  );
}
