/** @format */
import React from 'react';
import styled from 'styled-components';
import Text from 'components/ui/Text';
import { Row, Column } from 'components/ui/Grid';
import { BackgroundTitle, bgTitleSizes } from 'components/ui2/BackgroundTitle';
import Wrapper from './Wrapper';
import { HOME_ANCHORS } from '../constants/anchors';
import { contacts } from './constant';
import media from 'utils/media-queries';

const StyledWrapper = styled(Wrapper)`
  a {
    color: rgb(0, 92, 185) !important;
  }
`;

const Contacts = () => (
  <StyledWrapper 
    id={HOME_ANCHORS.comeContattarci} 
    paddingBottom="7.81rem" 
    paddingBottomMd="7.81rem" 
    paddingTop="7.42rem"
  >
    <div>
      <BackgroundTitle
        label="CONTATTI"
        transform="uppercase"
        bgColor="blue"
        size={bgTitleSizes.small}
      />
    </div>
    <Column padding="0" lg="5" md="6" margin="1.5em 0 0 0">
      <Text
        size="f7"
        color="black"
        value="Hai bisogno di maggiori informazioni o desideri comunicare direttamente con un operatore WeMi?"
      />
    </Column>
    <Row margin="0" justifycontent="flex-start" alignitems="strech">
      {
        contacts.map(contact => (
          <Column xs="12" md="4" padding="1.5em 0 0 0" key={`contact-home-${contact.label}`}>
            <Text
              color="darkGrey"
              tag="div"
              value={contact.label}
              transform="uppercase"
              letterSpacing="0.05em"
              size="f8"
            />
            <Text
              color="blue"
              tag="div"
              value={contact.value}
              weight="bold"
              size="f7"
            />
          </Column>
        ))
      }
    </Row>
    <Column padding="0" margin="1.5em 0 0 0">
      <Text
        color="blue"
        value="AIUTACI A MIGLIORARE WeMi"
        size="f6"
        weight="bold"
        letterSpacing="0.05rem"
      />
    </Column>
    <Column padding="0" lg="6" md="8">
      <Text
        value="Ci auguriamo il portale WeMi riasca a soddisfare le tue esigenze."
        size="f7"
        tag="div"
      />
      <Text
        value="La tua opinione per noi è molto importante, ci permetterà di migliorare i nostri servizi e le funzionalità della piattaforma."
        size="f7"
        tag="div"
      />
      <Text
        value="Per segnalazioni e suggerimenti scrivici a:"
        size="f7"
      />
      &nbsp;
      <a style={{ fontWeight: 'bold' }} href="mailto:info.wemi@comune.milano.it<">info.wemi@comune.milano.it</a>
    </Column>
  </StyledWrapper>
);

Contacts.displayName = 'Contacts-Home';

export default React.memo(Contacts);
