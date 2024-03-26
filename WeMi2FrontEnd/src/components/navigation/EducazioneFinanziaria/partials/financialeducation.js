import React from 'react';
import { BackgroundTitle } from 'components/ui2/BackgroundTitle';
import { Column, Row } from 'components/ui/Grid';
import Text from 'components/ui/Text';

const FinancialEducation = () => (
  <>
    <Row fluid sizepadding={{ xs: '3rem 0 0 0', md: '7rem 0 0 0' }}>
      <Column xs="12" sizepadding={{ xs: '0 0 2.5rem 0' }} padding="0">
        <BackgroundTitle
          label="EDUCAZIONE FINANZIARIA"
          size="small"
          color="white"
          bgColor="purple"
        />
      </Column>
      <Column xs="12" padding="0">
        <Text
          value="Hai bisogno di aiuto nel gestire bene i risparmi e raggiungere obiettivi importanti?"
          weight="bold"
        />
      </Column>
      <Column xs="12" padding="0">
        <Text
          value="WeMi Educazione Finanziaria è il servizio gratuito del Comune di Milano che prevede l'accompagnamento personale da parte di un'educatrice o un educatore finanziario abilitato, proveniente dal mondo del terzo settore."
          lineHeight="175%"
          size="f7"
          color="black"
        />
      </Column>
      <Column xs="12" padding="2rem 0 0 0">
        <Text
          value='Il servizio è conforme alla norma tecnica di qualità UNI 11402:2011 "Educazione finanziaria del cittadino" e si rifà alle esperienze internazionali del Governo inglese (Money Advice Service) e delle principali città statunitensi (Offices of Financial Empowerment) nell&apos;offrire un supporto per il benessere delle famiglie. In Italia, l&apos;educazione finanziaria è regolata da una legge dello Stato ed è supportata da un Comitato Nazionale che ha definito linee guida per chi realizza percorsi di alfabetizzazione e educazione.'
          lineHeight="175%"
          size="f7"
          color="black"
        />
      </Column>
    </Row>
  </>
  );

FinancialEducation.displayName = 'FinancialEducation';


export default FinancialEducation;
