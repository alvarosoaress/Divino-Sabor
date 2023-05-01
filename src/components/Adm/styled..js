import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const AdmListContainer = styled.div`
  display: flex;
  flex-direction: row;
  background-color: ${(props) => props.theme.backgroundColor};
  overflow-x: hidden;

  @media screen and (max-width: 600px) {
    height: 100vh;
  }
`;

export const AdmListBox = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.backgroundColor};
  overflow-x: hidden;
  width: 100vw;
  padding: 5%;

  @media screen and (max-width: 600px) {
    height: 100vh;
  }
`;

export const AdmListTitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  margin-bottom: 5%;
`;

export const AdmAddText = styled(Link)`
  display: ${(props) => props.display};
  align-items: center;
  gap: 5px;

  @media screen and (max-width: 600px) {
    margin-top: 10%;
  }
`;

export const AdmListAddText = styled.p`
  font-family: 'Quattrocento';
  font-weight: normal;
  font-size: 20px;
  text-align: center;
  color: ${(props) => props.theme.textColor};
  transition: all 200ms ease-in-out;

  :hover {
    font-weight: bold;
    font-size: 22px;
  }

  @media screen and (max-width: 600px) {
    font-size: 16px;

    :hover {
      font-weight: bold;
      font-size: 18px;
    }
  }
`;

export const AdmListItemName = styled.p`
  font-family: 'Work Sans';
  font-weight: normal;
  font-size: 20px;
  align-self: center;
  color: ${(props) => props.theme.textColor};

  @media screen and (max-width: 600px) {
    font-size: 16px;
  }
`;

export const AdmListTable = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const AdmSearchInput = styled.input`
  width: 300px;
  height: 40px;
  background-color: ${(props) => props.theme.primaryColor};
  outline: none;
  border: none;
  padding: 5px;
  font-size: 20px;
  border-radius: 3px;
  transition: all 200ms ease-in-out;

  @media screen and (max-width: 600px) {
    width: 70vw;
    margin-bottom: 5%;
  }
`;

export const AdmModalContainer = styled.div`
  position: absolute;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: transparent;
`;

export const AdmModal = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-row-gap: 60px;
  grid-column-gap: 20px;
  place-content: center;
  padding: 4em;
  background-color: white;
  border-radius: 25px;
  box-shadow: 1px 1px 1px 100vw rgba(0, 0, 0, 0.5);

  @media screen and (max-width: 600px) {
    padding: 0;
    height: 40%;
    width: 90%;
    grid-row-gap: 30px;
  }
`;

export const AdmModalText = styled.h1`
  font-family: 'Quattrocento';
  font-weight: normal;
  font-size: 20px;
  text-align: center;
  display: grid;
  grid-column: span 2;
  align-self: center;
  justify-self: center;
  color: ${(props) => props.theme.textColor};

  @media screen and (max-width: 600px) {
    line-height: 50px;
  }
`;

export const AdmLabel = styled.label`
  display: flex;
  align-items: center;
  font-family: 'Quattrocento';
  font-weight: bold;
  font-size: ${(props) => props.fontSize ?? '20px'};

  color: ${(props) => props.color ?? props.theme.textColor};
  transition: all 200ms ease-in-out;
`;

export const AdmInput = styled.input`
  width: ${(props) => props.width ?? ''};
  height: ${(props) => props.height ?? '40px'};
  outline: none;
  border: none;
  padding: 15px;
  font-size: ${(props) => props.fontSize ?? '20px'};
  border-radius: 3px;
  margin-right: ${(props) => props.marginRight ?? '0'};
  background-color: ${(props) => props.theme.auxColor};
`;
