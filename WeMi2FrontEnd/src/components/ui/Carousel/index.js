/** @format */
import styled, { css } from 'styled-components';
import React, { useState } from 'react';
import useInterval from 'components/ui/SetIntervalHook';
import media from 'utils/media-queries';
import FaIcon from 'components/ui/FaIcon';
import { colors } from 'theme';


export const CreateCaptionArr = (json, itemPerPage) => {
  let CaptionArr = [];
  if(json)
  for(let i = 0; i < json.length; i += itemPerPage) {
    CaptionArr.push(json.slice(i, i+itemPerPage));
  }
  return CaptionArr
}


const Wrapper = styled.div`
  width: 100%;
  overflow: hidden;
  height: ${props => props.height};
  position: relative
`

const CarouselContainer = styled.div`
  display: flex;
    width: 100%;
    height: 100%;
  transition: ${(props) => props.sliding &&  props.carArray > 1  ? 'none' : 'all .5s ease-out'};
  transform: ${(props) => {
    if (!props.sliding && props.carArray > 1 ) return 'translateX(-100%)'
    if (props.direction === 'prev') return 'translateX(calc(2 * (-100%)))'
    return 'translateX(0%)'
  }};
  `
const CarouselSlot = styled.div`
  flex: 1 0 100%;
  flex-basis: 100%;
  order: ${(props) => props.order};

`
const CarouselArrows = styled.div`
  ${props => props.float === "right" && css`
    right: 0;
    `}
    ${props => props.float === "left" && css`
    left: 0;
    `}
  position: absolute;
  padding: ${props => props.paddingBorder ? props.paddingBorder : '0 2em' };
  top: calc((100% - ${props => props.height})/2);
  width: auto;
  height: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 2;
  i {
    &:before {
      z-index: 3;
      font-size:  1rem;
    }
    cursor: pointer;
  }
  ${media.sm`
i {
  &:before {
    z-index: 3;
    font-size:  1.5rem;
  }
`}
  ${media.md`
i {
  &:before {
    z-index: 3;
    font-size:  2rem;
  }
`}
`;

const Dotnav = styled.ul`
height: ${props => props.dotSize};
position: static;
justify-content: center;
align-items: center;
display: flex;
width: 100%;
padding: calc(${props => props.dotSize}*2) 0;

${props => props.dots === 'overlay' &&
css` 
padding: 0;
  height: calc(${props => props.height} * 0.25);
  z-index: 4;
  position: absolute;
  width: 100%;
  margin-bottom: 3.5%;
  justify-content: center;
  align-items: center;
  display: flex;
  bottom: 0;
  `}
`;


const DotSpan = styled.span``;

const Dot = styled.li`
  height: 20px;
  width:  20px;
  flex-direction: column;
  margin: 0 calc(${props => props.dotSize}*0.2);
  z-index: 4;

  ${props =>
    props.active === true
      ? css`
          span {
            height: ${props => props.dotSize};
            width:  ${props => props.dotSize};
            display: block;
            margin-right: 20px;
            border-radius: 50%;
            background-color: ${props => colors[props.dotActiveColor]};
            cursor: default;
            &:hover {
              opacity: 1
            }
          }  `
      : css`
          span {
            height: ${props => props.dotSize};
            width:  ${props => props.dotSize};
            display: block;
            border-radius: 50%;
            background-color: ${props => colors[props.dotcolor]};
            cursor: pointer;
            &:hover {
              opacity: 0.9
            }
          }
        `}

  ${props =>
    props.dots === 'overlay' &&
    css` 
   margin: 0 2px;
       span {
        height: ${props => props.dotSize};
        width:  ${props => props.dotSize};
        &:hover {
          opacity: 0.9
        }
       }
  ${props => props.active === true ? css`
   span {
    background-color:  ${props => colors[props.dotActiveColor]};
    height: ${props => props.dotSize};
    width:  ${props => props.dotSize};
    &:hover {
      opacity: 1
    }
   }`
          : css`
    span {
      background-color:  ${props => colors[props.dotcolor]}
      height: ${props => props.dotSize};
      width:  ${props => props.dotSize};
      &:hover {
        opacity: 1
      }
     cursor: pointer;
    }
   `}
     }
 }
 `}
`;

const Carousel = ({
  children,
  position,
  setPosition,
  dots,
  height,
  arrowbgcolor,
  arrowcolor,
  arrowSize,
  dotActiveColor,
  dotcolor,
  dotSize,
  autoPlay,
  arrowWrapperSize,
  paddingBorder,
  ...rest
}) => {
  const [sliding, setSliding] = useState(false);
  const [direction, setDirection] = useState('next');
  const [touchStart, setTouchStart] = useState(0);
  const [autoPlayDelay, setAutoPlayDelay] = useState(false);



  const createCarouselArray = (array) => {
    let newarr = []
      newarr.push(array[array.length-1])
    for(let i = 0; i < (array.length -1); i +=1) {
      newarr.push(array[i])
    } 
    return newarr
  }
  const CarouselArray =  createCarouselArray(children)

  const getOrder = itemIndex => {
    const numItems = children.length || 1
    if (itemIndex - position < 0) {
      return numItems - Math.abs(itemIndex - position) 
    }
    return itemIndex - position
  }

  const nextSlide = () => {
    const numItems = children.length || 1
    numItems === 2 ? doSliding('next', position === 1 ? 0 : 1) :
    doSliding('next', position === numItems - 1 ? 0 : position + 1)

    setAutoPlayDelay(true)
  }

  const prevSlide = () => {
    const numItems = children.length || 1
    numItems === 2 ? doSliding('next', position === 1 ? 0 : 1) :
    doSliding('prev', position === 0 ? numItems - 1 : position - 1)

    setAutoPlayDelay(true)
  }

  const doSliding = (direction, position) => {

    setSliding(true)
    setPosition.bind(this)
    setPosition(position)
    setDirection(direction)
    setTimeout(() => {
      setSliding(false)
    }, 50)
  }

  const ChangeSlideDot = index => {
    position !== index &&
    doSliding(position < index ? 'next' : 'prev', index)
  }

  const printStart = event => {
    setTouchStart(event.touches[0].clientX)

  }
  const printEnd = event => {
    if(event.changedTouches[0].clientX > touchStart && Math.abs(event.changedTouches[0].clientX - touchStart) > 20) {
      prevSlide()
    }
    if(touchStart > event.changedTouches[0].clientX  && Math.abs(event.changedTouches[0].clientX - touchStart) > 20) 
      nextSlide()
  }


  useInterval(() => {
    if(autoPlay) {
  const numItems = children.length || 1
  numItems === 2 ? doSliding('next', position === 1 ? 0 : 1) :
  doSliding('next', position === numItems - 1 ? 0 : position + 1) }
 }, autoPlayDelay ? setAutoPlayDelay(false) && (autoPlay * 1.5)  : autoPlay );

//  autoPlay && useInterval(() => {
//   const numItems = children.length || 1
//   numItems === 2 ? doSliding('next', position === 1 ? 0 : 1) :
//   doSliding('next', position === numItems - 1 ? 0 : position + 1)
//  }, autoPlayDelay ? setAutoPlayDelay(false) && (autoPlay * 1.5)  : autoPlay );

  return (
    <Wrapper height={height}>
  
      {Array.isArray(CarouselArray) && CarouselArray.length > 1 &&
     <>
     <CarouselArrows paddingBorder={paddingBorder} float="left" height={height} dots={dots} height={arrowWrapperSize}>
        <FaIcon
          onClick={() => prevSlide()}
          bgcolor={arrowbgcolor}
          color={arrowcolor}
          radius="50%"
          size={arrowSize}
          height={arrowWrapperSize}
          width={arrowWrapperSize}
          icon="\f104"
        />
        </CarouselArrows>
       <CarouselArrows paddingBorder={paddingBorder} float="right" height={height} dots={dots} height={arrowWrapperSize}>
        <FaIcon
          onClick={() => nextSlide()}
          bgcolor={arrowbgcolor}
          color={arrowcolor}
          radius="50%"
          size={arrowSize}
          height={arrowWrapperSize}
          width={arrowWrapperSize}
          icon="\f105"
        />
      </CarouselArrows>
      </>
      }
     
      <CarouselContainer
        sliding={sliding}
        length={children.length}
        direction={direction}
        position={position}
        carArray= {CarouselArray.length}
      >
        {CarouselArray && CarouselArray.map((child, index) => (
          <CarouselSlot
            key={index.toString()}
            order={getOrder(index)}
            onTouchStart={(event) => printStart(event)}
            onTouchEnd={(event) => printEnd(event)}
          >
            {child}
          </CarouselSlot>
        ))

     }


      </CarouselContainer>
     { CarouselArray[0] && CarouselArray.length > 0  ?
      <Dotnav dotSize={dotSize} dots={dots} height={height}>
        {Array.isArray(CarouselArray) && CarouselArray.map((_, index) => (
          <Dot key={index.toString()} dotSize={dotSize} dots={dots}  dotcolor={dotcolor} dotActiveColor={dotActiveColor} active={index === position} onClick= {() => ChangeSlideDot(index)}>
            <DotSpan />
          </Dot>
        ))}
      </Dotnav> : null}

    </Wrapper>
  );
};
Carousel.displayName = 'Carousel';
// Carousel.propTypes = CarouselPropTypes;

export default Carousel;
