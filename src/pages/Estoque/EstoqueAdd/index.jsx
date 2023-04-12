import React, { useRef } from 'react';
import { doc, setDoc } from 'firebase/firestore';

import Header from '../../../components/Header';
import Menu from '../../../components/Menu';
import { Link, useNavigate } from 'react-router-dom';
import { db } from '../../../services/firebase';
import { toast } from 'react-toastify';
import {
  ButtonPrimary,
  ButtonSecondary,
} from '../../../components/Button/styled';
import { handleProductValidation } from '../../../components/Adm';
import {
  ProductCheckContainer,
  ProductEditBox,
  ProductEditContainer,
  ProductEditTilte,
  ProductForm,
  ProductInput,
  ProductLabel,
} from '../styled';
import { isEmpty } from '../../../components/Utils';

export default function EstoqueAdd() {
  const navigate = useNavigate();

  const $name = useRef(null);
  const $nameLabel = useRef(null);
  const $quantity = useRef(null);
  const $price = useRef(null);

  // Intl para formatar para BRL o preço
  let BRreal = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  });

  // formatando o input de preço
  const handleCurrency = (ref) => {
    const currencyValue = ref.current.value.replace(/\D/g, '');
    // verificar se é um número válido
    if (!isNaN(currencyValue / 100)) {
      // formatar valor em moeda BRL
      ref.current.value = BRreal.format(currencyValue / 100);
    } else {
      // definir valor como vazio
      ref.current.value = '';
    }
  };

  const handleAdd = async (e) => {
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
      // adicionando produto com os dados preenchidos
      // usando setDoc() ao inves de addDoc() para poder definir um iD
      // definindo o nome do produto como id
      await setDoc(
        // usando Regex para trocar espaços em brancos
        // no nome do produto por "_" para consistência do BD
        doc(db, 'products', name.toLowerCase().replace(/\s+/g, '_')),
        {
          categoria: category,
          produto: name,
          qtd: quantity,
          valor: price,
        },
      );
      navigate('/estoque');
      toast.success('Produto adicionado com sucesso!');
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
          <ProductEditTilte>Adicionar Produto</ProductEditTilte>
          <ProductForm
            onSubmit={(e) => handleAdd(e)}
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
              <ProductInput ref={$name} type="text" required />

              <ProductLabel>Quantidade</ProductLabel>
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
                  handleCurrency($price);
                }}
                required
              />
            </div>

            <ProductCheckContainer>
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
            </ProductCheckContainer>

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
