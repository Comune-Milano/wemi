/** @format */
import React, { useState, useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';
import Carousel from 'components/ui/Carousel';
import { Row, Column } from 'components/ui/Grid';
import Text from 'components/ui/Text';
import Button from 'components/ui/Button';
import Loader from 'components/ui/Loader';
import media from 'utils/media-queries';
import Spaces from 'components/navigation/Spaces';
import { scrollToRef } from 'components/ui/ScrollToRef'
import { colors } from 'theme';
import { graphqlRequest } from 'redux-modules/actions/authActions';
import { connect } from 'react-redux';
import Wrapper from 'components/navigation/NavigationWrapper';



const MyText = styled(Text)`
background-color: ${colors.red};
margin-bottom: 5px;
font-size: 12px!important;
${media.sm`
    font-size: 1.4rem!important;
  `};
  ${media.xs`
    font-size: 1.1rem!important;
  `};
${media.md`
  font-size: 2rem!important;
`};
transition: all .2s linear;
`;



const Slide = styled.img`
position: absolute;
top: 0;
height: 100%;
z-index: 1;
`;

const CaptionWrapper = styled.div`

background-image: url(${props => props.src});
background-size: cover;
background-position: center;
background-repeat: no-repeat;
width: 100%;
display: flex; 
backface-visibility: hidden;
align-items: flex-start;
padding-top: 0.5em;
height: 19em;
${media.sm`
padding-top: 1em;
align-items: flex-start;
height: 20em; 
`};
${media.md`
padding-top: 0;
align-items: center;
height: 60vh; 
`};
${media.lg`
align-items: center;
height: 60vh; 
`};


`;

const CaptionText = styled.div`
width: 100%;
z-index:2;
margin-top: 0;

@keyframes textTop {
  0% {margin-top: -100%}
  100% {margin-top: 0}
}
animation-name: textTop;
animation-duration: 1s;
animation-fill-mode: initial;
animation-timing-function: ease-in-out;
${props => props.position === props.prevPos + 1 && css`
@keyframes textTop2 {
  0% {margin-top: -100%}
  100% {margin-top: 0}
}
animation-name: textTop2;
animation-duration: 1s;
animation-fill-mode: initial;
animation-timing-function: ease-in-out;

`

  }
`;


const CaptionWrapperLoading = styled.div`
100%  {background-image: linear-gradient(-90deg, ${colors.white}, ${colors.grey})}; 
@keyframes loadingOpacity {
  0% {background-image: linear-gradient(-90deg, ${colors.darkGrey}, ${colors.grey})}; 
  100%  {background-image: linear-gradient(-90deg, ${colors.darkGrey}, ${colors.grey})}; 
}
animation: loadingOpacity 5s infinite;
animation-fill-mode: forwards;
width: 100%;
display: flex; 
backface-visibility: hidden;
align-items: flex-start;
padding-top: 0.5em;
height: 19em;
${media.sm`
padding-top: 1em;
 align-items: center;
// text-align:center;
height: 20em; 
 `};
${media.md`
padding-top: 0;
align-items: center;
height: 60vh; 

`};
${media.lg`
align-items: center;
height: 60vh; 
`};
`



const CarouselHome = ({ contenuto1, locale, goToServices }) => {
  const [CarouselPosition, setCarouselPosition] = useState(0);
  const [newPos, setNewPos] = useState(0);
  const [up, setUp] = useState(false);

  let contenuto = contenuto1 ? contenuto1.contenutoTestoCarousel : undefined;

  const newPosfunc = () => {
    setNewPos(CarouselPosition + 1)
  }

  const handlepos = (pos) => {
    setCarouselPosition(pos)
    setUp(!up)
  }

  const img = () => {
    let immagini = [];
    if (contenuto) {
      for (let i = 0; i < contenuto.length; i++) {
        if (contenuto[i].oj_media1 != null)
          immagini.push({ img: contenuto[i].oj_media1 })
      }





    }
    return immagini;
  }



  return (<>

    {
      contenuto ?
        <Carousel
          position={CarouselPosition}
          setPosition={handlepos}
          arrowbgcolor="black"
          dotcolor="grey"
          dotActiveColor="black"
          dotSize="0.5em"
          dots="overlay"
          arrowcolor="primary"
          arrowSize="1x"
          arrowWrapperSize="5vw"
          autoPlay="5000"
          height="auto"
        >

          {img().map((ele, i) => (
            <CaptionWrapper src={ele.img} key={i.toString()}>

              <CaptionText position={newPos} prevPos={CarouselPosition}>
                <Column xs="12" md="8" mdShift="4" fluid>
                  <Row fluid margin="0 0 0.2em 0">
                    <MyText value={contenuto[i].tl_testo_1[locale]} weight="bold" padding="0.1em 0.2em 0.1em 0.5em" size="f2" color="white" />
                    <MyText value={contenuto[i].tl_testo_2[locale]} padding="0.1em 0.2em 0.1em 0" size="f2" fontWeight="100" color="white" />
                    <MyText value={contenuto[i].tl_testo_3[locale]} padding="0.1em 0.5em 0.1em 0" size="f2" color="white" />
                  </Row>
                  <Row fluid margin="0 0 0.2em 0">
                    <MyText value={contenuto[i].tl_testo_4[locale]} padding="0.1em 0.5em 0.1em 0.5em" size="f2" color="white" fontWeight="100" />
                  </Row>
                  <Row fluid margin="0 0 0.2em 0">
                    <MyText value={contenuto[i].tl_testo_5[locale]} padding="0.1em 0.5em 0.1em 0.5em" size="f2" color="white" />
                  </Row>
                </Column>
                <Column xs="5" xsShift="3.5" md="2" mdShift="4" fluid padding="1em 0 0">
                  <Button fontSize="f6" autowidth value="Scopri i servizi" onClick={() => scrollToRef(goToServices)} />
                </Column>
              </CaptionText>
            </CaptionWrapper>
          ))
          }



        </Carousel>
        : <CaptionWrapperLoading>
          {/* <Loader  size="4em" margin="0 auto" width="auto"/> */}
        </CaptionWrapperLoading>
    }
  </>
  )

}

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
  mapDispatchToProps
)(CarouselHome);
