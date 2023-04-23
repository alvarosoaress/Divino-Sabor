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
import {
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
} from '../styled';
import { isEmpty } from '../../../components/Utils';

export default function EstoqueAdd() {
  const navigate = useNavigate();

  const $name = useRef(null);
  const $nameLabel = useRef(null);
  const $quantity = useRef(null);
  const $price = useRef(null);

  const handleAdd = async (e) => {
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
      //   navigate('/estoque');
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
          <ProductEditTitle>Adicionar Produto</ProductEditTitle>
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
                  handleCurrency(null, $price);
                }}
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
