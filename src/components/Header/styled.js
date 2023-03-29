import styled from 'styled-components';

export const HeaderContainer = styled.div`
  position: relative;
  margin-top: 2em;
  background-color: ${(props) => props.theme.backgroundColor};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1em;
`;

export const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  list-style-type: none;
  gap: 30px;

  @media screen and (max-width: 800px) {
    display: none;
  }
`;

export const NavLinks = styled.a`
  position: relative;
  display: flex;
  font-size: 20px;
  transition: all 400ms ease-in-out;

  ::after {
    position: absolute;
    inset: 100% 0;
    content: '';
    background-color: ${(props) => props.theme.secondaryColor};
    height: 15%;
    width: 0;
    border-radius: 65px;
    transition: all 400ms ease-in-out;
  }

  :hover {
    ::after {
      width: 100%;
    }
  }
`;

export const Logo = styled.h1`
  font-family: 'Great Vibes', cursive;
  color: ${(props) => props.theme.accentColor};
  font-size: large;
  font-style: normal;
  font-weight: 400;
  font-size: 40px;
  line-height: 50px;
  text-align: center;
  margin-left: 0.5em;
`;

export const UserImg = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  aspect-ratio: 1/1;
  transition: all 100ms ease-in-out;

  :hover {
    border: 2px solid ${(props) => props.theme.secondaryColor};
  }
`;

export const NavBurguer = styled.div`
  display: none;

  @media screen and (max-width: 800px) {
    display: flex;
  }
`;

export const NavBurguerBackground = styled.div`
  display: none;
  z-index: 100;
  position: fixed;
  width: 100vw;
  align-items: center;
  list-style-type: none;
  flex-direction: column;
  gap: 10%;
  left: 0;
  height: 100vh;
  background-color: ${(props) => props.theme.backgroundColor};

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
