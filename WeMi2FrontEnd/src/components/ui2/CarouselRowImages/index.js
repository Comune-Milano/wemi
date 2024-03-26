
import React from 'react';
import useWindowSize from 'hooks/useWindowSize';
import { Carousel } from 'components/ui2/Carousel';
import media from 'utils/media-queries';
import styled, { css } from 'styled-components';
import LineElemnet from 'images2/line_element.png';
import Text from 'components/ui/Text';
import { Column } from 'components/ui/Grid';
import { fonts, colors } from 'theme';

const StyledBox = styled.li`
  margin: 0;
  position: relative;
  padding: 0;
  list-style: none;
  display: inline-block;
  text-align: center;
  img {
    height: 8rem;
    width: auto;
    background-color: #FFF;
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
    width: 14%;
    flex-shrink: 1;
    margin-right: 0;
    padding: 0;

    img {
      padding: 0 0.4rem;
    }
  `};

  ${media.lg`
    img {
      padding: 0 0.8rem;
    }
  `};

  ${media.xl`
    img {
      padding: 0 1rem;
    }
  `};

${props => props.noBackground && css`
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
       max-width: 18.75em;
      `};
     ${media.md`
       max-width: 11.71em;
       padding: 0 0.4rem;
      `};
     ${media.lg`
       padding: 0 0.8rem;
      `};
     ${media.xl`
       padding: 0 1rem;
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
    width: 14%;
    flex-shrink: 1;
    margin-right: 0;
    padding: 0;
   `};
  &:not(:last-child):after  {
    content: "";
    position: absolute;
    right: -56px;
    bottom: 10px;
    top: 59px;
    padding: 30px;
    border-top: 2.5px solid ${colors.grey};
     }
  `}
`;


const CarrouselRowDesktop = styled.ul`
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
overflow: hidden;
overflow-x: auto;
${props => !props.noBackground && media.md`
  background-image: url(${LineElemnet});
  background-position: center 4rem;
  background-repeat: no-repeat;
  background-origin: padding-box;
  background-size: 80% 2px;
  overflow-x: hidden;
`};
`;

const CarrouselRowMobile = styled.ul`
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


const CarouselRowImages = ({
  stepList,
  setVisibleSlideNumber,
  noBackground = false,
  visibleSlideNumber,
  imgWidth,
  bgColor
}) => {

  const ColumnCard = ({ img, title, text1, textbold, text2 }) => (
    <StyledBox
      noBackground={noBackground}
      role="group"
      aria-roledescription="slide"
      bgColor={bgColor}
    >
      <img
        src={img}
        alt={title}
        width={imgWidth || 'auto'}
      />
      <Column padding="0">
        <Text
          size="f7"
          color="black"
          value={text1}
        />
        <Text
          size="f7"
          color="black"
          weight="bold"
          value={textbold}
        />
        <Text
          size="f7"
          color="black"
          value={text2}
        />
      </Column>
    </StyledBox>
  );
  
  ColumnCard.displayName = 'HowItWorks - ColumnCard';

  return (
    <>
     {['xs'].indexOf(useWindowSize()) === -1 ?
        // DESKTOP
        (
          <CarrouselRowDesktop noBackground={noBackground}>
            {stepList.map((el, j) => (
              <ColumnCard
                key={`card_${j.toString()}`}
                img={el.img}
                title={el.title}
                text1={el.text1}
                textbold={el.textbold}
                text2={el.text2}
              />
            ))}
          </CarrouselRowDesktop>
        ) :
          // MOBILE
          (
            <Carousel
              onSlideChange={index => setVisibleSlideNumber(index)}
              currentSlideIndex={visibleSlideNumber}
              slidesLength={stepList.length}
              description="Come funziona?"
              showDots
            >
              <CarrouselRowMobile currentSlideIndex={visibleSlideNumber}>
                {stepList.map((el, j) => (
                  <ColumnCard
                    key={`card_${j.toString()}`}
                    img={el.img}
                    title={el.title}
                    text1={el.text1}
                    textbold={el.textbold}
                    text2={el.text2}
                  />
                ))}
              </CarrouselRowMobile>
            </Carousel>
          )
      }
    </>
  );
};


export default CarouselRowImages;
