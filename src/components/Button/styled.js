import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const ButtonPrimary = styled.button`
  width: ${(props) => props.width ?? '200px'};
  height: ${(props) => props.height ?? '48px'};
  border-radius: 6px;
  border: none;
  background-color: ${(props) => props.theme.buttonPrimary};
  font-size: ${(props) => props.fontSize ?? '16px'};
  letter-spacing: 0.7px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: white;
  transition: all 200ms ease-in-out;

  :hover {
    font-weight: bold;
    font-size: ${(props) => props.fontHover ?? '20px'};
  }

  @media screen and (max-width: ${(props) => props.mediaQuery}) {
    width: ${(props) => props.mediaQueryWidth ?? '100px'};
    height: 50px;
  }
`;

export const ButtonSecondary = styled.button`
  width: ${(props) => props.width ?? '200px'};
  height: ${(props) => props.height ?? '48px'};
  border-radius: 6px;
  border: none;
  background-color: ${(props) => props.color ?? props.theme.buttonSecondary};
  font-size: 16px;
  letter-spacing: 0.7px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
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

export const ButtonSocial = styled(Link)`
  width: 200px;
  height: 48px;
  border-radius: 6px;
  border: 2px solid ${(props) => props.theme.secondaryColor};
  background-color: ${(props) => props.color ?? props.theme.buttonSocial};
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
