import styled from 'styled-components';

export const CredentialsInput = styled.input`
  width: 80%;
  height: 40px;
  background-color: ${(props) => props.theme.primaryColor};
  outline: none;
  border: none;
  padding: 5px;
  font-size: 20px;
  border-radius: 3px;
  margin-bottom: 5%;
  transition: all 200ms ease-in-out;
`;

export const CredentialsLabel = styled.label`
  font-family: 'Quattrocento';
  font-weight: bold;
  font-size: 20px;
  width: 80%;
  margin-block: 3%;
  transition: all 200ms ease-in-out;
  color: ${(props) => props.theme.primaryColor};
`;
