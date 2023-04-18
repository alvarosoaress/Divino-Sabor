import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const CardapioContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.backgroundColor};
  padding: 1em;
`;

export const CardapioBox = styled.div`
  display: flex;
  width: 80%;
  padding: 1em;

  @media screen and (max-width: 600px) {
    width: auto;
    padding: 0;
    flex-direction: column;
    align-items: center;
  }
`;

export const CardapioSideBar = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;
  margin-right: 5%;
  padding: 15px;

  @media screen and (max-width: 600px) {
    align-items: center;
  }
`;

export const CardapioList = styled.div`
  padding: 1em;
  flex-grow: 1;
`;

export const CardapioTitle = styled.h1`
  font-family: 'Quattrocento';
  font-weight: bold;
  font-size: 40px;
  margin-bottom: 15px;
  color: ${(props) => props.theme.textColor};

  @media screen and (max-width: 600px) {
    font-size: 32px;
  }
`;

export const CardapioCategories = styled(Link)`
  font-family: 'Quattrocento';
  font-weight: bold;
  font-size: 20px;
  margin-bottom: 15px;
  color: ${(props) => props.theme.textColor};

  @media screen and (max-width: 600px) {
    font-size: 18px;
  }
`;

export const CardapioItemList = styled.ul``;

export const CardapioItem = styled.li`
  display: flex;
  list-style: none;
  margin-bottom: 15px;
`;

export const CardapioItemName = styled.h3`
  font-family: 'Work Sans';
  font-weight: normal;
  font-size: 20px;
  word-break: break-all;
  align-self: center;
  color: ${(props) => props.theme.secondaryColor};

  @media screen and (max-width: 600px) {
    font-size: 16px;
    min-width: 40%;
  }
`;

export const CardapioItemSeparator = styled.span`
  border-bottom-style: dashed;
  border-bottom-width: 1px;
  border-bottom-color: #cccccc;
  margin-left: 7px;
  margin-right: 7px;
  flex-grow: 1;
`;

export const CardapioItemPrice = styled.h3`
  font-family: 'Work Sans';
  font-weight: normal;
  font-size: 20px;
  align-self: center;
  color: ${(props) => props.theme.textColor};

  @media screen and (max-width: 600px) {
    font-size: 16px;
  }
`;

export const CardapioItemQtd = styled.small`
  font-family: 'Work Sans';
  font-weight: normal;
  color: ${(props) => props.theme.textColor};
`;

export const CardapioItemDesc = styled.p`
  font-family: 'Work Sans';
  font-weight: normal;
  font-size: small;
  color: #33334380;
  margin-bottom: 20px;
`;
