import AnchorLink from 'components/ui/AnchorLink';
import { Row } from 'components/ui/Grid';
import Text from 'components/ui/Text';
import React from 'react';
import { PAGE_QUERY_SERVICES } from 'types/url';
import { ID_SERVIZIO_CORSI_ITALIANO } from 'types/contento-servizio.constants';
import { generatePath } from 'react-router';
import { SEZIONI } from 'types/sezioni';
import { BoldBlueTextSpan, TextSpan, UnderlineBlueTextSpan } from '../../components.style';

const Finalità = () => (
  <>
    <Row fluid margin="1.8em 0 0 0">
      <Text
        weight="bold"
        size="f7"
        value="FINALITÀ"
        lineHeight="175%"
        color="blue"
        letterSpacing="0.05em"
      />
    </Row>
    <Row fluid>
      <TextSpan>
        Questa pagina sul tema dell&apos;Italiano L2 e il
      &nbsp;
        <AnchorLink
          to={generatePath(PAGE_QUERY_SERVICES, {
            idCategoria: ID_SERVIZIO_CORSI_ITALIANO,
            codSezione: SEZIONI.DOMICILIARITA,
          })}
          align="left"
          display="inline-block"
        >
          <UnderlineBlueTextSpan>
            catalogo dei Corsi di italiano
          </UnderlineBlueTextSpan>
        </AnchorLink>
      &nbsp;
        sono il risultato di un
        percorso avviato nel 2013 insieme alle Scuole presenti sul territorio, che si è concretizzato

        nella realizzazione del sito
      &nbsp;
        <i></i>
        , promosso dall&apos;allora Assessorato

        Politiche Sociali e Cultura della Salute del Comune di Milano, realizzato nell&apos;ambito del

        progetto Implementazione del Portale dell&apos;Integrazione e sua gestione sperimentale a livello

        locale in convenzione con ANCI e finanziato dal Ministero del Lavoro e delle Politiche Sociali.

        Negli anni successivi inoltre sono stati implementati diversi Progetti sul tema dell&apos;italiano L2

        (Fil Rouge, 2014 FEI, Parl@mi, FAMI 2017, Milano L2, FAMI 2019) che hanno permesso di creare

        una rete dialogante e costruttiva tra il pubblico e il privato sociale cittadino.
      </TextSpan>
    </Row>
    <Row fluid margin="1.8em 0 0 0">
      <BoldBlueTextSpan>
        L&apos;iniziativa nasce dalla necessità di favorire l&apos;incontro tra domanda e offerta di corsi di

        italiano per stranieri e straniere a Milano, ovvero per orientarli a trovare con facilità i

        corsi più adatti alle proprie esigenze.
      </BoldBlueTextSpan>
    </Row>
    <Row fluid>
      <TextSpan>
        Il portale WeMi garantisce anche di mantenere alti gli standard dell&apos;offerta formativa,

        stabilendo dei requisiti soggettivi e standard di qualità.
      </TextSpan>
    </Row>
    <Row fluid margin="1.8em 0 0 0">
      <TextSpan>
        Nel
        &nbsp;
        <AnchorLink
          to="/#scopri-i-servizi"
          align="left"
          display="inline-block"
        >
          <UnderlineBlueTextSpan>
            catalogo WeMi
          </UnderlineBlueTextSpan>
        </AnchorLink>
        &nbsp;
        è possibile trovare i corsi di italiano offerti specificamente dal terzo

        settore, ma nel portale è possibile reperire anche informazioni sulle altre tipologie di Scuole

        presenti in città, per dare alle persone tutti gli strumenti necessari ad una scelta

        consapevole. I cambiamenti normativi degli ultimi anni (in particolare la normativa

        sull&apos;Accordo Integrazione entrato in vigore nel 2012 e la normativa sui requisiti per richiedere

        la cittadinanza introdotti nel 2018) assegnano una maggiore importanza alla conoscenza

        della lingua italiana, che influisce sul rilascio e il rinnovo di alcuni titoli di soggiorno e quindi

        sulla situazione giuridica delle persone.
      </TextSpan>
    </Row>
    <Row fluid margin="1.8em 0 0 0">
      <TextSpan>
        La sezione WeMi Inclusione di questa piattaforma è un punto di accesso digitale alle attività

        svolte nella sede di WeMi Inclusione (Via Don Carlo San Martino, 10), dove vengono erogati i

        Servizi del Comune di Milano dedicati alle cittadine e i cittadini stranieri presenti in città. Tali

        servizi hanno l&apos;obiettivo di facilitare il processo di inserimento e l&apos;orientamento tra le

        possibilità offerte dal Comune di Milano - compresi i corsi di lingua italiana.
      </TextSpan>
    </Row>
  </>
  );

Finalità.displayName = 'Finalità';
export default Finalità;
