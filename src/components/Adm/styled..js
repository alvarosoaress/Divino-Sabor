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

export const AdmListAddText = styled.p`
  font-family: 'Quattrocento';
  font-weight: normal;
  font-size: 20px;
  text-align: center;
  color: ${(props) => props.theme.textColor};
  transition: all 200ms ease-in-out;

  :hover {
    font-weight: bold;
    font-size: 24px;
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
  font-family: 'Quattrocento';
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
  grid-template-rows: 2fr 1fr;
  grid-auto-flow: row;
  grid-row-gap: 20px;
  padding: 4em;
  background-color: white;
  box-shadow: 1px 1px 1px 100vw rgba(0, 0, 0, 0.5);
`;

export const AdmModalText = styled.h1`
  font-family: 'Quattrocento';
  font-weight: normal;
  font-size: 20px;
  text-align: center;
  display: grid;
  align-self: center;
  justify-self: center;
  color: ${(props) => props.theme.textColor};
`;
