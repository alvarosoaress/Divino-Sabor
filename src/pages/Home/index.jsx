/* eslint-disable react/jsx-key */
import React, { useState } from 'react';
import { ButtonPrimary, ButtonSocial } from '../../components/Button/styled';
import './styled';
import {
  AboutContainer,
  AboutMore,
  AboutParagraphContainer,
  AboutText,
  AboutTextContainer,
  AboutTitle,
  Banner,
  CardMore,
  CardTitle,
  Container,
  GridContainer,
  GridImage,
  InstaUser,
  NewsLetterConfirm,
  NewsLetterConfirmLabel,
  NewsLetterContainer,
  NewsLetterInput,
  NewsLetterTitle,
  ProductsCard,
  ProductsContainer,
  ProductsTitle,
  SocialContainer,
  SocialTitle,
} from './styled';
import Logo from '../../assets/images/logo';
import { Divider } from '../../components/Utils/styled';
import Header from '../../components/Header';

import HomeBanner from '../../assets/images/BannerHome.png';
import Docinhos from '../../assets/images/Docinhos.png';
import Bebidas from '../../assets/images/Bebidas.png';
import Bolos from '../../assets/images/Bolos.png';
import Salgadinhos from '../../assets/images/Salgadinhos.png';

// componentizando os cards destaques
function Card({ name, image }) {
  return (
    <ProductsCard to="#" image={image}>
      <CardTitle>{name}</CardTitle>
      <CardMore>Conheça +</CardMore>
    </ProductsCard>
  );
}

export default function Home() {
  // array de objetos como exemplos para popular os cards
  const cardImages = [
    {
      name: 'Bolos',
      img: Bolos,
    },
    {
      name: 'Docinhos',
      img: Docinhos,
    },
    {
      name: 'Bebidas',
      img: Bebidas,
    },
    {
      name: 'Salgados',
      img: Salgadinhos,
    },
  ];

  // array de imagens como exemplos para popular as postagens do instagram
  const images = [
    'https://trello.com/1/cards/6430c55f51b8890aabb8f0ec/attachments/6430cae91ed606f3e4244137/download/photo-1596350351182-c2ce5b74a758.jpeg',
    'https://trello.com/1/cards/6430c55f51b8890aabb8f0ec/attachments/6430c60b6a07e07df0d52e89/download/photo-1578985545062-69928b1d9587.jpeg',
    'https://trello.com/1/cards/6430c55f51b8890aabb8f0ec/attachments/6430cdeb901983afbad5cb23/download/photo-1605807646837-485a3bc9bf1b.jpeg',
    'https://trello.com/1/cards/6430c55f51b8890aabb8f0ec/attachments/6430c7bcf998ef630a179db7/download/photo-1553682544-4ccf2778c9a8.jpeg',
    'https://trello.com/1/cards/6430c55f51b8890aabb8f0ec/attachments/6430c65666ded92b8daabdd7/download/photo-1582106245687-cbb466a9f07f.jpeg',
    'https://trello.com/1/cards/6430c55f51b8890aabb8f0ec/attachments/6430c620782e0f1799671abc/download/photo-1551024709-8f23befc6f87.jpeg',
    'https://trello.com/1/cards/6430c55f51b8890aabb8f0ec/attachments/6430cc7b1e7ba34893c21ae7/download/photo-1630431342210-a93164ff1251.jpeg',
    'https://trello.com/1/cards/6430c55f51b8890aabb8f0ec/attachments/6430ccaee18023026af8af0b/download/premium_photo-1679591002500-98b17c448989.jpeg',
    'https://trello.com/1/cards/6430c55f51b8890aabb8f0ec/attachments/6430cd07184fe950c2ac5dc2/download/photo-1611599538835-b52a8c2af7fe.jpeg',
  ];

  // verificação de mouseEnter no botão secundário
  // apenas para efeitos visuais
  const [btnSecondaryEnter, setBtnSecondaryEnter] = useState(false);

  return (
    <>
      <Header />
      <Divider />
      <Banner img={HomeBanner} />
      <Divider />
      <Container>
        <ProductsTitle>Conheça nossos produtos</ProductsTitle>
        <ProductsContainer>
          {/* map no array de objetos  */}
          {cardImages.map((image) => (
            <Card image={image.img} name={image.name} />
          ))}
        </ProductsContainer>
        <SocialContainer>
          <InstaUser href="#">@DIVINOSABOR</InstaUser>
          <SocialTitle>Siga a gente !</SocialTitle>
          <ButtonSocial
            // verificação de mouseEnter para efeitos visuais
            onMouseEnter={() => {
              setBtnSecondaryEnter(true);
            }}
            onMouseLeave={() => {
              setBtnSecondaryEnter(false);
            }}
            href="#"
          >
            {btnSecondaryEnter || window.screen.width <= 800 ? (
              <svg
                width="25px"
                height="25px"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                fill="white"
              >
                <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
              </svg>
            ) : (
              'VER INSTAGRAM'
            )}
          </ButtonSocial>
          <GridContainer>
            {/* map no array de postagens do instagram */}
            {images.map((image) => (
              <GridImage src={image} />
            ))}
          </GridContainer>
        </SocialContainer>
        <AboutContainer>
          <div>
            <Logo
              width={'40vw'}
              height={'40vw'}
              x="-10"
              y="0"
              display={window.screen.width >= 800 ? 'flex' : 'none'}
            />
          </div>
          <AboutTextContainer>
            <AboutTitle>
              Nossa<br></br>História
            </AboutTitle>
            <AboutParagraphContainer>
              <AboutText>
                Há quase 30 anos no mercado de Belo Horizonte, oferecemos toda a
                assessoria, estrutura técnica e operacional para o
                desenvolvimento de seu evento. Cada detalhe é personalizado para
                atender a sua necessidade, permitindo total tranquilidade ao
                cliente que busca requinte, sofisticação e bom gosto.
              </AboutText>
              <AboutText>
                Nossa longa experiência na realização de eventos nos permitiu
                adquirir um alto grau de competência e nos credencia para cuidar
                de eventos que necessitem de criatividade, exatidão e logística
                apurada.
              </AboutText>
              <AboutText>
                Esperamos que você possa vir a conhecer a nossa competência na
                organização de eventos e a excelência de nossos serviços.
              </AboutText>
              <AboutMore to="#">
                CONHEÇA MAIS SOBRE A NOSSA HISTÓRIA +
              </AboutMore>
            </AboutParagraphContainer>
          </AboutTextContainer>
        </AboutContainer>
        <Divider />
        <NewsLetterContainer>
          <NewsLetterTitle>
            Receba nossas novidades em primeira mão. Cadastre-se.
          </NewsLetterTitle>
          <form
            action=""
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'row',
              }}
            >
              <NewsLetterInput
                type="email"
                placeholder="Seu melhor e-mail..."
              />
              <ButtonPrimary mediaquery="500px">Cadastrar</ButtonPrimary>
            </div>
            <NewsLetterConfirmLabel>
              <NewsLetterConfirm type="checkbox" />
              Aceito receber informações e novidades do Buffet Divino Sabor
            </NewsLetterConfirmLabel>
          </form>
        </NewsLetterContainer>
        <Divider />
      </Container>
    </>
  );
}
