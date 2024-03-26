import React from 'react';
import Text from 'components/ui/Text';
import { Row, Column } from 'components/ui/Grid';
import { BackgroundTitle } from 'components/ui2/BackgroundTitle';
import { bgTitleSizes } from 'components/ui2/BackgroundTitle/constants';
import AnchorLink from 'components/ui/AnchorLink';
import { contactInfo } from '../constants';


const HowContact = ({ data = contactInfo }) => (
  <>
    <Row fluid>
      <BackgroundTitle
        bgColor="purple"
        label="CONTATTI"
        size={bgTitleSizes.small}
      />
    </Row>
    <Row fluid margin="1.8em 0 0 0">
      <Text
        value="Vuoi iscriverti ad uno dei prossimi incontri collettivi?"
        lineHeight="175%"
        size="f7"
      />
    </Row>
    <Row fluid>
      <Text
        value="Vuoi riflettere sulla tua economia personale prima d'incontrare l'educatore finanziario?"
        lineHeight="175%"
        size="f7"
      />
    </Row>
    <Row fluid>
      <Column xs="12" sm="12" md="12" lg="4" padding="0">
        <Row fluid margin="1.8em 0 .5em">
          <Text
            transform="uppercase"
            letterSpacing="0.05em"
            value="scrivici"
            lineHeight="175%"
            size="f7"
          />
        </Row>
        <Row fluid>
          <AnchorLink
            weight="bold"
            color="purple"
            value="Invia la tua richiesta online"
            to={data.linkRichiesta}
            textDecoration="none"
            _blank
          />
        </Row>
      </Column>
      <Column xs="12" sm="12" md="12" lg="4" padding="0" sizepadding={{ lg: '0 3em' }}>
        <Row fluid margin="1.8em 0 .5em">
          <Text
            transform="uppercase"
            letterSpacing="0.05em"
            value="CHIAMACI"
            lineHeight="175%"
            size="f7"
          />
        </Row>
        <Row fluid padding="0 0 0.5em">
          <AnchorLink
            weight="bold"
            color="purple"
            value={data.number}
            to={`tel:${data.number}`}
            textDecoration="none"
          />
        </Row>
      </Column>
      <Column xs="12" sm="12" md="12" lg="4" padding="0">
        <Row fluid margin="1.8em 0 .5em">
          <Text
            transform="uppercase"
            letterSpacing="0.05em"
            value="visita il sito"
            lineHeight="175%"
            size="f7"
          />
        </Row>
        <Row fluid padding="0 0 0.5em">
          <AnchorLink
            weight="bold"
            color="purple"
            value="io-welfare"
            to={data.link}
            textDecoration="none"
            _blank
          />
        </Row>
      </Column>
    </Row>
  </>
  );

HowContact.displayName = 'Educazione Finanziaria - HowContact';
export default HowContact;
