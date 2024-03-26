import React from 'react';
import { Row } from 'components/ui/Grid';
import Text from 'components/ui/Text';
import { TextSpan } from 'components/navigation/InfoApprendimentoLingua/components.style';

const Obiettivi = () => (
  <>
    <Row fluid margin="2em 0 0 0">
      <Text
        value="OBIETTIVI"
        size="f6"
        weight="bold"
        letterSpacing="0.05em"
        color="blue"
        lineHeight="175%"
      />
    </Row>
    <Row fluid>
      <TextSpan>
        <i>Milano L2 </i>
        si pone l&apos;obiettivo di potenziare la formazione linguistica e civica a Milano per rispondere ai bisogni formativi e di integrazione di due target specifici di popolazione: donne e minori con background migratorio.
      </TextSpan>
    </Row>
  </>
);

Obiettivi.displayName = 'Obiettivi';
export default Obiettivi;
