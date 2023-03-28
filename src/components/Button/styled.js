import styled from 'styled-components';

export const ButtonPrimary = styled.button``;

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
