/** @format */

import React, { useState } from 'react';
import { Row, Column } from 'components/ui/Grid';
import { connect } from 'react-redux';
import Carousel, { CreateCaptionArr } from 'components/ui/Carousel';
import Text from 'components/ui/Text';
import LevelCard from './LevelCard';
import useWindowSize from 'hooks/useWindowSize';
import GroupFieldTitle from 'components/navigation/InserimentoDomandaTCB/partials/GroupFieldTitle';



const LevelsCarousel = ({
  selectedCard,
  getSelectedCard,
  preventivoLightTCB,
  filteredCardByOrario,
  orarioValue,
  disp,
  locale,
}) => {

  const [CarouselPosition, setCarouselPosition] = useState(0);

  const filterLevel = (arr) => {

    let filteredArr = arr.filter((liv, index) => {
      return liv.cd_tipo_orario_lavoro === 3
    })

    let newarr = filteredArr.map(liv => {
      return (
        {
          title: `Livello ${liv.cd_categoria_contrattuale}`,
          id: liv.LivelloContrattuale.cdLivelloContrattuale,
          text1: liv.LivelloContrattuale.txLivelloBreve.it,
          text2: liv.LivelloContrattuale.txLivelloBreve.it,
        }
      )
    })
    return newarr
  }

  const LevelCardArray = filteredCardByOrario && orarioValue && orarioValue.id === - 1 ? filterLevel(filteredCardByOrario)

    : filteredCardByOrario && filteredCardByOrario.map((liv, index) => {
      if (orarioValue && orarioValue.id && liv.cd_tipo_orario_lavoro ===  orarioValue.id)
        return (
          {
            title: `Livello ${liv.cd_categoria_contrattuale}`,
            id: liv.LivelloContrattuale.cdLivelloContrattuale,
            text1: liv.LivelloContrattuale.txLivelloBreve.it,
            text2: liv.LivelloContrattuale.txLivelloBreve.it,
          }
        )
    })


  // let CaptionArr = [];

  // const windowWidth = useWindowSize();
  // const upperBreakpoints = ['md', 'lg', 'xl', 'xxl', 'xxxl'];

  // if (upperBreakpoints.indexOf(windowWidth) > -1) {
  return (
    <>
      <GroupFieldTitle
        title={`${disp ? 'Seleziona' : 'Individua'} il livello di inquadramento che risponde alle tue necessità`}
        marginBottom="0"
        required
      />
      <Row fluid>
        {LevelCardArray.map((card, index) => (
          <Column key={index.toString()} xs="12" md="6" padding="1em 0 0 0" sizepadding={{ md: (index % 2) ? "2em 0 0 1em" : "2em 1em 0 0" }}>
            <LevelCard card={card} getCard={getSelectedCard.bind(this)} selectedCard={selectedCard} />
          </Column>
        ))}
      </Row>
    </>
  )
  // }

  //   else { CaptionArr = CreateCaptionArr(LevelCardArray, 1) }
  //   return (
  //     <Row fluid margin="2em 0 0">
  // <Column padding="1em 0">
  //           <Text
  //             value="Individua il livello di inquadramento che risponde alle tue necessità"
  //             weight="bold"
  //             transform="uppercase"
  //             color="primary"
  //             padding="0 0.3em 0 0"
  //             size="f7"
  //           />
  //                <Text
  //             value="*"
  //             weight="bold"
  //             transform="uppercase"
  //             color="red"
  //             size="f7"
  //           />
  //           </Column>
  //       <Row fluid>
  //         <Column xs="12" padding="1em 0">
  //           {filteredCardByOrario && <Carousel
  //             arrowbgcolor="primary"
  //             position={CarouselPosition}
  //             setPosition={setCarouselPosition}
  //             dots="dots"
  //             dotcolor="darkGrey"
  //             dotActiveColor="primary"
  //             dotSize="0.5em"
  //             arrowcolor="white"
  //             arrowSize="1x"
  //             arrowWrapperSize="4vw"
  //             height="auto"
  //             paddingBorder="0.6em"
  //             autoplay={false}>
  //             {CaptionArr.map(cards => (
  //               <Row padding='1em 1.5em' fluid justifycontent="space-around">
  //                 {cards.map(card => (<LevelCard card={card} getCard={getSelectedCard.bind(this)} selectedCard={selectedCard} />))}
  //               </Row>
  //             ))}
  //           </Carousel>}
  //         </Column>
  //       </Row>
  //     </Row>)
};

LevelsCarousel.displayName = 'LevelsCarousel';
const mapStateToProps = (state) => ({
  preventivoLightTCB: state.requestTCB.preventivoLightTCB
});
export default connect(
  mapStateToProps,
  null,
)(LevelsCarousel);