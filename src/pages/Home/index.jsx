import React, { useState } from 'react';
import { ButtonSecondary } from '../../components/Button/styled';
import './styled';
import {
  AboutContainer,
  AboutImg,
  AboutParagraphContainer,
  AboutText,
  AboutTextContainer,
  AboutTitle,
  Banner,
  BannerContainer,
  CardMore,
  CardTitle,
  Container,
  GridContainer,
  GridImage,
  InstaUser,
  ProductsCard,
  ProductsContainer,
  ProductsTitle,
  SocialContainer,
  SocialTitle,
} from './styled';
import logo from '../../assets/logo.png';

function Card({ name, image }) {
  return (
    <ProductsCard href="#" image={image}>
      <CardTitle>{name}</CardTitle>
      <CardMore>Conheça +</CardMore>
    </ProductsCard>
  );
}

export default function Home() {
  const cardImages = [
    {
      name: 'Bolinhos',
      img: 'https://w.wallhaven.cc/full/qz/wallhaven-qzj3lq.jpg',
    },
    {
      name: 'Docinhos',
      img: 'https://w.wallhaven.cc/full/9d/wallhaven-9dzpmd.jpg',
    },
    {
      name: 'Bebidas',
      img: 'https://w.wallhaven.cc/full/kx/wallhaven-kxz71q.jpg',
    },
    {
      name: 'Salgadinhos',
      img: 'https://w.wallhaven.cc/full/d6/wallhaven-d6331o.jpg',
    },
  ];
  const images = [
    'https://w.wallhaven.cc/full/vq/wallhaven-vqzjz5.jpg',
    'https://w.wallhaven.cc/full/1p/wallhaven-1p1y2g.jpg',
    'https://w.wallhaven.cc/full/jx/wallhaven-jxw7ym.jpg',
    'https://w.wallhaven.cc/full/x6/wallhaven-x6zyxo.jpg',
    'https://w.wallhaven.cc/full/gp/wallhaven-gp5kg7.png',
    'https://w.wallhaven.cc/full/85/wallhaven-85ew6j.jpg',
    'https://w.wallhaven.cc/full/9d/wallhaven-9dzkw1.png',
    'https://w.wallhaven.cc/full/2y/wallhaven-2yz2xg.png',
    'https://w.wallhaven.cc/full/qz/wallhaven-qzjoo5.png',
  ];

  const [btnSecondaryEnter, setBtnSecondaryEnter] = useState(false);

  return (
    <>
      <BannerContainer>
        <Banner src="https://w.wallhaven.cc/full/yx/wallhaven-yx5w37.png" />
      </BannerContainer>
      <Container>
        <ProductsTitle>Conheça nossos produtos</ProductsTitle>
        <ProductsContainer>
          {cardImages.map((image) => (
            <Card
              image={image.img}
              name={image.name}
              key={crypto.randomUUID()}
            />
          ))}
        </ProductsContainer>
        <SocialContainer>
          <InstaUser>@DIVINOSABOR</InstaUser>
          <SocialTitle>Siga a gente !</SocialTitle>
          <ButtonSecondary
            onMouseEnter={() => {
              setBtnSecondaryEnter(true);
            }}
            onMouseLeave={() => {
              setBtnSecondaryEnter(false);
            }}
            href="#"
          >
            {btnSecondaryEnter ? (
              <svg
                width="25px"
                height="25px"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
              >
                <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
              </svg>
            ) : (
              'VER INSTAGRAM'
            )}
          </ButtonSecondary>
          <GridContainer>
            {images.map((image) => (
              <GridImage src={image} key={crypto.randomUUID()} />
            ))}
          </GridContainer>
        </SocialContainer>
        <AboutContainer>
          <AboutImg src={logo} />
          <AboutTextContainer>
            <AboutTitle>
              Nossa<br></br> história
            </AboutTitle>
            <AboutParagraphContainer>
              <AboutText>
                Há quase 30 anos no mercado de Belo Horizonte, oferecemos toda a
                assessoria, estrutura técnica e operacional para o
                desenvolvimento de seu evento. Cada detalhe é personalizado para
                atender a sua necessidade, permitindo total tranqüilidade ao
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
            </AboutParagraphContainer>
          </AboutTextContainer>
          {/* MUDAR FONTE DO TEXTO E DO TITULO
          COLOCAR UM "A"NO FINAL DO PARAGRAFO */}
        </AboutContainer>
      </Container>
    </>
  );
}
