import React from 'react';
import { Row } from 'components/ui/Grid';
import Text from 'components/ui/Text';
import { TextSpan } from 'components/navigation/InfoApprendimentoLingua/components.style';

const Azioni = () => (
  <>
    <Row fluid margin="2em 0 0 0">
      <Text
        value="AZIONI"
        size="f6"
        weight="bold"
        letterSpacing="0.05em"
        color="blue"
        lineHeight="175%"
      />
    </Row>
    <Row fluid>
      <TextSpan>
        L&apos;offerta formativa, specializzata e sperimentale, rivolta a questi target vulnerabili, è proposta dagli enti partner
        di una rete di scuole di italiano L2 promossa dal Comune di Milano, in collaborazione anche con il CPIA5. All&apos;interno del progetto
        e in ottica di sperimentazione, è previsto un percorso di coinvolgimento di giovani sia di origine italiana che con background
        migratorio, inseriti come tutor in alcune scuole, in affiancamento agli e alle apprendenti. Inoltre, l&apos;esperienza e le competenze
        degli enti partner viene valorizzata e potenziata all&apos;interno di due comunità di pratiche, in cui insegnanti e operatori sono chiamati a
        condividere apprendimenti e sperimentare pratiche, accompagnati e supervisionati da Codici Ricerca e Intervento e da Fondazione ISMU.
        Gli stessi due enti, propongono anche una formazione a docenti, volontari e operatori interessati al tema dell&apos;italiano L2.
      </TextSpan>
    </Row>
  </>
);

Azioni.displayName = 'Azioni';
export default Azioni;
