import React from 'react';
import { Row } from 'components/ui/Grid';
import Text from 'components/ui/Text';
import { TextSpan, UnderlineBlueTextSpan } from 'components/navigation/InfoApprendimentoLingua/components.style';

const PartnerProgetto = () => (
  <>
    <Row fluid margin="2em 0 0 0">
      <Text
        value="PARTNER DI PROGETTO"
        size="f6"
        weight="bold"
        letterSpacing="0.05em"
        color="blue"
        lineHeight="175%"
      />
    </Row>
    <Row fluid>
      <TextSpan>
        Capofila del progetto è la
        <a href=" " target="_blank">
          <UnderlineBlueTextSpan> Cooperativa Codici | Ricerca e Intervento</UnderlineBlueTextSpan>
        </a>
        . Partner di progetto sono:
        <a href=" " target="_blank">
          <UnderlineBlueTextSpan> Fondazione ISMU</UnderlineBlueTextSpan>
        </a>
        ,
        <a href=" " target="_blank">
          <UnderlineBlueTextSpan> Comune di Milano</UnderlineBlueTextSpan>
        </a>
        ,
        <a href=" " target="_blank">
          <UnderlineBlueTextSpan> CPIA5</UnderlineBlueTextSpan>
        </a>
        , e una rete di 14 scuole di Italiano L2. Per informazioni sull&apos;offerta di corsi di Italiano L2, di vario livello,
        è possibile rivolgersi direttamente ai partner di progetto che gestiscono le scuole:
      </TextSpan>
    </Row>
  </>
);

PartnerProgetto.displayName = 'PartnerProgetto';
export default PartnerProgetto;
