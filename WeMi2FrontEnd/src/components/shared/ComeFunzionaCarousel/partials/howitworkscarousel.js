
import React from 'react';
import useWindowSize from 'hooks/useWindowSize';
import { Carousel } from 'components/ui2/Carousel';
import Text from 'components/ui/Text';
import { Column } from 'components/ui/Grid';
import { CarrouselRowDesktop, StyledBox, CarrouselRowMobile } from '../components.styled';


const ColumnCard = ({ img, title, noBackground, sizepadding, maxWidth, bgColor, imgWidth, padding, text1, textbold, text2, textbold2, textbold3 }) => (
  <StyledBox
    noBackground={noBackground}
    role="group"
    maxWidth={maxWidth}
    aria-roledescription="slide"
    bgColor={bgColor}
  >
    <img
      src={img}
      alt={title}
      width={imgWidth || 'auto'}
    />
    <Column padding={padding} sizepadding={sizepadding}>
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
      <Text
        size="f7"
        color="black"
        weight="bold"
        value={textbold2}
      />
      <Text
        size="f7"
        color="black"
        fontStyle="italic"
        weight="bold"
        value={textbold3}
      />
    </Column>
  </StyledBox>
);

ColumnCard.displayName = 'HowItWorks - ColumnCard';

const HowItWorksCarousel = ({
  stepList,
  setVisibleSlideNumber,
  noBackground = false,
  visibleSlideNumber,
  imgWidth,
  bgColor,
}) => {
  const breakpoint = useWindowSize();

  return (
    <>
      {['xs', 'sm'].indexOf(breakpoint) === -1 ?
        // DESKTOP
        (
          <CarrouselRowDesktop>
            {stepList.map((el, j) => {
              const { length } = stepList;
              const isLast = length === j + 1;
              return (
                <ColumnCard
                  key={`card_${j.toString()}`}
                  img={el.img}
                  noBackground={noBackground}
                  imgWidth={imgWidth}
                  maxWidth={el.maxWidth}
                  sizepadding={el.padding}
                  bgColor={bgColor}
                  padding={isLast ? '0 0.7em 0 0.7em' : '0 0.7em 0 0'}
                  title={el.title}
                  text1={el.text1}
                  textbold={el.textbold}
                  textbold2={el.textbold2}
                  textbold3={el.textbold3}
                  text2={el.text2}
                />
              );
            })}
          </CarrouselRowDesktop>
        ) :
          // MOBILE
          (
            <Carousel
              onSlideChange={index => setVisibleSlideNumber(index)}
              currentSlideIndex={visibleSlideNumber}
              autoPlay
              cyclic
              slidesLength={stepList.length}
              description="Come funziona?"
              showDots
            >
              <CarrouselRowMobile currentSlideIndex={visibleSlideNumber}>
                {stepList.map((el, j) => (
                  <ColumnCard
                    key={`card_${j.toString()}`}
                    img={el.img}
                    maxWidth={el.maxWidth}
                    noBackground={noBackground}
                    imgWidth={imgWidth}
                    bgColor={bgColor}
                    title={el.title}
                    text1={el.text1}
                    textbold={el.textbold}
                    textbold2={el.textbold2}
                    textbold3={el.textbold3}
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

HowItWorksCarousel.displayName = 'HowItWorksCarousel';


export default HowItWorksCarousel;
