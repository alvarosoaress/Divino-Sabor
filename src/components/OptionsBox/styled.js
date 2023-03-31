import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  background-color: ${(props) => props.theme.backgroundColor};
  overflow-x: hidden;

  @media screen and (max-width: 600px) {
    height: 100vh;
  }
`;

export const OptionsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-items: center;
  gap: 10%;
  width: 100%;
  //height: 100%;

  @media screen and (max-width: 1000px) {
    padding: 5%;
    gap: 10%;
    align-content: baseline;
  }
`;

export const OptionsCard = styled(Link)`
  display: flex;
  width: 250px;
  height: 250px;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  @media screen and (max-width: 1000px) {
    width: 125px;
    height: 125px;
  }
`;

export const OptionsText = styled.p`
  font-family: 'Quattrocento';
  font-style: normal;
  font-weight: 700;
  font-size: 35px;
  line-height: 30px;
  margin-top: 15px;
  text-align: center;
  width: 60%;
  color: ${(props) => props.theme.secondaryColor};

  @media screen and (max-width: 1000px) {
    font-size: 20px;
  }
`;
