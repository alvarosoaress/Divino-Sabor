import styled from 'styled-components';

export const ProductQuantity = styled.p`
  font-family: 'Quattrocento';
  font-weight: normal;
  font-size: 20px;
  align-self: center;
  color: ${(props) => props.theme.textColor};

  @media screen and (max-width: 600px) {
    font-size: 16px;
  }
`;
