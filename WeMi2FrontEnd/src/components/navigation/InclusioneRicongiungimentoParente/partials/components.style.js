import { Row, Column } from 'components/ui/Grid';
import styled from 'styled-components';
import media from 'utils/media-queries';
import { colors } from 'theme';
import { HashLink } from 'react-router-hash-link';

export const Wrapper = styled(Row)`
  margin-bottom: 8rem;
  margin-left: 2.8rem;
  margin-right: 2.8rem;
  margin-top: 3rem;

  ${media.md`
    margin-top: 3rem;
    margin-bottom: 12rem;
    margin-left: 100px;
    margin-right: 100px;
  `};
`;

export const MyRow = styled(Row)`
  position: sticky;
  top: ${({ top }) => top}px;
`;

export const WrapperUlMobile = styled.ul`
  display: flex;
  margin: 0;
  padding: 0;
  position: relative;
  list-style: none;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  transition: transform 350ms ease-in-out;
  transform: translateX(-${props => props.currentSlideIndex * 100}%);
`;

export const StyledBox = styled.li`
  margin: 0;
  position: relative;
  padding: 0;
  list-style: none;
  display: inline-block;
  text-align: center;
  img {
    height: 8rem;
    width: auto;
    background-color: ${colors.white};
  }
  p {
    margin-top: 1.5em;
    width: 100%;
  }

  width: 100%;
  flex-shrink: 0;
  margin-right: 0;
  padding: 0 2.5rem;
  margin-bottom: 0;

  ${media.sm`
    margin-bottom: 1.6rem;
  `}

  ${media.lg`
    img {
      padding: 0 0.8rem;
    }
  `}

  ${media.xl`
    img {
      padding: 0 1rem;
    }
  `}
`;

export const TextSpan = styled.span`
  line-height: 175%;
  color:${colors.black};
  font-size: ${props => props.size ? props.size : ''};
`;

export const Image = styled.img`
  height: 2rem;
  background-color: ${colors.white};
  padding:0 1em 0 0;
`;

export const StyledBoxSteps = styled.li`
  margin: 0;
  padding: 0;
  list-style: none;
  display: inline-block;
  p {
    margin-top: 1.5em;
    width: auto;
  }

  width: auto;
  margin-right: 0;
  margin-bottom: 0;

  ${media.sm`
    margin-bottom: 1.6rem;
  `};

  ${media.md`
    margin: 0;
    margin-bottom: 0;
    width: 14%;
    flex-shrink: 1;
    margin-right: 0;
    padding: 0;
  `};
`;

export const WrapperText = styled.div`
  padding: 1.5em 2em 0 0;
`;

export const CardBox = styled.ul`
  margin: 0;
  padding: 0 3em 0 0;
  position: relative;
  list-style: none;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: nowrap;
  width: 100%;
  height: auto;
  overflow: hidden;
  overflow-x: auto;
  ${media.md`
    background-position: center 1rem;
    background-repeat: no-repeat;
    background-origin: padding-box;
    background-size: 80% 0.5px;
    overflow-x: hidden;
  `};
  ${media.xs`
    background-position: center 1rem;
    background-repeat: no-repeat;
    background-origin: padding-box;
    background-size: 80% 0.5px;
    overflow-x: hidden;
  `};
`;

export const CardColumnWrapper = styled.div`
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  background-color: ${colors.greyCardInclusione};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const CardImage = styled.div`
  background-image: url(${props => props.src});
  background-position: center center;
  width: 100%;
  background-repeat: no-repeat;
  background-size: contain;
  height: 5rem;
`;

export const StyledUl = styled.ul`
  padding: 0 1em 0;
  list-style-type: disc;
`;

export const StyledOl = styled.ol`
  padding: 0 1em 0;
  list-style-type: decimal;
`;

export const Img = styled.img`
  cursor: pointer;
  transition: all .2s ease-in-out;
  &:hover {
    transform: scale(1.1, 1.1);
  }
`;

export const StyledHashLink = styled(HashLink)`
  color: inherit;
  text-decoration: none;
  cursor: pointer;
  outline: none;
`;

export const WrapperImgLink = styled.div`
  width: 7em;
`;
