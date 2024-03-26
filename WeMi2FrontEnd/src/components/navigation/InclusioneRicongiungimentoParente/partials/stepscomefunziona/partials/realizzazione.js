import { Column, Row } from 'components/ui/Grid';
import React from 'react';
import Text from 'components/ui/Text';
import RaggiungimiPenna from 'images2/home-inclusione/Raggiungimi penna.png';
import RaggiungimiCuore from 'images2/home-inclusione/Raggiungimi cuore.png';
import { fonts } from 'theme';
import { NavLink } from 'react-router-dom';
import { BackgroundTitle } from 'components/ui2/BackgroundTitle';
import { PAGE_INCLUSIONE_APPRENDIMENTO_ITALIANO, PAGE_ORIENTAMENTO_SCOLASTICO_ED_EXTRA } from 'types/url';
import { ColumnBorder } from 'components/shared/ColumnBorder';
import { CardBox, TextSpan, WrapperText } from '../../components.style';
import { ColumnCard } from '../../columncard/steps.columncard';
import { ANCHORS } from '../../../constants';

export const Realizzazione = () => (
  <div id={ANCHORS.realizzazione}>
    <Row fluid margin="3.5em 0 0 0">
      <BackgroundTitle bgColor="red" size="small" label="REALIZZAZIONE">
      </BackgroundTitle>
    </Row>
    <Row fluid margin="1em 0 0 0">
      <Text
        value="ACCOGLIENZA E INCLUSIONE NEL NUOVO CONTESTO DELLA FAMIGLIA RICONGIUNTA"
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
            title="realizzazione"
          />
          <ColumnBorder top color="grey" />
        </CardBox>
        <WrapperText>
          <TextSpan size={fonts.size.f7}>
            WeMi RaggiungiMi ti aiuta a
            <b> preparare le pratiche burocratiche </b>
            che ti servono per ricongiungerti con un tuo familiare e
            <b> presenta la richiesta di nulla osta </b>
            alla Prefettura; offre supporto per
            l&#39;ottenimento del visto
            d&#39;ingresso
            e la presentazione della richiesta del permesso di soggiorno per le persone ricongiunte. Nella fase di richiesta e di rilascio del nulla osta il Servizio collabora con lo Sportello Unico della Prefettura di Milano ai sensi del Protocollo
            d&#39;Intesa
            siglato tra Prefettura e Comune il 23 Settembre 2020.
          </TextSpan>
        </WrapperText>
      </Column>
      <Column lg="6" md="6" xs="12" padding="0" sizepadding={{ xs: '1em 0 0 0' }}>
        <CardBox>
          <ColumnCard
            img={RaggiungimiCuore}
            title="realizzazione"
          />
          <ColumnBorder top color="grey" />
        </CardBox>
        <WrapperText>
          <TextSpan size={fonts.size.f7}>
            WeMi RaggiungiMi offre sostegno alla
            <b> ricostruzione dei ruoli e delle relazioni </b>
            all&#39;interno delle famiglie che vengono ricongiunte, aiutando i nuovi arrivati ad inserirsi nel tessuto sociale, prevendo esclusione e disagio, anche attraverso gruppi di auto-mutuo aiuto.
          </TextSpan>
        </WrapperText>
      </Column>
    </Row>
    <Row fluid margin="2em 0 0 0">
      <TextSpan size={fonts.size.f7}>
        Il Servizio di
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
        aiuta te e i tuoi figli ad individuare il corso di studio o di formazione professionale più adatto e ad inserirsi in attività educative extrascolastiche.
        <p>
          Il Servizio di
          <NavLink
            to={PAGE_INCLUSIONE_APPRENDIMENTO_ITALIANO}
          >
            <Text
              value=" APPRENDIMENTO DELLA LINGUA ITALIANA "
              color="blue"
              size="f7"
              letterSpacing="0.05em"
            />
          </NavLink>
          orienta te e la persona con cui ti stai ricongiungendo ad individuare il corso di lingua italiana più adatto.
        </p>
      </TextSpan>
    </Row>
  </div>
);

Realizzazione.displayName = 'Realizzazione';
