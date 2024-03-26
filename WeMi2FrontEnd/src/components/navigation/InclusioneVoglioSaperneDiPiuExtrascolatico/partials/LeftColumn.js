import React from 'react';
import CercoOffroScuola from './partialsLeftColumn/CercoOffroScuola';
import CosaOffre from './partialsLeftColumn/CosaOffre';
import AChiERivolto from './partialsLeftColumn/AChiERivolto';
import ConChiCollabora from './partialsLeftColumn/ConChiCollabora';
import { Row, Column } from 'components/ui/Grid';

const LeftColumn = () => (
  <Row fluid>
    <Column padding="0">
      <CercoOffroScuola />
    </Column>
    <Column padding="0" margin="2em 0 0 0">
      <CosaOffre/>
    </Column>
    <Column padding="0" margin="3em 0 0 0">
      <AChiERivolto/>
    </Column>
    <Column padding="0" margin="5em 0 0 0">
      <ConChiCollabora/>
    </Column>
  </Row>
);

LeftColumn.displayName = 'LeftColumnNavigation';

export default LeftColumn;