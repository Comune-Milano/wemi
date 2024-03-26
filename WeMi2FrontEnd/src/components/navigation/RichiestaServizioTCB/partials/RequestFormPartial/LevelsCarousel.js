/** @format */

import React, { useState } from 'react';
import { Row, Column } from 'components/ui/Grid';
import { connect } from 'react-redux';
import Carousel, { CreateCaptionArr } from 'components/ui/Carousel';
import Text from 'components/ui/Text';
import LevelCard from './LevelCard';
import useWindowSize from 'hooks/useWindowSize';
import GroupFieldTitle from './GroupFieldTitle';
import TitleModalInfo from 'components/shared/SimulatoreCosto/partials/TitleModalInfo';
import { BodyModalInfo } from 'components/shared/SimulatoreCosto/utils';


const LevelsCarousel = ({
  selectedCard,
  getSelectedCard,
  preventivoLightTCB,
  isColf,
  filteredCardByOrario,
  orarioValue,
  disp,
  locale,
}) => {


  const filterLevel = (arr) => {

    let filteredArr = arr.filter((liv, index) => {
      return liv.cd_tipo_orario_lavoro === 3
    })

    let newarr = filteredArr.map(liv => {
      return (
        {
          title: `Livello ${liv.cd_categoria_contrattuale}`,
          id: liv.LivelloContrattuale.cdLivelloContrattuale,
          text1: liv.LivelloContrattuale.txLivelloBreve[locale],
          text2: liv.LivelloContrattuale.txLivelloBreve[locale],
        }
      )
    })
    return newarr
  }

  const LevelCardArray = filteredCardByOrario && orarioValue.id === - 1 ? filterLevel(filteredCardByOrario)

    : filteredCardByOrario && filteredCardByOrario.map((liv, index) => {
      if (liv.cd_tipo_orario_lavoro === orarioValue.id)
        return (
          {
            title: `Livello ${liv.cd_categoria_contrattuale}`,
            id: liv.LivelloContrattuale.cdLivelloContrattuale,
            text1: liv.LivelloContrattuale.txLivelloBreve[locale],
            text2: liv.LivelloContrattuale.txLivelloBreve[locale],
          }
        )
    })

  return (
    <>
      <TitleModalInfo
        label={`${disp ? 'Seleziona' : 'Individua'} il livello di inquadramento che risponde alle tue necessità`}
        modalTitle="assistente educatore formato"
        modalBody={BodyModalInfo["livelloInquadramento"]}
        margin="3em 0 1em 0"
        color="primary"
        required
        isColf={isColf}
      />
      <Row fluid>
        {LevelCardArray.map((card, index) => (
          <Column key={index.toString()} xs="12" md="6" padding="1em 0 0 0" sizepadding={{ md: (index % 2) ? "2em 0 0 1em" : "2em 1em 0 0" }}>
            <LevelCard card={card} getCard={getSelectedCard.bind(this)} selectedCard={selectedCard} />
          </Column>
        ))}
      </Row>
    </>
  );
};

LevelsCarousel.displayName = 'LevelsCarousel';
const mapStateToProps = (state) => ({
  preventivoLightTCB: state.requestTCB.preventivoLightTCB
});
export default connect(
  mapStateToProps,
  null,
)(LevelsCarousel);