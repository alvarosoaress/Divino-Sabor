import styled from 'styled-components';

export const ContactTitle = styled.h1`
  font-family: 'Quattrocento';
  font-weight: bold;
  font-size: 50px;
  margin-bottom: 50px;
  color: ${(props) => props.theme.textColor};

  @media screen and (max-width: 600px) {
    font-size: 32px;
  }
`;

export const ContactContainer = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: ${(props) => props.theme.backgroundColor};

  a {
    svg {
      transition: all 200ms ease-in-out;
      :hover {
        scale: 1.2;
      }
    }
  }

  @media screen and (max-width: 600px) {
    width: 100%;
  }
`;

export const ContactLabel = styled.label`
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-size: 30px;
  margin: 25px;
  width: ${(props) => props.width ?? '30%'};
  height: ${(props) => props.height ?? ''};

  @media screen and (max-width: 600px) {
    width: auto;
  }
`;

export const ContactInput = styled.input`
  height: 40px;
  outline: none;
  border: none;
  padding: 15px;
  font-size: 20px;
  border-radius: 3px;
  background-color: ${(props) => props.theme.primaryColor};
  ::placeholder {
    font-size: 16px;
  }
`;

export const ContactTextArea = styled.textarea`
  resize: none;
  outline: none;
  border: none;
  padding: 15px;
  font-size: 20px;
  border-radius: 3px;
  background-color: ${(props) => props.theme.primaryColor};
  ::placeholder {
    font-size: 16px;
  }
`;

export const ContactSocialContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  margin-top: 25px;
`;
