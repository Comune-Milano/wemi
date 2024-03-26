import { TextSpan } from 'components/navigation/InfoApprendimentoLingua/components.style';
import { Row } from 'components/ui/Grid';
import Text from 'components/ui/Text';
import { BackgroundTitle, bgTitleSizes } from 'components/ui2/BackgroundTitle';
import React from 'react';

const Extrascolastico = () => (
  <div id="extrascuola">
    <Row fluid margin="2.7em 0 0 0">
      <BackgroundTitle size={bgTitleSizes.small} label="ORIENTAMENTO EXTRASCOLASTICO" bgColor="purple" />
    </Row>
    <Row fluid margin="1.2em 0 0 0">
      <Text
        value="INSERIRE I RAGAZZI E LE RAGAZZE AD ATTIVITÀ SPORTIVE E RICREATIVE PER AIUTARLI A SOCIALIZZARE"
        size="f6"
        weight="bold"
        letterSpacing="0.05em"
        color="purple"
        lineHeight="175%"
      />
    </Row>
    <Row fluid>
      <TextSpan>
        Una volta intrapreso il percorso scolastico, Cerco-Offro Scuola aiuta i ragazzi e le ragazze ad inserirsi nelle
        <b> attività sportive, ricreative e culturali </b>
        presenti sul territorio per favorire la socializzazione con i loro coetanei.
      </TextSpan>
    </Row>
    <Row fluid>
      <TextSpan>
        Cerco-Offro Scuola organizza
        <b> attività di gruppo </b>
        per aiutare i ragazzi neoarrivati a conoscersi tra loro e condividere emozioni e aspettative, scoprendo insieme la città e i suoi servizi.
      </TextSpan>
    </Row>
  </div>
);

Extrascolastico.displayName = 'Extrascolastico';
export default Extrascolastico;
