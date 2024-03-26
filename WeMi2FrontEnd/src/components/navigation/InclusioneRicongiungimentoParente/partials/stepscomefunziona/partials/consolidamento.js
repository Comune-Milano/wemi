import { Column, Row } from 'components/ui/Grid';
import React from 'react';
import Text from 'components/ui/Text';
import RaggiungimiPenna from 'images2/home-inclusione/Raggiungimi penna.png';
import RaggiungimiCuore from 'images2/home-inclusione/Raggiungimi cuore.png';
import { BackgroundTitle } from 'components/ui2/BackgroundTitle';
import { fonts } from 'theme';
import { ColumnBorder } from 'components/shared/ColumnBorder';
import { CardBox, TextSpan, WrapperText } from '../../components.style';
import { ColumnCard } from '../../columncard/steps.columncard';
import { ANCHORS } from '../../../constants';

export const Consolidamento = () => (
  <div id={ANCHORS.consolidamento}>
    <Row fluid margin="3.5em 0 0 0">
      <BackgroundTitle bgColor="red" size="small" label="CONSOLIDAMENTO">
      </BackgroundTitle>
    </Row>
    <Row fluid margin="1em 0 0 0">
      <Text
        value="RICONGIUNGIMENTO AVANZATO"
        letterSpacing="0.05em"
        lineHeight="175%"
        color="red"
        size="f6"
        weight="bold"
      />
    </Row>
    <Row fluid>
      <Column lg="6" md="6" xs="12" padding="0" sizepadding={{ xs: '1em 0 0 0' }}>
        <CardBox>
          <ColumnCard
            img={RaggiungimiPenna}
            title="consolidamento"
          />
          <ColumnBorder top color="grey" />
        </CardBox>
        <WrapperText>
          <TextSpan size={fonts.size.f7}>
            WeMi RaggiungiMi offre spazi di
            <b> educazione extrascolastica e socializzazione </b>
            per i figli neoarrivati.
          </TextSpan>
        </WrapperText>
      </Column>
      <Column lg="6" md="6" xs="12" padding="0" sizepadding={{ xs: '1em 0 0 0' }}>
        <CardBox>
          <ColumnCard
            img={RaggiungimiCuore}
            title="consolidamento"
          />
          <ColumnBorder top color="grey" />
        </CardBox>
        <WrapperText>
          <TextSpan size={fonts.size.f7}>
            Qualora vi siano situazioni di difficoltà
            all&#39;interno
            delle famiglie, WeMi RaggiungiMi offre
            <b> sostegno psicosociale per le famiglie.</b>
          </TextSpan>
        </WrapperText>
      </Column>
    </Row>
  </div>
);

Consolidamento.displayName = 'Consolidamento';
