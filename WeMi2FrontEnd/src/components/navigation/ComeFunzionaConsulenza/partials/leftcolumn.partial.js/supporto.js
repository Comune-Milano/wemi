import { TextSpan } from 'components/navigation/InfoApprendimentoLingua/components.style';
import { Row } from 'components/ui/Grid';
import Text from 'components/ui/Text';
import { BackgroundTitle, bgTitleSizes } from 'components/ui2/BackgroundTitle';
import React from 'react';

const Supporto = () => (
  <div id="supporto">
    <Row fluid>
      <Row fluid margin="2.7em 0 0 0">
        <BackgroundTitle size={bgTitleSizes.small} label="SUPPORTO" bgColor="green" />
      </Row>
      <Row fluid margin="1.2em 0 0 0">
        <Text
          value="RICEVERE SUPPORTO NELLA PRESENTAZIONE DELLE ISTANZE"
          size="f6"
          weight="bold"
          letterSpacing="0.05em"
          color="green"
          lineHeight="175%"
        />
      </Row>
      <Row fluid>
        <TextSpan>
          Il servizio può supportarti nella presentazione delle richieste di rilascio, rinnovo e conversione dei permessi di soggiorno, di iscrizione anagrafica, di cittadinanza e di pratiche connesse a stato civile e tutela minori.
          <br />
          Laddove necessario il Servizio può orientarti nella ricerca di un avvocato che ti assista in caso sia necessario presentare un ricorso all&apos;Autorità giudiziaria.
        </TextSpan>
      </Row>
    </Row>
  </div>
);

Supporto.displayName = 'Supporto';
export default Supporto;
