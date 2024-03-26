/** @format */

import React from 'react';
import Text from 'components/ui/Text';
import { Row, Column } from 'components/ui/Grid';

export const BodyModal = (
  <Row fluid margin="6em 0 0 0" justifycontent="center">
    <Column xs="12" justifycontent="center">
      <Text
        tag="p"
        size="f7"
        align="center"
        value={"La tua richiesta è già stata inoltrata"}
        weight="bold"
      />
    </Column>
  </Row>
);
