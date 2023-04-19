import styled from 'styled-components';

export const IngredientContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 15px;
`;

export const IngredientBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const Ingredient = styled.div`
  display: flex;
  align-items: center;
  width: 60%;
  height: 40px;
  position: relative;
  outline: none;
  border: solid 1px black;
  border-radius: 5px;
`;

export const IngredientText = styled.p`
  font-family: 'Work Sans';
  font-weight: normal;
  font-size: 16px;
  color: ${(props) => props.theme.textColor};

  @media screen and (max-width: 600px) {
    font-size: 14px;
  }
`;

export const IngredientQtd = styled(IngredientText)`
  margin: 10px;
`;

export const QuantityContainer = styled.div`
  display: flex;
  gap: 5px;
  margin: 15px;

  a {
    cursor: pointer;
    svg {
      transition: all 200ms ease-in-out;
      :hover {
        scale: 1.5;
      }
    }
  }
`;
