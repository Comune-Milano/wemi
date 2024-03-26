import React from 'react';
import Text from 'components/ui/Text';
import { Row, Column } from 'components/ui/Grid';
import AnchorLink from 'components/ui/AnchorLink';
import { BackgroundTitle, bgTitleSizes } from 'components/ui2/BackgroundTitle';
import { WrapperRow } from 'components/navigation/InfoApprendimentoLingua/components.style';
import { orariSettimanali } from '../costants';

const ComeContattarci = () => (
  <WrapperRow>
    <BackgroundTitle bgColor="purple" label="COME CONTATTARCI" size={bgTitleSizes.small} />
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
        size="f7"
        lineHeight="175%"
      />
    </Row>
    <Row fluid padding="0 0 .5em">
      <AnchorLink
        weight="bold"
        color="purple"
        value="020202"
        to="tel:02 02 02"
        textDecoration="none"
      />
      &nbsp;
      <Text
        value="- tasto 4.1.3"
        weight="bold"
        color="purple"
      />
    </Row>
    <Row fluid padding="0 0 .5em">
      <Text
        value="Nei seguenti orari:"
        lineHeight="175%"
        size="f7"
      />
    </Row>
    {orariSettimanali.map((orarioSettimanale) => (
      <Row fluid key={orarioSettimanale.dayName} padding="0">
        <Column xs="4" padding="0">
          <Text
            value={orarioSettimanale.dayName}
            lineHeight="175%"
            size="f7"
          />
        </Column>
        <Column xs="8" padding="0">
          <Row fluid>
            <Text
              value={`dalle ${orarioSettimanale.value?.from || '--'} alle ${orarioSettimanale.value?.to || '--'}`}
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
        size="f7"
        lineHeight="175%"
      />
    </Row>
    <Row fluid padding="0 0 .5em">
      <AnchorLink
        weight="bold"
        color="purple"
        value=""
        to="mailto:"
        textDecoration="none"
      />
    </Row>
    <Row fluid padding="1.8em 0 .5em">
      <Text
        transform="uppercase"
        letterSpacing="0.05em"
        size="f7"
        value="incontraci"
        lineHeight="175%"
      />
    </Row>
    <Row fluid padding="0">
      <Text
        weight="bold"
        color="purple"
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
    <Row fluid padding="0">
      <Text
        value="Si riceve solo su appuntamento"
        lineHeight="175%"
        size="f7"
      />
    </Row>
    <Row fluid padding="0">
      <Text
        weight="bold"
        color="purple"
        value="Via Pastrengo, 6"
        lineHeight="175%"
        size="f7"
      />
    </Row>
    <Row fluid padding="0">
      <Text
        value="20159 Milano (M5 Isola)"
        lineHeight="175%"
        size="f7"
      />
    </Row>
    <Row fluid padding="0 5.7em 0 0">
      <Text
        value="Direzione Centrale Educazione e Istruzione del Comune di Milano"
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
  </WrapperRow>
);

ComeContattarci.displayName = 'InclusioneComeFunziona - ComeContattarci';
export default ComeContattarci;
