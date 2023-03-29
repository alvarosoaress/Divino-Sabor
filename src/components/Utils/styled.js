import styled from 'styled-components';

export const Divider = styled.hr`
  border: 0;
  height: 1px;
  width: ${(props) => props.width ?? '100%'};
  background-image: linear-gradient(
    to right,
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 0.75),
    rgba(0, 0, 0, 0)
  );
`;

export const SecondaryDivider = styled.hr`
  border: 0;
  height: 1px;
  width: ${(props) => props.width ?? '100%'};
  background-color: black;
`;
