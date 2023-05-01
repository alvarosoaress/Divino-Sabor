import styled from 'styled-components';
import { Ingredient } from '../../Cardpaio/CardapioAdd/styled';

export const DetailsContainer = styled.div`
  background-color: ${(props) => props.theme.backgroundColor};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const DetailsBox = styled.div`
  display: flex;
  position: relative;
  background-color: ${(props) => props.theme.backgroundColor};
  overflow-x: hidden;
  width: 100vw;
  padding: 2%;
  gap: 5%;

  @media screen and (max-width: 600px) {
    gap: 50px;
    flex-wrap: wrap;
  }
`;

export const DetailsTitle = styled.h2`
  font-family: 'Quattrocento';
  font-weight: bold;
  font-size: 32px;
  margin-bottom: 15px;
  color: ${(props) => props.theme.textColor};

  @media screen and (max-width: 600px) {
    font-size: 26px;
  }
`;

export const DetailsText = styled.p`
  font-family: 'Work Sans';
  font-weight: normal;
  font-size: 16px;

  word-break: break-all;
  color: ${(props) => props.theme.textColor};

  @media screen and (max-width: 600px) {
    font-size: 16px;
  }
`;

export const DetailSideBar = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ClientInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 15px;
`;

export const ClientInfo = styled.div`
  width: 250px;
  padding: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: ${(props) => props.theme.primaryColor};
`;

export const DetailsIngredient = styled(Ingredient)`
  width: 100%;
  background-color: ${(props) => props.theme.primaryColor};
`;
