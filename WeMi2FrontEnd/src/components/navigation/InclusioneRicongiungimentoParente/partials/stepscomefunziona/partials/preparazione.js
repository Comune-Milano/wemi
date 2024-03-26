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

export const Preparazione = () => (
  <div id={ANCHORS.preparazione}>
    <Row fluid margin="3.5em 0 0 0" id="yourTag">
      <BackgroundTitle bgColor="red" size="small" label="PREPARAZIONE">
      </BackgroundTitle>
    </Row>
    <Row fluid margin="1em 0 0 0">
      <Text
        value="IDEAZIONE DEL RICONGIUNGIMENTO"
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
            title="preparazione"
          />
          <ColumnBorder top color="grey" />
        </CardBox>
        <WrapperText>
          <TextSpan size={fonts.size.f7}>
            WeMi RaggiungiMi ti aiuta a trovare le
            <b> corrette informazioni giuridico-procedurali </b>
            e a capire se per te è possibile avviare le pratiche di ricongiungimento familiare.
          </TextSpan>
        </WrapperText>
      </Column>
      <Column lg="6" md="6" xs="12" padding="0" sizepadding={{ xs: '1em 0 0 0' }}>
        <CardBox>
          <ColumnCard
            img={RaggiungimiCuore}
            title="preparazione"
          />
          <ColumnBorder top color="grey" />
        </CardBox>
        <WrapperText>
          <TextSpan size={fonts.size.f7}>
            Gli operatori ti guideranno ad una
            <b> scelta consapevole</b>
            , rimanendo al tuo fianco per
            l&#39;intero percorso.
          </TextSpan>
        </WrapperText>
      </Column>
    </Row>
  </div>
);

Preparazione.displayName = 'Preparazione';
