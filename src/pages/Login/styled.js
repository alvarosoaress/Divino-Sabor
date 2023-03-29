import { Link } from 'react-router-dom';
import styled from 'styled-components';
import credentialBackground from '../../assets/images/credentialsBackgroundImg.png';

export const HeaderContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  padding: 1em;
`;

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const CredentialsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 470px;
  height: 580px;
  background-color: white;
  background-image: url(${credentialBackground});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border: 1px solid black;

  @media screen and (max-width: 600px) {
    width: 370px;
    height: 550px;
  }
`;

export const CredentialsForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  margin: 10%;
`;

export const CredentialsTitle = styled.h2`
  font-family: 'Quattrocento';
  font-weight: bold;
  font-size: 40px;
  text-align: center;
  margin: 5%;
  color: ${(props) => props.theme.primaryColor};
`;

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
`;

export const CredentialsLabel = styled.label`
  font-family: 'Quattrocento';
  font-weight: bold;
  font-size: 20px;
  width: 80%;
  margin-block: 3%;
  color: ${(props) => props.theme.primaryColor};
`;

export const CredentialsText = styled(Link)`
  font-family: 'Quattrocento';
  font-weight: bold;
  font-size: 20px;
  width: 80%;
  margin-top: 15%;
  text-align: center;
  color: ${(props) => props.theme.primaryColor};
  transition: all 200ms ease-in-out;

  :hover {
    font-weight: bold;
    font-size: 24px;
  }
`;

export const CredentialsFooterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

export const CredentialsFooterText = styled.p`
  font-family: 'Quattrocento';
  font-weight: 400;
  font-size: min(7vh, 56px);
  letter-spacing: -1.28px;
  text-align: center;
  color: black;
  margin: 3%;

  @media screen and (max-width: 600px) {
    font-size: 30px;
    margin: 0;
  }
`;
