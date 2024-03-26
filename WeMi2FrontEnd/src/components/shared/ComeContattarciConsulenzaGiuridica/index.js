import React from 'react';
import Text from 'components/ui/Text';
import { Row } from 'components/ui/Grid';
import { BackgroundTitle } from 'components/ui2/BackgroundTitle';
import { bgTitleSizes } from 'components/ui2/BackgroundTitle/constants';
import AnchorLink from 'components/ui/AnchorLink';
import ListaOraria from 'components/shared/ListaOraria';
import { StyledWrapperRaw } from './ComeContattarciConsulenzaGiuridica.styled';

const ComeContattarciConsulenzaGiuridica = ({
  color,
  timetables = [],
}) => (
  <StyledWrapperRaw>
    <BackgroundTitle
      bgColor={color}
      label="COME CONTATTARCI"
      size={bgTitleSizes.small}
    />
    <Row fluid margin="1.8em 0 1.8em">
      <Text
        value="Hai bisogno di maggiori informazioni o desideri comunicare direttamente con un operatore WeMi?"
        lineHeight="175%"
        size="f7"
      />
    </Row>
    <Row fluid padding="0 0 .5em">
      <Text
        transform="uppercase"
        letterSpacing="0.05em"
        value="CHIAMACI"
        lineHeight="175%"
        size="f7"
      />
    </Row>
    <Row fluid padding="0 0 0.5em">
      <AnchorLink
        weight="bold"
        color={color}
        value="020202"
        to="tel:02 02 02"
        textDecoration="none"
      />
      &nbsp;
      <Text
        value="- tasto 4.1.3"
        weight="bold"
        color={color}
      />
    </Row>
    <Row fluid padding="0 0 0.5em">
      <Text
        value="Nei seguenti orari:"
        lineHeight="175%"
        size="f7"
      />
    </Row>
    <Row fluid padding="0 0 0.5em">
      <ListaOraria
        timetables={timetables}
      />
    </Row>
    <Row fluid padding="1.8em 0 .5em">
      <Text
        transform="uppercase"
        letterSpacing="0.05em"
        value="scrivici"
        lineHeight="175%"
        size="f7"
      />
    </Row>
    <Row fluid padding="0 0 .5em">
      <AnchorLink
        weight="bold"
        color={color}
        value=""
        to="mailto:"
        textDecoration="none"
      />
    </Row>
    <Row fluid padding="1.8em 0 .5em">
      <Text
        transform="uppercase"
        letterSpacing="0.05em"
        value="incontraci"
        lineHeight="175%"
        size="f7"
      />
    </Row>
    <Row fluid padding="0">
      <Text
        weight="bold"
        color={color}
        value="Via Don Carlo San Martino, 10"
        lineHeight="175%"
        size="f7"
      />
    </Row>
    <Row fluid padding="0 1em 0 0">
      <Text
        value="20133 Milano (M2 Lambrate - Bus 54 - Passante ferroviario fermata Forlanini)"
        lineHeight="175%"
        size="f7"
      />
    </Row>
    <Row fluid padding="0 0 .5em">
      <Text
        value="Si riceve solo su appuntamento"
        lineHeight="175%"
        size="f7"
      />
    </Row>
  </StyledWrapperRaw>
);

ComeContattarciConsulenzaGiuridica.displayName = 'InclusioneComeFunziona - ComeContattarciConsulenzaGiuridica';
export default ComeContattarciConsulenzaGiuridica;
