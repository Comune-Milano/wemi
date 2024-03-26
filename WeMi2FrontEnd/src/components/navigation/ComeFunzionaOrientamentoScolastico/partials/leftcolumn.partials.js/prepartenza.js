import { TextSpan } from 'components/navigation/InfoApprendimentoLingua/components.style';
import { Row } from 'components/ui/Grid';
import Text from 'components/ui/Text';
import { BackgroundTitle, bgTitleSizes } from 'components/ui2/BackgroundTitle';
import React from 'react';
import { List } from 'components/ui2/List';

const PrePartenza = () => (
  <div id="prepartenza">
    <Row fluid margin="2.7em 0 0 0">
      <BackgroundTitle size={bgTitleSizes.small} label="ORIENTAMENTO SCOLASTICO PRE-PARTENZA" bgColor="purple" />
    </Row>
    <Row fluid margin="1.2em 0 0 0">
      <Text
        value="ORGANIZZARE I DOCUMENTI E PREPARARE I RAGAZZI E LE RAGAZZE PRIMA CHE ARRIVINO IN ITALIA"
        size="f6"
        weight="bold"
        letterSpacing="0.05em"
        color="purple"
        lineHeight="175%"
      />
    </Row>
    <Row fluid>
      <Text
        value="L'orientamento scolastico per i ragazzi e le ragazze neo-arrivati è un processo che inizia prima del loro arrivo in Italia. Per prepararti al loro arrivo, il Servizio Cerco-Offro Scuola ti aiuta a: "
        size="f7"
        color="black"
        lineHeight="175%"
      />
    </Row>
    <List>
      <Row fluid margin="0 1em 0">
        <TextSpan>
          Organizzare i
          <b> documenti scolastici </b>
          che servono per essere ammessi nelle scuole italiane.
        </TextSpan>
      </Row>
      <Row fluid margin="0 1em 0">
        <TextSpan>
          Capire come
          <b> preparare ragazzi e ragazze </b>
          già prima dell&apos;arrivo, per facilitare l&apos;inserimento e la socializzazione quando arriveranno in Italia.
        </TextSpan>
      </Row>
    </List>
  </div>
);

PrePartenza.displayName = 'PrePartenza';
export default PrePartenza;
