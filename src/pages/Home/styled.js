import styled from 'styled-components';

export const Container = styled.div`
  background-color: ${(props) => props.theme.primaryColor};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
// --------------------------------------------------------
//          Banner

export const BannerContainer = styled.div`
  width: 100%;
  height: 350px;
  padding: 1em;
  background-color: ${(props) => props.theme.backgroundColor};
  overflow: hidden;
`;

export const Banner = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

// --------------------------------------------------------
//                  Products

export const ProductsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 2vw;
  width: 100%;
  height: 100%;
  padding: 2em;
`;

export const ProductsTitle = styled.h1`
  color: ${(props) => props.theme.secondaryColor};
  font-size: 40px;
  margin-top: 2em;
  font-weight: normal;
  text-align: center;
`;

export const ProductsCard = styled.a`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 300px;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url(${(props) => props.image});
  transition: all 400ms ease-in-out;

  ::after {
    position: absolute;
    inset: 0;
    content: '';
    background-color: rgba(0, 0, 0, 0.7);
    transition: all 400ms ease-in-out;
  }

  :hover {
    ::after {
      background-color: rgba(0, 0, 0, 0.3);
    }
  }
`;

export const CardTitle = styled.h3`
  position: absolute;
  z-index: 1;
  color: ${(props) => props.theme.backgroundColor};
  font-weight: bold;
  font-size: 30px;
`;

export const CardMore = styled.a`
  position: absolute;
  z-index: 1;
  color: ${(props) => props.theme.backgroundColor};
  bottom: 20px;
  font-weight: normal;
  font-size: 20px;
`;
// --------------------------------------------------------
//                  Social Media

export const SocialContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 2em;
`;

export const InstaUser = styled.a`
  font-family: 'Work Sans', sans-serif;
  font-size: 12px;
  font-weight: bold;
  color: ${(props) => props.theme.secondaryColor};
  line-height: 22px;
  text-align: center;
  letter-spacing: 1.26px;
`;

export const SocialTitle = styled.h2`
  font-weight: 400;
  font-size: 64px;
  line-height: 72px;
  letter-spacing: -1.28px;
  text-align: center;
  margin: 0.5rem;
  margin-bottom: 3%;
  color: ${(props) => props.theme.secondaryColor};
`;
// --------------------------------------------------------
//                  Images Grid

export const GridContainer = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: repeat(3, minmax(200px, 1fr));
  column-gap: 1rem;
  row-gap: 1rem;
  width: 100%;
  height: 100%;
  margin-top: 2em;
`;

export const GridImage = styled.img`
  width: 300px;
  height: 300px;
  object-fit: cover;
`;
