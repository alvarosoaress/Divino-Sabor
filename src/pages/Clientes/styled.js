import styled from 'styled-components';

export const CostumersContainer = styled.div`
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

export const CostumersTitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  margin-bottom: 5%;
`;

export const CostumersAddText = styled.p`
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

export const CostumersSearchInput = styled.input`
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

export const CostumersTable = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const CostumersName = styled.p`
  font-family: 'Quattrocento';
  font-weight: normal;
  font-size: 20px;
  color: ${(props) => props.theme.textColor};

  @media screen and (max-width: 600px) {
    font-size: 16px;
  }
`;
