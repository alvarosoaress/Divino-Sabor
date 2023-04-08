import styled from 'styled-components';

export const ClientEditContainer = styled.div`
  display: flex;
  flex-direction: row;
  background-color: ${(props) => props.theme.backgroundColor};
  overflow-x: hidden;

  @media screen and (max-width: 600px) {
    height: 100vh;
  }
`;

export const ClientEditBox = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.backgroundColor};
  overflow-x: hidden;
  width: 100vw;
  padding: 5%;

  @media screen and (max-width: 600px) {
    height: 100vh;
    margin-top: 10%;
    gap: 50px;
  }
`;

export const ClientEditTilte = styled.h1`
  font-family: 'Quattrocento';
  font-weight: bold;
  font-size: 40px;
  text-align: center;
  color: ${(props) => props.theme.textColor};
`;
