import React from 'react';
import { Row } from 'components/ui/Grid';
import Text from 'components/ui/Text';
import { BackgroundTitle } from 'components/ui2/BackgroundTitle';
import { bgTitleSizes } from 'components/ui2/BackgroundTitle/constants';
import { PAGE_QUERY_SERVICES } from 'types/url';
import { ID_SERVIZIO_CORSI_ITALIANO } from 'types/contento-servizio.constants';
import { SEZIONI } from 'types/sezioni';
import AnchorLink from 'components/ui/AnchorLink';
import { UnderlineBlueTextSpan, TextSpan } from '../components.style';
import { cosaOffreScuolaContent } from './costants';

const CosaOffreScuola = () => (
  <>
    <Row fluid margin="1.8em 0 0 0">
      <BackgroundTitle size={bgTitleSizes.small} label="Cosa offre alle scuole di italiano e ai servizi" bgColor="blue" />
    </Row>
    <Row fluid margin="1em 0 0 0">
      <Text
        weight="bold"
        size="f6"
        value="SUPPORTO PER ADESIONE ALL'ELENCO WeMi - CORSI DI LINGUA ITALIANA"
        lineHeight="175%"
        color="blue"
        letterSpacing="0.05em"
      />
    </Row>
    <Row fluid>
      <TextSpan>
        Per ricevere assistenza per l&apos;adesione all&apos;Elenco WeMi – Sezione&nbsp;
        <AnchorLink
          to={`${PAGE_QUERY_SERVICES}?idCategoria=${ID_SERVIZIO_CORSI_ITALIANO}&codSezione=${SEZIONI.DOMICILIARITA}`}
          align="left"
          display="inline-block"
        >
          <UnderlineBlueTextSpan>
            Corsi di Lingua Italiana
          </UnderlineBlueTextSpan>
        </AnchorLink>
        &nbsp;e per promuovere le proprie attività attraverso il portale WeMi.
      </TextSpan>
    </Row>
    {
      cosaOffreScuolaContent.map((text, index) => (
        <React.Fragment key={`content-CosaOffreScuola-${index.toString()}`}>
          <Row fluid margin="1em 0 0 0">
            <Text
              weight="bold"
              size="f6"
              value={text.title}
              lineHeight="175%"
              color="blue"
              letterSpacing="0.05em"
            />
          </Row>
          <Row fluid>
            <Text
              size="f7"
              value={text.text}
              lineHeight="175%"
            />
          </Row>
        </React.Fragment>
      ))
    }
  </>
);

CosaOffreScuola.displayName = 'CosaOffreScuola';
export default CosaOffreScuola;
