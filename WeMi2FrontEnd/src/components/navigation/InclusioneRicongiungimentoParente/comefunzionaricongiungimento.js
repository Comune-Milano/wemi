import React from 'react';
import { Row, Column } from 'components/ui/Grid';
import Text from 'components/ui/Text';
import RaggiungimiPenna from 'images2/home-inclusione/Raggiungimi penna.png';
import RaggiungimiCuore from 'images2/home-inclusione/Raggiungimi cuore.png';
import Button from 'components/ui2/Button';
import { BackgroundTitle } from 'components/ui2/BackgroundTitle';
import { NavLink } from 'react-router-dom';
import { PAGE_RICONGIUNGIMENTO_COME_FUNZIONA } from 'types/url';
import { RICONGIUNGIMENTO_FAMILIARE } from './constants';
import {
  ComeFunziona,
  DomandeFrequenti,
  RicongiungimentoCardImage,
  RicongiungimentoCardColumnWrapper,
  StepsComeFunziona,
} from './partials';

const ComeFunzionaRicongiungimento = () => (
  <>
    <Row fluid>
      <BackgroundTitle bgColor="red" size="small" label={RICONGIUNGIMENTO_FAMILIARE.title}>
      </BackgroundTitle>
    </Row>
    <Row fluid>
      <Text
        value={RICONGIUNGIMENTO_FAMILIARE.subTitleSostegnoPerTe}
        size="f7"
        margin="1.8em 0 0 0"
        color="red"
        lineHeight="175%"
        weight="bold"
        tag="div"
        letterSpacing="0.05em"
      />
    </Row>
    <Row fluid margin="0">
      <Text
        value={RICONGIUNGIMENTO_FAMILIARE.subTitleSostegnoPerFamiliare}
        size="f7"
        color="red"
        lineHeight="175%"
        weight="bold"
        tag="div"
        letterSpacing="0.05em"
      />
    </Row>
    <Row>
      <Text
        value={RICONGIUNGIMENTO_FAMILIARE.description}
        size="f7"
        lineHeight="175%"
        tag="div"
      />
    </Row>
    <Row fluid margin="2em 0 0 0">
      <Column lg="6" md="12" sizepadding={{ md: '0 0 2em 0', lg: '0 2em 0 0' }}>
        <RicongiungimentoCardColumnWrapper>
          <Row fluid justifycontent="center" padding="3.5em 0 0 0">
            <RicongiungimentoCardImage src={RaggiungimiPenna} />
          </Row>
          <Row fluid padding="3em 0 3em" justifycontent="center">
            <Text
              value="Ti accompagna nella preparazione delle pratiche burocratiche necessarie e presenta la richiesta di nulla osta alla Prefettura."
              lineHeight="175%"
              padding="0 1em"
              align="center"
              weight="semibold"
              size="f7"
            />
          </Row>
        </RicongiungimentoCardColumnWrapper>
      </Column>
      <Column lg="6" md="12" sizepadding={{ md: '0 0 2em 0', lg: '0 2em 0 0' }}>
        <RicongiungimentoCardColumnWrapper>
          <Row fluid justifycontent="center" padding="3.5em 0 0 0">
            <RicongiungimentoCardImage src={RaggiungimiCuore} />
          </Row>
          <Row fluid padding="3em 0 3em" justifycontent="center">
            <Text
              value="Ti aiuta ad accogliere i tuoi familiari ricongiunti e ad affrontare i cambiamenti relazionali e psicologici implicati dal percorso."
              lineHeight="175%"
              align="center"
              padding="0 1em"
              weight="semibold"
              size="f7"
            />
          </Row>
        </RicongiungimentoCardColumnWrapper>
      </Column>
    </Row>
    <Row fluid margin="2em 0 0 0">
      <ComeFunziona />
    </Row>
    <StepsComeFunziona />
    <Row fluid margin="5em 0 0 0">
      <DomandeFrequenti />
    </Row>
    <div style={{ margin: '2em 0 0 0' }}>
      <NavLink to={PAGE_RICONGIUNGIMENTO_COME_FUNZIONA}>
        <Button
          label="VOGLIO SAPERE DI PIÙ SUL SERVIZIO"
          color="red"
          width="auto"
          weight="bold"
          padding="5px 30px"
        />
      </NavLink>
    </div>
  </>
);

ComeFunzionaRicongiungimento.displayName = 'ComeFunzionaRicongiungimento';
export default ComeFunzionaRicongiungimento;
