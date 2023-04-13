import React, { useEffect, useRef, useState } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

import Header from '../../../components/Header';
import Menu from '../../../components/Menu';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { db } from '../../../services/firebase';
import { toast } from 'react-toastify';
import {
  ButtonPrimary,
  ButtonSecondary,
} from '../../../components/Button/styled';
import {
  handleCurrency,
  handleProductValidation,
} from '../../../components/Adm';
import {
  ProductRadioContainer,
  ProductEditBox,
  ProductEditContainer,
  ProductEditTilte,
  ProductForm,
  ProductInput,
  ProductLabel,
} from '../styled';
import { isEmpty } from '../../../components/Utils';

export default function EstoqueEdit() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [product, setProduct] = useState({});

  const [radioGroup, setRadioGroup] = useState([]);

  const [aux, setAux] = useState(true);

  const $name = useRef(null);
  const $nameLabel = useRef(null);
  const $quantity = useRef(null);
  const $price = useRef(null);

  const $radioGroup = useRef(null);

  const productRef = doc(db, 'products', id);

  // pegando as informações do produto na DB
  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await getDoc(productRef);
        const cleanData = response.data();
        cleanData.valor = handleCurrency(cleanData.valor);
        setProduct(cleanData);
      } catch (error) {
        console.error(error);
      }
    };
    getUser();
  }, []);

  const handleEdit = async (e) => {
    e.preventDefault();

    let name = $name.current.value;
    let quantity = $quantity.current.value;
    // convertendo o valor de BRL para um número padrão Float
    // Exemplo = R$ 4.575,23 -> 4575.23
    let price = ($price.current.value.replace(/\D/g, '') / 100).toFixed(2);
    let category = e.target.elements.categoria.value;

    if (
      isEmpty(name) ||
      isEmpty(quantity) ||
      isEmpty(price) ||
      isEmpty(category)
    ) {
      toast.error('Preencha todos os campos primeiro!.');
      return;
    }

    try {
      // editando produto com os dados preenchidos
      await updateDoc(doc(db, 'products', id), {
        categoria: category,
        produto: name,
        qtd: quantity,
        valor: price,
      });
      navigate('/estoque');
      toast.success('Produto adicionado com sucesso!');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {console.log(product)}
      <Header
        style={true}
        auxText={window.screen.width >= 600 ? 'ADMINISTRATIVO' : 'ADMIN'}
      />
      <ProductEditContainer>
        <Menu />
        <ProductEditBox>
          <ProductEditTilte>Editar Produto</ProductEditTilte>
          <ProductForm
            onSubmit={(e) => handleEdit(e)}
            action=""
            style={{ height: 'auto' }}
            onChange={() =>
              // Função para validação de dados dos inputs
              // Parametros useRefs sendo passados
              handleProductValidation($name, $nameLabel)
            }
          >
            <div>
              <ProductLabel ref={$nameLabel}>Nome</ProductLabel>
              <ProductInput
                ref={$name}
                type="text"
                defaultValue={product.produto}
              />

              <ProductLabel>Quantidade</ProductLabel>
              <ProductInput
                ref={$quantity}
                type="number"
                defaultValue={product.qtd}
                onInput={(e) => {
                  // remover caracteres não numéricos
                  e.target.value = e.target.value.replace(/\D/g, '');
                }}
              />

              <ProductLabel>Valor unitário</ProductLabel>
              <ProductInput
                ref={$price}
                type="text"
                defaultValue={product.valor}
                onInput={() => {
                  handleCurrency(null, $price);
                }}
              />
            </div>

            <ProductRadioContainer ref={$radioGroup}>
              <h2 style={{ marginBottom: '20px' }}>Categoria</h2>
              <ProductLabel>
                <ProductInput
                  marginRight={'15px'}
                  width={'25px'}
                  type="radio"
                  name="categoria"
                  value="bebida"
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
                />
                Salgados
              </ProductLabel>
              {/* // !HACK função para setar o checked do radio button */}
              {
                // transformando o NodeList da useRef em array e fazendo map
                (Array.of($radioGroup.current?.childNodes).map((node) => {
                  // checagem de type, length e aux
                  // length pois o array retorna resultados diferentes a cada segundo
                  // aux pois se deixar a atribuíção sem restrição gera loop infinito
                  if (typeof node !== 'undefined') {
                    if (node.length > 0 && aux) {
                      // colocando todos node em um useState
                      setAux(false), setRadioGroup(node);
                    }
                  }
                }),
                // fazendo um array a partir desse node e executando map
                Array.from(radioGroup).map((item) => {
                  // caso o map ache algum item que seu valor seja igual ao do firebase
                  // ele irá definir aquele item como checked by default
                  if (item.firstChild.value == product.categoria)
                    item.firstChild.defaultChecked = true;
                }))
              }
            </ProductRadioContainer>

            <div
              style={{
                display: 'flex',
                gap: '20px',
                marginTop: '50px',
              }}
            >
              <ButtonSecondary as={Link} to={'/estoque'}>
                Cancelar
              </ButtonSecondary>
              <ButtonPrimary type="submit">Salvar</ButtonPrimary>
            </div>
          </ProductForm>
        </ProductEditBox>
      </ProductEditContainer>
    </>
  );
}
