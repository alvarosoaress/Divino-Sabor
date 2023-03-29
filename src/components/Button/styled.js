import styled from 'styled-components';

export const ButtonPrimary = styled.button`
  width: ${(props) => props.width ?? '200px'};
  height: ${(props) => props.height ?? '48px'};
  border-radius: 6px;
  border: none;
  background-color: ${(props) => props.theme.buttonPrimary};
  font-size: 16px;
  letter-spacing: 0.7px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: white;
  transition: all 200ms ease-in-out;

  :hover {
    font-weight: bold;
    font-size: 20px;
  }

  @media screen and (max-width: ${(props) => props.mediaQuery}) {
    width: 100px;
    height: 50px;
  }
`;

export const ButtonSecondary = styled.a`
  width: 200px;
  height: 48px;
  border-radius: 6px;
  border: 2px solid ${(props) => props.theme.secondaryColor};
  background-color: ${(props) => props.theme.buttonSecondary};
  font-size: 16px;
  letter-spacing: 0.7px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 200ms ease-in-out;

  :hover {
    font-weight: bold;
    font-size: 20px;
  }
`;
