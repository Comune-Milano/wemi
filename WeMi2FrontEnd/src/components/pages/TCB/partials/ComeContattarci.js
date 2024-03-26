/** @format */

import React from 'react';
import Text from 'components/ui/Text';
import { Row, Column } from 'components/ui/Grid';
import AnchorLink from 'components/ui/AnchorLink';
import styled from 'styled-components';
import media from 'utils/media-queries';
import { BackgroundTitle, bgTitleSizes } from 'components/ui2/BackgroundTitle';

const MyRow = styled(Row)`
margin-top: 6em;

${media.md`
  margin-top: 0;
`};

`;


const orariSettimanali = [
  {
    dayName: 'Lunedì',
    values: [{
      from: '8',
      to: '18',
    }],
  },
  {
    dayName: 'Martedi',
    values: [{
      from: '8',
      to: '18',
    }],
  },
  {
    dayName: 'Mercoledì',
    values: [{
      from: '8',
      to: '18',
    }],
  },
  {
    dayName: 'Giovedì',
    values: [{
      from: '8',
      to: '18',
    }],
  },
  {
    dayName: 'Venerdì',
    values: [{
      from: '8',
      to: '18',
    }],
  },
  {
    dayName: 'Sabato',
    values: [{
      from: '8',
      to: '18',
    }],
  },
];

const ComeContattarci = ({ color }) => (
  <MyRow>
    <BackgroundTitle
      size={bgTitleSizes.small}
      label="COME CONTATTARCI"
      bgColor={color}
    />
    <Row fluid margin="2em 0 2.5em">
      <Text
        value="Hai bisogno di maggiori informazioni o desideri comunicare direttamente con un operatore WeMi?"
      />
    </Row>
    <Row fluid padding="0 0 .5em">
      <Text
        transform="uppercase"
        letterSpacing="0.05em"
        color="darkGrey"
        value="CHIAMACI"
      />
    </Row>
    <Row fluid padding="0 0 .5em">
      <AnchorLink
        weight="bold"
        color={color}
        textDecoration="none"
        value=""
        to="tel:02 02 02"
      />
        &nbsp;
      <Text
        value="- tasto 4.1.3"
        weight="bold"
        color={color}
      />
    </Row>
    <Row fluid padding="0 0 .5em">
      <Text
        value="nei seguenti orari:"
      />
    </Row>
    {orariSettimanali.map((el, i) => (
      <Row fluid key={i} padding="0">
        <Column xs="4" padding="0">
          <Text
            value={el.dayName}
          />
        </Column>
        <Column xs="8" padding="0">
          {el.values.map((hours, i) => (
            <Row fluid key={i}>
              <Text
                value={`dalle ${hours.from} alle ${hours.to}`}
              />
            </Row>
            ))}
        </Column>
      </Row>
      ))}
    <Row fluid padding="2.5em 0 .5em">
      <Text
        transform="uppercase"
        letterSpacing="0.05em"
        value="scrivici"
      />
    </Row>
    <Row fluid padding="0 0 .5em">
      <AnchorLink
        weight="bold"
        color={color}
        value="Invia la tua richiesta online"
        to=""
        textDecoration="none"
      />
    </Row>
    <Row fluid padding="2.5em 0 .5em">
      <Text
        transform="uppercase"
        letterSpacing="0.05em"
        value="incontraci"
      />
    </Row>
    <Row fluid padding="0">
      <Text
        weight="bold"
        color={color}
        value="WeMi Center in via Statuto 15"
      />
    </Row>
    <Row fluid padding="0">
      <Text
        value="20121 Milano (M2 Moscova)."
      />
    </Row>
  </MyRow>
  );

ComeContattarci.displayName = 'ComeContattarci';
export default ComeContattarci;
