/** @format */
import styled, { css } from 'styled-components';
import React, { useState } from 'react';
import media from 'utils/media-queries';
import FaIcon from 'components/ui/FaIcon';
import CarouselPropTypes from './propTypes';

const StyledCarousel = styled.div`
  position: relative;
  width: 100%;
  height: calc(${props => props.height}*0.5 + ${props => props.height}* 0.2);
  ${media.sm`
  height: calc(${props => props.height}*0.8 + ${props => props.height}* 0.2);
  `}
  ${media.md`
  height: calc(${props => props.height} + ${props => props.height}* 0.2);
  `}


  ${props =>
    props.dots === 'overlay' &&
    css`
      height: calc(${props => props.height}*0.6);
      ${media.sm`
    height: calc(${props => props.height}*0.8);
    `}
      ${media.md`
    height: ${props => props.height};
    `}
    `};
`;

const CarouselItem = styled.div`
  height: 0;
  img {
    width: 100%;
    height: 100%;
  }
  ${props =>
    props.active === true
      ? css`
      height: calc(${props => props.height}*0.6);
          ${media.sm`
      height: calc(${props => props.height}*0.8);
      `}
          ${media.md`
      height: ${props => props.height};
      `}
          img {
            opacity: 1;
            height: calc(${props => props.height}*0.6);
            ${media.sm`
            height: calc(${props => props.height}*0.8);
            `}
            ${media.md`
            height: ${props => props.height};
            `}
            position: fixed;
            z-index: -1;
            transition: all 0.5s ease-in-out;
          }
        `
      : css`
          img {
            opacity: 0;
            height: calc(${props => props.height}*0.6);
            ${media.sm`
            height: calc(${props => props.height}*0.8);
            `}
            ${media.md`
            height: ${props => props.height};
            `}
            position: fixed;
    
            z-index: -1;
            transition: all 0.5s ease-in-out;
          }
        `}
`;

const Dotnav = styled.ul`
  height: calc(${props => props.height} * 0.25);
  z-index: 4;
  position: absolute;
  width: 70%;
  left: 15%;
  right: 15%;
  justify-content: center;
  align-items: center;
  display: flex;
  bottom: 0;
`;

const DotSpan = styled.span``;

const Dot = styled.li`
  height: 20px;
  width: 20px;
  flex-direction: column;
  margin: 0 5px;

  ${props =>
    props.active === true
      ? css`
          span {
            display: block;
            margin-right: 20px;
            border-radius: 50%;
            height: 20px;
            width: 20px;
            background-color: ${({ theme }) => theme.colors.primary};
            cursor: default;
          }
        `
      : css`
          span {
            display: block;
            border-radius: 50%;
            height: 20px;
            width: 20px;
            background-color: ${({ theme }) => theme.colors.darkGrey};
            cursor: pointer;
          }
        `}

  ${props =>
    props.dots === 'overlay' &&
    css`
              
                    margin: 0 2px;
                    span {
                    height: 10px;
                    width: 10px;
                    }
                    ${props =>
        props.active === true
          ? css`
                            span {
                              background-color: ${({ theme }) => theme.colors.black}!important;
                              cursor: default;
                            }
                          `
          : css`
                            span {
                              background-color: ${({ theme }) => theme.colors.grey}!important;
                              cursor: pointer;
                            }
                          `}
                    }
                
                }
    
            `}
`;

const CarouselArrows = styled.div`
  position: absolute;
  padding: 0 2em;
  top: 0;
  width: 100%;
  height: calc(${props => props.height}*0.6);
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1;

  i {
    &:before {
      z-index: 3;
      font-size:  1rem;
    }
    cursor: pointer;
    &: hover {
      opacity: 0.7;
    }
  }
 


  ${media.sm`
height: calc(${props => props.height}*0.8);
i {
  &:before {
    z-index: 3;
    font-size:  1.5rem;
  }
`}
  ${media.md`
height: ${props => props.height};
i {
  &:before {
    z-index: 3;
    font-size:  2rem;
  }
`}


  ${props =>
    props.dots === 'default' &&
    css`
      margin-top: 2.5rem;
      justify-content: space-between;
      align-items: flex-end;
      top: calc(${props => props.height}*0.1);
    `};
`;

const CarouselCaption = styled.div`
  height: 50%;
  left: 0;
  opacity: 0;
  ${media.sm`
height: 100%;
left: 10%;
`}
  ${media.md`
height: 100%;
`};
  z-index: 3;
  width: 80%;
  position: absolute;
  top: 0;
  ${props =>
    props.active
      ? css`
        top: 0
        opacity: 1;
        transition: all .7s ease-in-out;
      ` : css`
      top: 0;
      opacity: 0;
      transition: all .4s ease-in-out;

      `}
`;

const Carousel = ({
  carouselItem,
  dots,
  height,
  arrowbgcolor,
  arrowcolor,
  arrowSize,
  arrowWrapperSize,
  content: Caption,
  ...rest
}) => {
  const [id, setId] = useState(1);

  const ChangeSlideDot = event => {
    setId(event.target.id);
  };

  const ChangeSlideArrowPrev = () => {
    if (id > 1) {
      setId(id - 1);
    } else setId(carouselItem.length);
  };

  const ChangeSlideArrowNext = () => {
    if (carouselItem.length > id) {
      setId(id + 1);
    } else setId(carouselItem[0].id);
  };

  return (
    <StyledCarousel dots={dots} height={height} {...rest}>
      {carouselItem.map(item => (
        <CarouselItem id={item.id} height={height} active={item.id == id}>
          <img alt="Carousel" src={item.img} />
     
          <CarouselCaption height={height} active={item.id == id} caption={item.caption}>
          { item.id == id &&  <Caption caption={item.caption} /> }          
          </CarouselCaption>
       
        </CarouselItem>
      ))}

      <CarouselArrows height={height} dots={dots}>
        <FaIcon
          onClick={ChangeSlideArrowPrev}
          bgcolor={arrowbgcolor}
          color={arrowcolor}
          radius="50%"
          size={arrowSize}
          height={arrowWrapperSize}
          width={arrowWrapperSize}
          icon="\f104"
        />
        <FaIcon
          onClick={ChangeSlideArrowNext}
          bgcolor={arrowbgcolor}
          color={arrowcolor}
          radius="50%"
          size={arrowSize}
          height={arrowWrapperSize}
          width={arrowWrapperSize}
          icon="\f105"
        />
      </CarouselArrows>

      {dots ? (
        <Dotnav height={height}>
          {carouselItem.map(item => (
            <Dot dots={dots} active={id == item.id} id={item.id}>
              <DotSpan id={item.id} onClick={ChangeSlideDot} />
            </Dot>
          ))}
        </Dotnav>
      ) : null}
    </StyledCarousel>
  );
};
Carousel.displayName = 'Carousel';
// Carousel.propTypes = CarouselPropTypes;

export default Carousel;
