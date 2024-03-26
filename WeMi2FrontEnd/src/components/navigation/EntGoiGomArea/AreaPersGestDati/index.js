/** @format */

import React from 'react';
import Text from 'components/ui/Text';
import styled from 'styled-components';
import { Page, Row, Column } from 'hedron';
import { areaPersGestDati } from 'mocks/areaPersGestDati';
import CardAreaPers from 'components/navigation/EntGoiGomArea/CardAreaPers';

const Title = styled(Text)`
  &&& {
    text-align: left;
    color: #707070;
  }
`;

const GestDatiPers = () => (
  <div>
    <Page>
      <Row divisions={4}>
        <Column lg={4} />
        <Title value={areaPersGestDati.titlePage} size="f2" weight="bold" tag="label" />
      </Row>
      <Row>
        <Column lg={12}>
          <CardAreaPers />
        </Column>
      </Row>
    </Page>
  </div>
);
GestDatiPers.displayName = 'GestDatiPers';

export default GestDatiPers;
