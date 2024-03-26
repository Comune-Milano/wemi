import React from 'react';
import AnchorLink from 'components/ui/AnchorLink';
import { Row } from 'components/ui/Grid';
import { BackgroundTitle } from 'components/ui2/BackgroundTitle';
import { bgTitleSizes } from 'components/ui2/BackgroundTitle/constants';
import { PAGE_INCLUSIONE_CONOSCERE_INTEGRARSI, PAGE_QUERY_SERVICES, PAGE_INCLUSIONE_MILANO_L2 } from 'types/url';
import { ID_SERVIZIO_CORSI_ITALIANO } from 'types/contento-servizio.constants';
import { NavLink } from 'react-router-dom';
import { SEZIONI } from 'types/sezioni'
import { TextSpan, UnderlineBlueTextSpan } from '../components.style';

const IlProgetto = () => (
  <>
    <Row fluid>
      <BackgroundTitle size={bgTitleSizes.small} label="IL PROGETTO" bgColor="blue" />
    </Row>
    <Row fluid margin="1.8em 0 0 0">
      <TextSpan>
        Il servizio del Comune di Milano che informa  e orienta ai corsi di Italiano L2.
        <br />
        Il servizio è finanziato nell&apos;ambito del progetto&nbsp;
        <NavLink
          to={PAGE_INCLUSIONE_CONOSCERE_INTEGRARSI}
          align="left"
          display="inline-block"
        >
          <UnderlineBlueTextSpan>
            Conoscere per Integrarsi
          </UnderlineBlueTextSpan>
        </NavLink>
        &nbsp;con capofila Regione Lombardia.
        <br />
        Il servizio è offerto da operatori sociali esperti nella gestione di servizi per l&apos;inclusione e collabora attivamente con la rete di Istituzioni ed Enti del Terzo Settore che dal 2013 promuove l&apos;apprendimento dell&apos;Italiano L2 quale strumento di integrazione.  La rete di collaborazione si è sviluppata attraverso progetti finanziati dal Ministero del Lavoro e delle Politiche Sociali, dal Ministero dell&apos;Interno e dal Fondo Asilo Migrazione e Integrazione (FAMI).
        <br />
        Attualmente e fino al giugno del 2022, è attivo il Progetto&nbsp;
        <NavLink
          to={PAGE_INCLUSIONE_MILANO_L2}
          align="left"
          display="inline-block"
        >
          <UnderlineBlueTextSpan>
            FAMI Milano L2
          </UnderlineBlueTextSpan>
        </NavLink>
        &nbsp;di cui il Comune di Milano è partner.
        <br />
        Gestisce il&nbsp;
        <NavLink
          to={`${PAGE_QUERY_SERVICES}?idCategoria=${ID_SERVIZIO_CORSI_ITALIANO}&codSezione=${SEZIONI.DOMICILIARITA}`}
          align="left"
          display="inline-block"
        >
          <UnderlineBlueTextSpan>
            catalogo Corsi di Lingua Italiana
          </UnderlineBlueTextSpan>
        </NavLink>
        &nbsp;sul portale WeMi, in cui è possibile trovare i corsi di Italiano
        offerti dal Terzo Settore Cittadino, selezionati dal Comune di Milano attraverso un
        {' '}
        <AnchorLink
          to=""
          align="left"
          display="inline-block"
          _blank
        >
          <UnderlineBlueTextSpan>
            avviso pubblico
          </UnderlineBlueTextSpan>
        </AnchorLink>
        &nbsp;(Elenco WeMi).
      </TextSpan>
    </Row>
  </>
);

IlProgetto.displayName = 'IlProgetto';

export default IlProgetto;
