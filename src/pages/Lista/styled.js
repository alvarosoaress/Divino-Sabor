import styled from 'styled-components';
import { CardapioContainer } from '../Cardpaio/styled,';

export const ListaContainer = styled(CardapioContainer)`
  flex-direction: column;
`;

export const ListaBox = styled.div`
  display: flex;
  width: 80%;
  padding: 1em;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 600px) {
    width: auto;
    padding: 0;
    flex-direction: column;
  }
`;

export const ListaEntry = styled.ul`
  display: flex;
  flex-direction: column;
`;

export const ListaItem = styled.li`
  display: flex;
  list-style: none;
  margin-bottom: 15px;

  a {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      transition: all 200ms ease-in-out;
      :hover {
        scale: 1.3;
      }
    }
  }
`;

export const ListaItemName = styled.p`
  font-family: 'Work Sans';
  font-weight: normal;
  font-size: 20px;
  word-break: break-all;
  align-self: center;
  margin-inline: 20px;
  color: ${(props) => props.theme.secondaryColor};

  @media screen and (max-width: 600px) {
    font-size: 16px;
  }
`;

export const ListaQuantity = styled.p`
  font-family: 'Work Sans';
  font-weight: normal;
  font-size: 18px;
  margin-right: 10px;
  align-self: center;
  width: 50px;
  color: ${(props) => props.theme.textColor};

  @media screen and (max-width: 600px) {
    font-size: 14px;
  }
`;

export const ListaPrice = styled.h3`
  width: 125px;
  margin-left: 15px;
  font-family: 'Work Sans';
  font-weight: normal;
  font-size: 20px;
  align-self: center;
  text-align: end;
  color: ${(props) => props.theme.textColor};

  @media screen and (max-width: 600px) {
    font-size: 16px;
  }
`;

export const ListaOptionsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  margin-inline: 20px;
`;
