import { Column, Row } from 'components/ui/Grid';
import React from 'react';
import Text from 'components/ui/Text';
import RaggiungimiPenna from 'images2/home-inclusione/Raggiungimi penna.png';
import RaggiungimiCuore from 'images2/home-inclusione/Raggiungimi cuore.png';
import { BackgroundTitle } from 'components/ui2/BackgroundTitle';
import { fonts } from 'theme';
import { NavLink } from 'react-router-dom';
import { PAGE_ORIENTAMENTO_SCOLASTICO_ED_EXTRA } from 'types/url';
import { ColumnBorder } from 'components/shared/ColumnBorder';
import { CardBox, TextSpan, WrapperText } from '../../components.style';
import { ColumnCard } from '../../columncard/steps.columncard';
import { ANCHORS } from '../../../constants';

export const Attivazione = () => (
  <div id={ANCHORS.attivazione}>
    <Row fluid margin="3.5em 0 0 0">
      <BackgroundTitle bgColor="red" size="small" label="ATTIVAZIONE">
      </BackgroundTitle>
    </Row>
    <Row fluid margin="1em 0 0 0">
      <Text
        value="AVVIO DELLE PROCEDURE"
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
            title="attivazione"
          />
          <ColumnBorder top color="grey" />
        </CardBox>
        <WrapperText>
          <TextSpan size={fonts.size.f7}>
            WeMi RaggiungiMi ti aiuta gratuitamente a
            <b> capire se possiede i requisiti </b>
            richiesti per legge (casa, lavoro e reddito) e ad
            <b> avviare le procedure di richiesta </b>
            di ricongiungimento.
          </TextSpan>
        </WrapperText>
      </Column>
      <Column lg="6" md="6" xs="12" padding="0" sizepadding={{ xs: '1em 0 0 0' }}>
        <CardBox>
          <ColumnCard
            title="attivazione"
            img={RaggiungimiCuore}
          />
          <ColumnBorder top color="grey" />
        </CardBox>
        <WrapperText>
          <TextSpan size={fonts.size.f7}>
            WeMi RaggiungiMi offre a te e alla persona con cui ti stai ricongiungendo (che sia un figlio, un partner, o un genitore) un
            <b> percorso psicosociale </b>
            per aiutarvi a capire come affrontare al meglio i cambiamenti che vi aspettano, anche attraverso gruppi di auto-mutuo aiuto.
          </TextSpan>
        </WrapperText>
      </Column>
    </Row>
    <Row fluid margin="2em 0 0 0">
      <TextSpan size={fonts.size.f7}>
        Durante il periodo di attesa, il Servizio di
        <NavLink
          to={PAGE_ORIENTAMENTO_SCOLASTICO_ED_EXTRA}
        >
          <Text
            value=" ORIENTAMENTO SCOLASTICO ED EXTRASCOLASTICO "
            color="purple"
            size="f7"
            letterSpacing="0.05em"
          />
        </NavLink>
        ti aiuta a preparare i tuoi figli per inserirsi al meglio nel sistema di servizi scolastici, educativi e sociali.
      </TextSpan>
    </Row>
  </div>
);

Attivazione.displayName = 'Attivazione';
