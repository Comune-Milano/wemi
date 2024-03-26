import React from 'react';
import Text from 'components/ui/Text';
import { Row, Column } from 'components/ui/Grid';
import { BackgroundTitle } from 'components/ui2/BackgroundTitle';
import { bgTitleSizes } from 'components/ui2/BackgroundTitle/constants';
import { servizioSpecialistico } from './costants';

const ServizioSpecialistico = ({
  color,
}) => (
  <Row fluid>
    <Column padding="0">
      <BackgroundTitle
        bgColor={color}
        label={servizioSpecialistico.title}
        size={bgTitleSizes.small}
      />
    </Column>
    <Column padding="0" margin="1em 0 0 0">
      <Text
        value={servizioSpecialistico.content}
        lineHeight="175%"
        size="f7"
      />
    </Column>
  </Row>
);

ServizioSpecialistico.displayName = 'ServizioSpecialisticoNavigation';

export default ServizioSpecialistico;
