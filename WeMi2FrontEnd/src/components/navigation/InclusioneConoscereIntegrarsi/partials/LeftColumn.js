import React from 'react';
import { BackgroundTitle } from 'components/ui2/BackgroundTitle';
import { bgTitleSizes } from 'components/ui2/BackgroundTitle/constants';
import { Row, Column } from 'components/ui/Grid';
import { leftTitle } from './costants';
import IlProgetto from './leftPartials/IlProgetto';
import Obiettivi from './leftPartials/Obiettivi';
import Azioni from './leftPartials/Azioni';

const LeftColumn = ({
  color = "blue"
}) => (
  <Row fluid>
    <BackgroundTitle
      label={leftTitle}
      bgColor={color}
      size={bgTitleSizes.small}
    />
    <Column padding="0" margin="0.5em 0 0 0">
      <IlProgetto />
    </Column>
    <Column padding="0" margin="1.8em 0 0 0">
      <Obiettivi />
    </Column>
    <Column padding="0" margin="1.8em 0 0 0">
      <Azioni />
    </Column>
  </Row>
);

LeftColumn.displayName = 'LeftColumnNavigation';

export default LeftColumn;