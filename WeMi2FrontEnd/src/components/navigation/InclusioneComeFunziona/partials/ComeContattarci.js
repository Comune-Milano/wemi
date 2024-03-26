/** @format */

import React from 'react';
import Text from 'components/ui/Text';
import { Row, Column } from 'components/ui/Grid';
import AnchorLink from 'components/ui/AnchorLink';
import styled from 'styled-components';
import media from 'utils/media-queries';
import { BackgroundTitle } from 'components/ui2/BackgroundTitle';
import { orariSettimanali } from './constants';

const StyledWrapperRaw = styled(Row)`
  margin-top: 6em;

  ${media.md`
    margin-top: 0;
  `};
`;

const ComeContattarci = () => (
  <StyledWrapperRaw>
    <BackgroundTitle size="small" bgColor="red" label="COME CONTATTARCI" />
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
    <Row fluid padding="0 0 .5em">
      <AnchorLink
        weight="bold"
        color="red"
        value="020202"
        to="tel:02 02 02"
        textDecoration="none"
      />
      &nbsp;
      <Text
        value="- tasto 4.1.3"
        weight="bold"
        color="red"
      />
    </Row>
    <Row fluid padding="0 0 .5em">
      <Text
        value="Nei seguenti orari:"
        lineHeight="175%"
        size="f7"
      />
    </Row>
    {orariSettimanali.map((el) => (
      <Row fluid key={el.dayName} padding="0">
        <Column xs="4" padding="0">
          <Text
            value={el.dayName}
            lineHeight="175%"
            size="f7"
          />
        </Column>
        <Column xs="8" padding="0">
          <Row fluid>
            <Text
              value={`dalle ${el.value?.from || '--'} alle ${el.value?.to || '--'}`}
              lineHeight="175%"
              size="f7"
            />
          </Row>
        </Column>
      </Row>
    ))}
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
        color="red"
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
        color="red"
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
    <Row fluid padding="1.8em 0 .5em">
      <Text
        value="Il servizio è realizzato in collaborazione con lo Sportello Unico dell'Immigrazione della Prefettura - Ufficio Territoriale del Governo di Milano"
        weight="bold"
        lineHeight="175%"
        size="f7"
      />
    </Row>
  </StyledWrapperRaw>
);

ComeContattarci.displayName = 'InclusioneComeFunziona - ComeContattarci';
export default ComeContattarci;
