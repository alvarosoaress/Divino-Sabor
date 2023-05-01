import styled from 'styled-components';

export const AboutUsContainer = styled.div`
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
