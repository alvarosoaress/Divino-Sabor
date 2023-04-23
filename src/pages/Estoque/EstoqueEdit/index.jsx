import React, { useEffect, useRef, useState } from 'react';
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from 'firebase/firestore';

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
  formattedDate,
  handleCurrency,
  handleProductValidation,
} from '../../../components/Adm';
import {
  ProductEditBox,
  ProductEditContainer,
  ProductEditTitle,
  ProductForm,
  ProductInput,
  ProductLabel,
  ProductButtonGroup,
  ProductHistoryRowTitle,
} from '../styled';
import { isEmpty } from '../../../components/Utils';
import { AdmListItemName } from '../../../components/Adm/styled.';
import { ProductHistoryRow } from '../../Financeiro/FluxoDeCaixa';

export default function EstoqueEdit() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [product, setProduct] = useState({});

  const [history, setHistory] = useState(null);

  const $name = useRef(null);
  const $nameLabel = useRef(null);
  const $quantity = useRef(null);
  const $price = useRef(null);

  const productRef = doc(db, 'products', id);

  async function productHistory(productId, arraySetState) {
    const docRef = collection(db, 'history');

    const queryProduct = query(docRef, where('id_produto', '==', productId));

    try {
      const data = await getDocs(queryProduct);
      // data retorna uma response com muitos parametros
      // clean data para pegar apenas os dados importantes
      const cleanData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      // atribuindo a response para users e newUsers
      // isso auxilia na hora do search
      arraySetState(cleanData);
    } catch (error) {
      console.error(error);
    }
  }

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
    productHistory(id, setHistory);
  }, []);

  const handleEdit = async (e) => {
    e.preventDefault();

    let name = $name.current.value;
    let quantity = $quantity.current.value;
    // convertendo o valor de BRL para um número padrão Float
    // Exemplo = R$ 4.575,23 -> 4575.23
    let price = ($price.current.value.replace(/\D/g, '') / 100).toFixed(2);

    if (isEmpty(name) || isEmpty(quantity) || isEmpty(price)) {
      toast.error('Preencha todos os campos primeiro!.');
      return;
    }

    try {
      // deletando o produto no banco
      // é preciso deletar antes de dar update pois
      // não há outra forma de trocar o id do Doc
      // e caso o usuário mude o nome do produto
      // o ID teria que ser mudado também
      await deleteDoc(doc(db, 'products', id));

      // adicionando produto com os dados preenchidos
      // usando setDoc() ao inves de addDoc() para poder definir um iD
      // definindo o nome do produto como id
      await setDoc(
        // usando Regex para trocar espaços em brancos
        // no nome do produto por "_" para consistência do BD
        doc(db, 'products', name.toLowerCase().replace(/\s+/g, '_')),
        {
          produto: name,
          qtd: Number(quantity),
          valor: Number(price),
        },
      );
      navigate('/estoque');
      toast.success('Produto editado com sucesso!');
    } catch (error) {
      console.log(error);
    }
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
          <ProductEditTitle>Editar Produto</ProductEditTitle>
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

            {/* <ProductRadioContainer ref={$radioGroup}>
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
            {/* {
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
            </ProductRadioContainer>} */}

            <ProductButtonGroup>
              <ButtonSecondary as={Link} to={'/estoque'} mediaquery="600px">
                Cancelar
              </ButtonSecondary>
              <ButtonPrimary type="submit" mediaquery="600px">
                Salvar
              </ButtonPrimary>
            </ProductButtonGroup>
          </ProductForm>
          <ProductEditTitle style={{ marginTop: '5%' }}>
            Histórico Produto
          </ProductEditTitle>
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
          {history &&
            history.map((entry, index) => {
              return (
                <ProductHistoryRow
                  name={entry.produto}
                  quantity={entry.qtd}
                  price={handleCurrency(entry.valor, null)}
                  date={formattedDate(entry.timeStamp.seconds)}
                  type={entry.tipo}
                  key={index}
                />
              );
            })}
        </ProductEditBox>
      </ProductEditContainer>
    </>
  );
}
