/** @format */

import React from 'react';
import { Row } from 'components/ui/Grid';
import Text from 'components/ui/Text';
import { Wrapper, Info, Riepilogo } from './partials';

const HandleOrder = () => (
  <Wrapper fluid justifycontent="space-between">
    <Row fluid padding="5px 20px 0">
      <Text value="Stai acquistando: " color="primary" size="f5" tag="p" weight="light" />
    </Row>
    <Info />
    <Riepilogo />
  </Wrapper>
);

HandleOrder.displayName = 'HandleOrder';
export default HandleOrder;
