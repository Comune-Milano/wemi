import React from 'react';
import { Row, Column } from 'components/ui/Grid';
import ServizioSpecialistico from './partialsLeftColumn/ServizioSpecialistico';
import CosaOffreCittadini from './partialsLeftColumn/CosaOffreCittadini';
import CosaOffreServizi from './partialsLeftColumn/CosaOffreServizi';
import AChi from './partialsLeftColumn/AChi';
import ConChi from './partialsLeftColumn/ConChi';

const LeftColumnVoglioSapereDiPiu = ({
  color = 'green',
}) => (
  <Row fluid>
    <Column padding="0">
      <ServizioSpecialistico
        color={color}
      />
    </Column>
    <Column padding="0" margin="2.5em 0 0 0">
      <CosaOffreCittadini
        color={color}
      />
    </Column>
    <Column padding="0" margin="2.5em 0 0 0">
      <CosaOffreServizi
        color={color}
      />
    </Column>
    <Column padding="0" margin="2.5em 0 0 0">
      <AChi
        color={color}
      />
    </Column>
    <Column padding="0" margin="2.5em 0 0 0">
      <ConChi
        color={color}
      />
    </Column>
  </Row>
);

LeftColumnVoglioSapereDiPiu.displayName = 'LeftColumnVoglioSapereDiPiuNavigation';

export default LeftColumnVoglioSapereDiPiu;
