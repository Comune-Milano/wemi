import { Row } from 'components/ui/Grid';
import AnchorLink from 'components/ui/AnchorLink';
import Text from 'components/ui/Text';
import React from 'react';
import { TextSpan, UnderlineBlueTextSpan } from '../../components.style';

const ChiSiamoCosaFacciamo = () => (
  <>
    <Row fluid margin="1.8em 0 0 0">
      <Text
        weight="bold"
        size="f7"
        value="CHI SIAMO E COSA FACCIAMO"
        lineHeight="175%"
        color="blue"
        letterSpacing="0.05em"
      />
    </Row>
    <Row fluid>
      <TextSpan>
        Siamo un gruppo di lavoro con una formazione multidisciplinare che dà informazione e

        orientamento riguardo i corsi di italiano L2. L&apos;equipe è composta da operatori sociali sia

        pubblici che del privato sociale, in grado di comprendere l&apos;offerta delle scuole, del Terzo

        settore e delle Associazioni presenti a Milano. Siamo finanziati tramite fondi europei (FAMI -

        Fonda Asilo Migrazione e Integrazione) e del Ministero dell&apos;Interno - attualmente:
        &nbsp;
        <AnchorLink
          to=""
          _blank
          align="left"
          display="inline-block"
        >
          <UnderlineBlueTextSpan>
            FAMI,

            Conoscere per Integrarsi
          </UnderlineBlueTextSpan>
        </AnchorLink>
        &nbsp;
        e
        &nbsp;
        <i>Milano L2.</i>
      </TextSpan>
      <Row fluid margin="1.8em 0 0 0">
        <TextSpan>
          Lavorando in sinergia con i servizi offerti dal territorio e dalla piattaforma WeMi, facilitiamo

          l&apos;inclusione delle persone straniere e rispondiamo alle loro specifiche esigenze. Dialoghiamo

          con le persone su diversi canali (e-mail, telefono, colloqui in presenza) per aiutarle a scegliere

          un corso adatto alle loro richieste.

          <p>
            Sviluppiamo - in collaborazione con Regione Lombardia, i CPIA (Centri Provinciali per

            l&apos;Istruzione degli Adulti) e con le altre Scuole - interventi per favorire l&apos;accesso di persone o

            gruppi con esigenze particolari ai corsi di lingua italiana.
          </p>

          Agevoliamo l&apos;incontro tra domanda e offerta di Corsi di italiano L2, in particolare per

          categorie specifiche e vulnerabili.

          <p>
            Ci poniamo l&apos;obiettivo di rafforzare il coordinamento e l&apos;integrazione tra i soggetti della rete

            per migliorare l&apos;efficacia dei Corsi di italiano L2.
          </p>
        </TextSpan>
      </Row>
    </Row>
  </>
  );

ChiSiamoCosaFacciamo.displayName = 'ChiSiamoCosaFacciamo';
export default ChiSiamoCosaFacciamo;
