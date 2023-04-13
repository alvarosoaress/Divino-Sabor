import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const MenuContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 370px;
  height: 600px;
`;

export const MenuBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: ${(props) => props.theme.primaryColor};
  gap: 20px;
  padding: 2em;
  width: 80%;
  height: 60%;
  @keyframes clipEffect {
    from {
      clip-path: polygon(0 0, 0 0, 0 100%, 0% 100%);
    }
    to {
      clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
    }
  }
  animation: 0.2s clipEffect linear;
`;

export const MenuText = styled(Link)`
  font-size: 24px;
  color: black;
  font-family: 'Marcellus';
`;
