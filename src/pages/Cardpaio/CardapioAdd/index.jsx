import React, { useEffect, useRef, useState } from 'react';
import { collection, doc, getDocs, setDoc } from 'firebase/firestore';
import Header from '../../../components/Header';
import {
  ProductEditBox,
  ProductEditContainer,
  ProductEditTitle,
  ProductForm,
  ProductInput,
  ProductLabel,
  ProductRadioContainer,
} from '../../Estoque/styled';
import Menu from '../../../components/Menu';
import {
  handleCurrency,
  handleProductValidation,
} from '../../../components/Adm';
import { toast } from 'react-toastify';
import { db } from '../../../services/firebase';
import { isEmpty } from '../../../components/Utils';
import { Link, useNavigate } from 'react-router-dom';
import {
  ButtonPrimary,
  ButtonSecondary,
} from '../../../components/Button/styled';
import Select from 'react-select';
import {
  Ingredient,
  IngredientBox,
  IngredientContainer,
  IngredientQtd,
  IngredientText,
  QuantityContainer,
} from './styled';
import { HiPlus, HiMinus } from 'react-icons/hi';

export default function CardapioAdd() {
  const navigate = useNavigate();

  const $name = useRef(null);
  const $nameLabel = useRef(null);
  const $quantity = useRef(null);
  const $price = useRef(null);
  const $desc = useRef(null);

  const [ingredientes, setIngredientes] = useState([]);

  const newProducts = [];

  const [products, setProducts] = useState([]);

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
      } catch (error) {
        console.log(error);
      }
    };
    getProducts();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();

    let name = $name.current.value;
    let quantity = $quantity.current.value;
    // convertendo o valor de BRL para um número padrão Float
    // Exemplo = R$ 4.575,23 -> 4575.23
    let price = ($price.current.value.replace(/\D/g, '') / 100).toFixed(2);
    let category = e.target.elements.categoria.value;
    let desc = $desc.current.value;

    if (
      isEmpty(name) ||
      isEmpty(quantity) ||
      isEmpty(price) ||
      isEmpty(category) ||
      ingredientes.length <= 0
    ) {
      toast.error('Preencha todos os campos primeiro!.');
      return;
    }

    try {
      // adicionando produto com os dados preenchidos
      // usando setDoc() ao inves de addDoc() para poder definir um iD
      // definindo o nome do produto como id
      await setDoc(
        // usando Regex para trocar espaços em brancos
        // no nome do produto por "_" para consistência do BD
        doc(db, 'menu', name.toLowerCase().replace(/\s+/g, '_')),
        {
          nome: name,
          categoria: category,
          desc: desc,
          qtd_min: Number(quantity),
          valor: Number(price),
          ingredientes: ingredientes,
        },
      );
      //   navigate('/estoque'); //! DESCOMENTAR ISSO DEPOIS
      toast.success('Produto adicionado com sucesso!');
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
          <ProductEditTitle>Adicionar Item ao Cardápio</ProductEditTitle>
          <ProductForm
            onSubmit={(e) => handleAdd(e)}
            action=""
            style={{ height: 'auto', gridTemplateColumns: '1fr 2fr 1fr' }}
            onChange={() =>
              // Função para validação de dados dos inputs
              // Parametros useRefs sendo passados
              handleProductValidation($name, $nameLabel)
            }
          >
            {
              // formatando os objetos para colocar em um novo array
              // necessário para usar o Select com todaas infos necessárias
              products.length > 0
                ? products.map((product) => {
                    newProducts.push({
                      value: product.id,
                      label: product.produto,
                      price: Number(product.valor),
                      qtd: 1,
                    });
                  })
                : ''
            }
            <div>
              <ProductLabel ref={$nameLabel}>Nome</ProductLabel>
              <ProductInput ref={$name} type="text" required />

              <ProductLabel>Quantidade Mínima</ProductLabel>
              <ProductInput
                ref={$quantity}
                type="number"
                required
                onInput={(e) => {
                  // remover caracteres não numéricos
                  e.target.value = e.target.value.replace(/\D/g, '');
                }}
              />

              <ProductLabel>Valor unitário</ProductLabel>
              <ProductInput
                ref={$price}
                type="text"
                onInput={() => {
                  handleCurrency(null, $price);
                }}
                required
              />

              <ProductLabel>Descrição</ProductLabel>
              <ProductInput ref={$desc} type="text" />

              <ProductLabel>Ingredientes</ProductLabel>
              <div style={{ width: '230px' }}>
                <Select
                  options={newProducts}
                  styles={customStyles}
                  placeholder="Selecione..."
                  required
                  onChange={(item) => {
                    setIngredientes((ingredientes) => {
                      // evitando a adição duplicada de ingredientes
                      const objetoExistente = ingredientes.find(
                        (obj) => obj.id === item.value,
                      );

                      if (objetoExistente) {
                        objetoExistente.qtd += Number(item.qtd);
                        return [...ingredientes]; // adicionar qtd ao obj já existente dentro do state
                      }

                      // trocando o nome das chaves de item para o padrão de ingredientes
                      return [
                        ...ingredientes,
                        {
                          nome: item.label,
                          id: item.value,
                          qtd: item.qtd,
                        },
                      ];
                    });
                  }}
                />
              </div>
            </div>

            <IngredientContainer>
              {ingredientes.map((item, index) => (
                <IngredientBox key={index}>
                  <Ingredient>
                    <IngredientQtd>{item.qtd}x</IngredientQtd>
                    <IngredientText>{item.nome}</IngredientText>
                  </Ingredient>
                  <QuantityContainer>
                    <a
                      // criando um novo array baseado no de state de ingredientes
                      // necessário para re-renderizar o map a cada mudança de qtd
                      onClick={() => {
                        const newIngredientes = [...ingredientes];
                        newIngredientes[index] = { ...item, qtd: item.qtd + 1 };
                        setIngredientes(newIngredientes);
                      }}
                    >
                      <HiPlus size={20} />
                    </a>
                    <a
                      onClick={() => {
                        const newIngredientes = [...ingredientes];
                        newIngredientes[index] = { ...item, qtd: item.qtd - 1 };
                        if (item.qtd - 1 <= 0) {
                          // remove o item do array se a (quantidade - 1) for menor ou igual a 0
                          newIngredientes.splice(index, 1);
                        }
                        setIngredientes(newIngredientes);
                      }}
                    >
                      <HiMinus size={20} />
                    </a>
                  </QuantityContainer>
                </IngredientBox>
              ))}
            </IngredientContainer>

            <ProductRadioContainer>
              <h2 style={{ marginBottom: '20px' }}>Categoria</h2>
              <ProductLabel>
                <ProductInput
                  marginRight={'15px'}
                  width={'25px'}
                  type="radio"
                  name="categoria"
                  value="bebida"
                  required
                />
                Bebidas
              </ProductLabel>
              <ProductLabel>
                <ProductInput
                  marginRight={'15px'}
                  width={'25px'}
                  type="radio"
                  name="categoria"
                  value="confeitaria"
                  required
                />
                Confeitaria
              </ProductLabel>
              <ProductLabel>
                <ProductInput
                  marginRight={'15px'}
                  width={'25px'}
                  type="radio"
                  name="categoria"
                  value="doce"
                  required
                />
                Doces
              </ProductLabel>
              <ProductLabel>
                <ProductInput
                  marginRight={'15px'}
                  width={'25px'}
                  type="radio"
                  name="categoria"
                  value="salgado"
                  required
                />
                Salgados
              </ProductLabel>
            </ProductRadioContainer>

            <div
              style={{
                display: 'flex',
                gap: '20px',
                marginTop: '50px',
              }}
            >
              <ButtonSecondary
                as={Link}
                to={'/estoque'}
                style={{ width: '120px' }}
              >
                Cancelar
              </ButtonSecondary>
              <ButtonPrimary type="submit" style={{ width: '120px' }}>
                Salvar
              </ButtonPrimary>
            </div>
          </ProductForm>
        </ProductEditBox>
      </ProductEditContainer>
    </>
  );
}
