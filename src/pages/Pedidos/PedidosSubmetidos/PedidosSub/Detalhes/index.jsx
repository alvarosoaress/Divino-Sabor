import React, { useEffect, useState } from 'react';
import Header from '../../../../../components/Header';
import { Container } from '../../../../../components/OptionsBox/styled';
import Menu from '../../../../../components/Menu';
import {
  ClientInfo,
  ClientInfoContainer,
  DetailSideBar,
  DetailsBox,
  DetailsIngredient,
  DetailsText,
  DetailsTitle,
} from './styled';
import { AdmLabel } from '../../../../../components/Adm/styled.';
import { db } from '../../../../../services/firebase';
import { useParams } from 'react-router-dom';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { formatTel, handleCurrency } from '../../../../../components/Adm';
import {
  ListaItem,
  ListaItemName,
  ListaOptionsContainer,
  ListaPrice,
  ListaQuantity,
} from '../../../../Lista/styled';
import { CardapioItemSeparator } from '../../../../Cardpaio/styled,';
import {
  IngredientBox,
  IngredientContainer,
  IngredientQtd,
  IngredientText,
} from '../../../../Cardpaio/CardapioAdd/styled';

export default function PedidosSubDetalhes() {
  const { id } = useParams();

  const [order, setOrder] = useState(null);
  const [menu, setMenu] = useState(null);

  const orderRef = doc(db, 'orders', id);

  let objMenu;
  let ingredientes = [];

  // pegando as informações do produto na DB
  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await getDoc(orderRef);
        const cleanData = response.data();
        setOrder(cleanData);
      } catch (error) {
        console.error(error);
      }
    };
    async function getMenu() {
      try {
        const menuCollection = collection(db, 'menu');
        const data = await getDocs(menuCollection);
        // data retorna uma response com muitos parametros
        // clean data serve para pegar apenas os dados dos produtos
        const cleanData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        setMenu(cleanData);
      } catch (error) {
        console.log(error);
      }
    }
    getUser();
    getMenu();
  }, []);

  function formatDate(data) {
    let myDate = new Date(data * 1000);

    const options = {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    };

    return myDate.toLocaleDateString('pt-BR', options);
  }

  // função para rendezirar 1 item por linha
  function ListaItemLine({ item }) {
    let objMenu;

    if (item.id && menu) {
      objMenu = menu.find((obj) => obj.id === item.id);
      if (objMenu) {
        return (
          <>
            <ListaItem>
              <ListaOptionsContainer></ListaOptionsContainer>
              <ListaQuantity>{item.qtd}x</ListaQuantity>
              <ListaItemName>{item.nome}</ListaItemName>
              <CardapioItemSeparator />
              <ListaPrice>
                {handleCurrency(objMenu.valor * item.qtd)}
              </ListaPrice>
            </ListaItem>
            <CardapioItemSeparator style={{ marginBottom: '15px' }} />
          </>
        );
      }
    }
  }

  function orderIngredients() {
    order &&
      order.lista.forEach((item) => {
        if (menu) {
          objMenu = menu.find((obj) => obj.id === item.id);
        }
        if (objMenu !== undefined) {
          objMenu.ingredientes.forEach((i) => {
            const index = ingredientes.findIndex(
              (ingredient) => ingredient.nome === i.nome,
            );
            if (index !== -1) {
              // Ingrediente já existe no array, atualiza a quantidade
              ingredientes[index].qtd += i.qtd * (item.qtd / objMenu.qtd_min);
            } else {
              // Ingrediente ainda não existe no array, adiciona
              if (i.qtd >= 100) {
                i.qtd = i.qtd * (item.qtd / objMenu.qtd_min);
              }
              ingredientes.push(i);
            }
          });
        }
      });
    ingredientes.sort((a, b) => b.qtd - a.qtd);
  }

  return (
    <>
      {orderIngredients()}
      <Header
        style={true}
        auxText={window.screen.width >= 800 ? 'ADMINISTRATIVO' : 'ADMIN'}
      />
      <Container>
        <Menu showMenu={false} />
        <DetailsBox>
          <DetailSideBar>
            <ClientInfo>
              <DetailsTitle>Cliente</DetailsTitle>

              <ClientInfoContainer>
                <div>
                  <AdmLabel>Nome</AdmLabel>
                  <DetailsText>{order && order.cliente.nome}</DetailsText>
                </div>
                <div>
                  <AdmLabel>Email</AdmLabel>
                  <DetailsText>{order && order.cliente.email}</DetailsText>
                </div>
                <div>
                  <AdmLabel>Telefone</AdmLabel>
                  <DetailsText>
                    {order && formatTel(order.cliente.tel)}
                  </DetailsText>
                </div>
                <div>
                  <AdmLabel>Data submissão</AdmLabel>
                  <DetailsText>
                    {order && formatDate(order.timeStamp.seconds)}
                  </DetailsText>
                </div>
              </ClientInfoContainer>
            </ClientInfo>
          </DetailSideBar>

          <div>
            {order &&
              order.lista.map((item, index) => (
                <ListaItemLine item={item} key={index} />
              ))}
          </div>

          <IngredientContainer>
            {ingredientes.map((item, index) => (
              <IngredientBox key={index}>
                <DetailsIngredient>
                  <IngredientQtd>{item.qtd}x</IngredientQtd>
                  <IngredientText>{item.nome}</IngredientText>
                </DetailsIngredient>
              </IngredientBox>
            ))}
          </IngredientContainer>
        </DetailsBox>
      </Container>

      <Container></Container>
    </>
  );
}
