import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const SmallText = styled(Link)`
  font-family: 'Quattrocento';
  font-weight: bold;
  font-size: 16px;
  text-align: center;
  text-decoration: underline;
  margin: 5%;
  color: ${(props) => props.theme.primaryColor};
`;
