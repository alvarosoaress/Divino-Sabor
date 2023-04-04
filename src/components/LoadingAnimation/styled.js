import styled from 'styled-components';

import { TbGlassFull } from 'react-icons/tb';

export const GlassFull = styled(TbGlassFull)`
  position: absolute;
  width: 200px;
  height: 200px;
  overflow: hidden;
  animation: ${(props) => props.animation} 1.2s alternate infinite;

  @keyframes tinOne {
    from {
      transform: translateX(75%);
      rotate: 0deg;
    }
    to {
      transform: translateX(60%);
      rotate: -25deg;
    }
  }

  @keyframes tinTwo {
    from {
      rotate: 0deg;
    }
    to {
      rotate: 10deg;
    }
  }

  @media screen and (max-width: 600px) {
    width: 125px;
    height: 125 px;
  }
`;
