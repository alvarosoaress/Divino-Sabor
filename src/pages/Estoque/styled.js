import styled from 'styled-components';

export const ProductQuantity = styled.p`
  font-family: 'Work Sans';
  font-weight: normal;
  font-size: 20px;
  align-self: center;
  color: ${(props) => props.theme.textColor};

  @media screen and (max-width: 600px) {
    font-size: 16px;
  }
`;

export const ProductRowContainer = styled.span`
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 1fr 0.5fr 0.5fr;
  column-gap: 5px;
  margin-block: 5px;

  @media screen and (max-width: 600px) {
    grid-template-columns: 2fr 1fr 0.5fr 0.5fr;
  }
`;

export const ProductHistoryRowContainer = styled.span`
  display: grid;
  width: 100%;
  grid-template-columns: ${(props) =>
    props.gridTemplate ?? '1fr 1fr 1fr 0.5fr;'};
  column-gap: 5px;
  margin-block: 5px;

  @media screen and (max-width: 600px) {
    grid-template-columns: 1.5fr 0.5fr 1fr 0.5fr;
  }
`;

export const ProductHistoryRowTitle = styled.span`
  display: grid;
  width: 100%;
  grid-template-columns: ${(props) =>
    props.gridTemplate ?? '1fr 1fr 1fr 0.5fr'};
  column-gap: 5px;
  margin-block: 5px;

  @media screen and (max-width: 600px) {
    grid-template-columns: 1fr 0.5fr 1fr 0.5fr;
  }
`;

export const ProductEditContainer = styled.div`
  display: flex;
  flex-direction: row;
  background-color: ${(props) => props.theme.backgroundColor};
  overflow-x: hidden;

  @media screen and (max-width: 600px) {
    height: 100vh;
  }
`;

export const ProductEditBox = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.backgroundColor};
  overflow-x: hidden;
  width: 100vw;
  padding: 5%;
`;

export const ProductEditTitle = styled.h1`
  font-family: 'Quattrocento';
  font-weight: bold;
  font-size: 40px;
  margin-bottom: 15px;
  color: ${(props) => props.theme.textColor};

  @media screen and (max-width: 600px) {
    font-size: 32px;
  }
`;

export const ProductForm = styled.form`
  display: grid;
  grid-template-columns: 3fr 1fr;
  width: 100%;
  height: 100%;

  @media screen and (max-width: 600px) {
    display: flex;
    flex-direction: column;
  }
`;

export const ProductLabel = styled.label`
  display: flex;
  align-items: center;
  font-family: 'Quattrocento';
  font-weight: bold;
  font-size: ${(props) => props.fontSize ?? '20px'};
  width: ${(props) => props.width ?? '100%'};
  margin-block: 2%;
  color: ${(props) => props.color ?? props.theme.textColor};
  transition: all 200ms ease-in-out;
`;

export const ProductInput = styled.input`
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

export const ProductRadioContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 100%;

  @media screen and (max-width: 600px) {
    margin-top: 10%;
  }
`;

export const ProductOrderButton = styled.button`
  outline: none;
  border: none;
  background-color: transparent;
  display: flex;
  align-items: center;
  font-family: 'Quattrocento';
  font-size: 16px;
  cursor: pointer;
`;

export const ProductOrderContainer = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 1fr 0.5fr 0.5fr;
  column-gap: 5px;
  margin-bottom: 15px;

  @media screen and (max-width: 600px) {
    grid-template-columns: 2fr 1fr 0.5fr 0.5fr;
  }
`;

export const ProductButtonGroup = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 50px;

  @media screen and (max-width: 600px) {
    margin-top: 10px;
    margin-bottom: 50px;
  }
`;
