import { Link } from 'react-router-dom';
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
  position: relative;
  height: 350px;
  padding: 1em;
  background-color: ${(props) => props.theme.backgroundColor};
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;

  ::after {
    position: absolute;
    content: 'Celebre Conosco!';
    font-family: 'Great Vibes', sans-serif;
    font-size: 150px;
    font-weight: regular;
    color: ${(props) => props.theme.accentColor};
    text-align: center;
    letter-spacing: 1.25px;
    margin: auto;
  }
`;

export const Banner = styled.img`
  position: relative;
  max-width: 1200px;
  height: 100%;
  filter: blur(90%);
`;

// --------------------------------------------------------
//                  Products

export const ProductsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: min(5vw, 50px);
  width: 100%;
  height: 100%;
  padding: 2em;
`;

export const ProductsTitle = styled.h1`
  color: ${(props) => props.theme.secondaryColor};
  font-size: 50px;
  margin-top: 2em;
  margin-bottom: 0.5em;
  font-weight: normal;
  text-align: center;
`;

export const ProductsCard = styled(Link)`
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

export const CardMore = styled(Link)`
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

  @media screen and (max-width: 1000px) {
    display: none;
  }
`;

export const GridImage = styled.img`
  width: 300px;
  height: 300px;
  object-fit: cover;
`;
// --------------------------------------------------------
//                  About

export const AboutContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  padding: 1em;
  width: 90%;
`;

export const AboutImg = styled.img`
  width: 1000px;
  height: 350px;
`;

export const AboutTextContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;

  @media screen and (max-width: 1000px) {
    align-items: center;
  }
`;

export const AboutTitle = styled.h2`
  font-family: 'Newsreader', serif;
  font-weight: 400;
  font-size: 60px;
  line-height: 72px;
  letter-spacing: -1.28px;
  color: ${(props) => props.theme.secondaryColor};
`;

export const AboutParagraphContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  gap: 2em;

  @media screen and (max-width: 1000px) {
    align-items: center;
  }
`;

export const AboutText = styled.p`
  font-family: 'Work Sans', serif;
  font-weight: 400;
  font-size: 16px;
  width: 80%;
  line-height: 150%;
  text-align: justify;
  color: ${(props) => props.theme.textColor};
`;

export const AboutMore = styled(Link)`
  font-family: 'Roboto', 'sans';
  font-weight: 700;
  font-size: 14px;
  line-height: 24px;
  letter-spacing: 1.44px;
  text-align: center;
  color: ${(props) => props.theme.secondaryColor};
`;

// --------------------------------------------------------
//                  NewsLetter
export const NewsLetterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  height: 30vh;
  width: 100%;
  background-color: ${(props) => props.theme.backgroundColor};

  @media screen and (max-width: 800px) {
    flex-direction: column;
  }
`;

export const NewsLetterTitle = styled.div`
  font-family: 'Newsreader', serif;
  font-weight: 500;
  font-size: 22px;
  text-align: center;
  margin-right: 5%;
  color: ${(props) => props.theme.secondaryColor};

  @media screen and (max-width: 450px) {
    font-size: 18px;
    margin-right: 0;
    margin-bottom: 5vh;
  }
`;

export const NewsLetterInput = styled.input`
  position: relative;
  height: 50px;
  width: 300px;
  background-color: #f4f4f5;
  outline: 0;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  padding: 1%;

  @media screen and (max-width: 450px) {
    width: 65vw;
    margin-bottom: 1vh;
  }
`;

export const NewsLetterConfirmLabel = styled.label`
  position: absolute;
  top: 100%;
  left: 0;
  font-family: 'Work Sans', serif;
  font-weight: 400;
  font-size: 12px;
  margin-top: 2%;
  cursor: pointer;
  color: ${(props) => props.theme.textColor};
`;

export const NewsLetterConfirm = styled.input`
  margin-right: 1%;
`;