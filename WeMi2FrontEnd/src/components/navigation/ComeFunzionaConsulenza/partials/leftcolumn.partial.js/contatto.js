import { TextSpan } from 'components/navigation/InfoApprendimentoLingua/components.style';
import { Row } from 'components/ui/Grid';
import Text from 'components/ui/Text';
import { BackgroundTitle, bgTitleSizes } from 'components/ui2/BackgroundTitle';
import React from 'react';
import { colors } from 'theme';

const Contatto = () => (
  <div id="contatto">
    <Row fluid>
      <Row fluid margin="2.7em 0 0 0">
        <BackgroundTitle size={bgTitleSizes.small} label="CONTATTO" bgColor="green" />
      </Row>
      <Row fluid margin="1.2em 0 0 0">
        <Text
          value="CONTATTARE IL SERVIZIO PER ESPORRE I PROPRI BISOGNI"
          size="f6"
          weight="bold"
          letterSpacing="0.05em"
          color="green"
          lineHeight="175%"
        />
      </Row>
      <Row fluid>
        <TextSpan>
          Puoi ricevere informazioni contattando telefonicamente o via mail il Servizio. Potrai avere una risposta immediata alle tue domande. In caso sia necessario approfondire la tua richiesta potrai fissare un appuntamento per poter parlare con un operatore specializzato. Il numero di telefono è
          <a href="tel:02 02 02" style={{ color: colors.green }}> 02 02 02</a>
          &nbsp;
          ed è attivo dal lunedi al sabato dalle 8 alle 20; l&apos;indirizzo email è
          &nbsp;
          <a href="mailto:" style={{ color: colors.green }}>
          </a>
        </TextSpan>
      </Row>
    </Row>
  </div>
);

Contatto.displayName = 'Contatto';
export default Contatto;
