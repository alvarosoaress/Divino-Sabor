/* eslint-disable react/jsx-key */
import React from 'react';

import Header from '../../components/Header';
import { ContactTitle } from '../Contato/styled';
import {
  AboutContainer,
  AboutParagraphContainer,
  AboutText,
  AboutTextContainer,
  AboutTitle,
} from '../Home/styled';
import { AboutUsContainer } from './styled';
import logoGrupo from '../../assets/images/logoGrupo.png';

export default function Sobre() {
  return (
    <>
      <Header />
      <AboutUsContainer style={{ overflow: 'hidden' }}>
        <ContactTitle>Sobre-nos</ContactTitle>
        <div>
          <img src={logoGrupo} alt="" style={{ scale: '0.5' }} />
        </div>
        <AboutContainer>
          <AboutTextContainer>
            <AboutParagraphContainer style={{ alignItems: 'center' }}>
              <AboutTitle>Nosso Grupo</AboutTitle>
              <AboutText>
                O SevenWare é um grupo de sete integrantes apaixonados por
                tecnologia e inovação, que decidiram unir seus conhecimentos e
                habilidades para criar uma solução eficiente para empresas do
                setor de buffet. Nossa equipe é composta por profissionais
                qualificados em diversas áreas, que trabalham em conjunto para
                oferecer um produto completo e de alta qualidade.
              </AboutText>
              <AboutText>
                Alvaro é o responsável pelo desenvolvimento de software e tem
                experiência em programação e desenvolvimento de sistemas. Ele é
                o responsável por garantir que o sistema seja estável, seguro e
                funcional. Breno é o Project Manager, e coordena a equipe e
                gerencia o projeto como um todo, garantindo que todos os prazos
                sejam cumpridos e que o produto final atenda às expectativas dos
                clientes. apurada.
              </AboutText>
              <AboutText>
                Evellyn e Rafael são os designers responsáveis pela criação da
                identidade visual do site. Com experiência em design gráfico,
                eles criaram uma interface amigável e intuitiva, garantindo que
                o site seja fácil de navegar e agradável aos olhos. Jonata é o
                analista de testes, e sua responsabilidade é garantir que o
                sistema seja testado de forma completa e minuciosa antes de ser
                lançado.
              </AboutText>
              <AboutText>
                Riniel é o gestor de marketing, responsável por promover o site,
                captar clientes e expandir o alcance da marca. Com experiência
                em marketing digital, ele utiliza as melhores estratégias para
                garantir que o Divino Sabor seja conhecido e utilizado por
                pessoas de todo o país. Pedro Miguel é o auxiliar de marketing,
                que presta suporte ao gestor de marketing em suas atividades
                diárias.
              </AboutText>
              <AboutText>
                Nosso objetivo é criar uma solução completa e eficiente para
                empresas do setor de buffet, que permita o gerenciamento de
                todas as atividades relacionadas ao negócio. Com o Divino Sabor,
                é possível gerenciar estoques, pedidos, cardápio e muito mais,
                de forma simples e fácil. Acreditamos que a tecnologia é uma
                ferramenta importante para otimizar os processos de negócios e
                estamos dedicados a fornecer soluções inovadoras para nossos
                clientes.
              </AboutText>
            </AboutParagraphContainer>
          </AboutTextContainer>
        </AboutContainer>
      </AboutUsContainer>
    </>
  );
}
