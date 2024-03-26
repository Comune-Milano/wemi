/** @format */

import React, { useState } from 'react';
import Carousel, { CreateCaptionArr } from 'components/ui/Carousel';
import { Row, Column } from 'components/ui/Grid';
import WindowSize from 'components/ui/Breakpoints';
import Text from 'components/ui/Text';
import styled from 'styled-components';
import media from 'utils/media-queries';
import { graphqlRequest } from 'redux-modules/actions/authActions';
import { connect } from 'react-redux';

const MyColumn = styled(Column)`
  padding: 0;
  text-align: center;
  justify-content: center;
`;
const TestimonialCaption = styled(Row)`
  width: 70%;
  margin: auto;
  padding: 1em;
 

`;
const CardImg = styled.img`
width: 8em;;
height:8em;
border-radius:50%;
  margin-bottom: 1em;
  ${media.sm`
  width: 10em;
  height: 10em;
    `}
  ${media.md`
  width: 8em;
  height: 8em;
    `}
    ${media.lg`
  width: 11em;
  height: 11em;
    `}
`;



const TestimonialsCarousel = ({ contenuto, locale }) => {
  const [CarouselPosition, setCarouselPosition] = useState(0);

  const CaptionArr2 = contenuto && CreateCaptionArr(contenuto.contenutoCards, 1);

  const CaptionArr = contenuto && CreateCaptionArr(contenuto.contenutoCards, 3);

  if (WindowSize() < 768)
    return (
      <Carousel
        autoPlay="3000"
        arrowbgcolor="purple"
        position={CarouselPosition}
        setPosition={setCarouselPosition}
        dots="dots"
        dotcolor="darkGrey"
        dotActiveColor="purple"
        dotSize="0.5em"
        arrowcolor="white"
        arrowSize="0.5x"
        arrowWrapperSize="6vw"
        height="auto"
      >
        {CaptionArr2 ?
          CaptionArr2.map(((element,index) => (

            <TestimonialCaption key={index.toString()} fluid justifycontent="space-around">
              {element.map((ele, i) => (
                <MyColumn xs={12} md={3} key={i.toString()}>
                  <div>
                    <CardImg src={ele.oj_media1} />
                    <Text value={ele.tl_testo_1[locale]} color="primary" weight="bold" size="f5" tag="h1" />
                    <Text value={ele.tl_testo_2[locale]} weight="bold" size="f7" tag="h2" />
                    <Text value={ele.tl_testo_3[locale]} size="f7" tag="h3" />
                  </div>
                </MyColumn>

              ))}
            </TestimonialCaption>
          ))) : ''}
      </Carousel>
    )
  else {
    return (
      <Carousel
        autoPlay="3000"
        arrowbgcolor="purple"
        position={CarouselPosition}
        setPosition={setCarouselPosition}
        dots="dots"
        dotcolor="darkGrey"
        dotActiveColor="purple"
        dotSize="1em"
        arrowcolor="white"
        arrowSize="2x"
        arrowWrapperSize="6vw"
        height="auto" >

        {CaptionArr ?
          CaptionArr.map((elem,index) => (

            <TestimonialCaption key={index.toString()} fluid justifycontent="space-around">

              {elem.map((ele, i) => (

                <MyColumn xs={12} md={3} key={i.toString()} >
                  <div>

                    <CardImg src={ele && ele.oj_media1? ele.oj_media1:null } />
                    <Text value={ele && ele.tl_testo_1 && ele.tl_testo_1[locale]?ele.tl_testo_1[locale]:null} color="primary" weight="bold" size="f5" 
                    title="Primo testimonial" tag="h1" />
                    <Text value={ele && ele.tl_testo_2 && ele.tl_testo_2[locale]?ele.tl_testo_2[locale]:null} weight="bold" size="f7" 
                    title="Professione" tag="h2" />
                    <Text value={ele && ele.tl_testo_3 && ele.tl_testo_3[locale]?ele.tl_testo_3[locale]:null} size="f8"
                    title="Feedback" tag="h3" />
                  </div>
                </MyColumn>

              ))}
            </TestimonialCaption>
          )) : ''}
      </Carousel>
    )
  }
}

TestimonialsCarousel.displayName = 'Testimonials';

const mapDispatchToProps = {
  graphqlRequest,

};

const mapStoreToProps = store => ({
  loaded: store.graphql.loaded,
  locale: store.locale,
  errorGraphQL: store.graphql.error,
});

export default connect(
  mapStoreToProps,
  mapDispatchToProps,

)(TestimonialsCarousel);