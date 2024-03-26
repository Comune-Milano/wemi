import styled from 'styled-components';
import { colors } from 'theme';
import media from 'utils/media-queries';

export const StyledBox = styled.li`
  margin: 0;
  position: relative;
  padding: 0;
  list-style: none;
  display: inline-block;
  text-align: center;
  img {
    width: 100%;
    height: auto;
    min-height: 3.5rem;
    margin-bottom: 1em;
    ${media.xs`
       max-width: ${props => props.maxWidth?.xs};
      `};
    ${media.md`
       max-width: ${props => props.maxWidth?.md};
      `};
    ${media.lg`
      max-width: ${props => props.maxWidth?.lg};
     `};  
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
  `};
  ${media.md`
    margin: 0;
    margin-bottom: 0;
    width: 20%;
    flex-shrink: 1;
    margin-right: 0;
    padding: 0;
    `}; 
  ${media.md`  
    &:not(:last-child):after  {
    content: "";
    position: absolute;
    right: -15px;
    bottom: 10px;
    top: 59px;
    padding: 16px;
    border-top: 2.5px solid ${colors.grey};
     }
   `};  
  ${media.lg`  
    &:not(:last-child):after  {
    content: "";
    position: absolute;
    right: -29px;
    bottom: 10px;
    top: 59px;
    padding: 25px;
    border-top: 2.5px solid ${colors.grey};
     }
   `};
`;


export const CarrouselRowDesktop = styled.ul`
  margin: 0;
  padding: 0;
  position: relative;
  list-style: none;
  display: flex;
  justify-content: space-between;
  align-items: strech;
  flex-wrap: nowrap;
  width: 100%;
  height: 100%;
`;

export const CarrouselRowMobile = styled.ul`
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
