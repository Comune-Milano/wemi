/** @format */

import React from 'react';
import styled from 'styled-components';
import { sharing } from 'mocks/SharingJson';
import Button from 'components/ui/Button';
import Text from 'components/ui/Text';
import { Row, Column } from 'components/ui/Grid';
import SharingPct from 'images/homepage/condivisione/condivisione.jpg';
import Label from 'components/ui/Label';

const SharingPage = styled(Row)`
    background-image: url(${SharingPct});
    background-attachment: fixed;
    background-size: cover;
    width: 100%;
`;

const MyColumn = styled(Column)`
    display: inline;
`;

const Sharing = () => (
  <SharingPage fluid margin="3em 0">
    <Row fluid >
      <Label
        intlFormatter
        size="f6"
        color="white"
        bgcolor="red"
        transform="uppercase"
        value={sharing.label}
      />
    </Row>



    <Row fluid justifycontent="space-around" padding="4em 3em 1em">
      <Column xs="12" md="3"  fluid alignitems="center" margin="0 0 2em">
        <Text
          value={sharing.title.WeMi}
          intlFormatter
          color="white"
          weight="light"
          tag="label"
          size="f1"
          padding="0 0.6rem 0 0"
        />
        <Text
          value={sharing.title.condivisione}
          intlFormatter
          color="white"
          weight="bold"
          tag="label"
          size="f1"
        />
      </Column>

      <MyColumn xs={12} md={6} padding="0">
        <Text size="f6" value={sharing.description.light} color="white" intlFormatter        padding="0 0.2em 0 0" />
        <Text size="f6"
          value={sharing.description.bold}
          color="white"
          weight="bold"
          intlFormatter
          padding="0 0.2em 0 0"
        />
     
        <Text size="f6" value={sharing.description.light1} color="white" intlFormatter    padding="0 0.2em 0 0"/>

        <Text size="f6"
          value={sharing.description.bold1}
          color="white"
          weight="bold"
          intlFormatter
          padding="0 0.2em 0 0"
        />
        <Text size="f6"  value={sharing.description.light2} color="white" intlFormatter
           padding="0 0.2em 0 0" />
      </MyColumn>
    </Row>

    <Row fluid justifycontent="flex-end" >
    <Column xs="6" sm="4" md="3" lg="2" margin="1em 4em">
      <Button type="cancel" value="approfondisci" />
      </Column>
    </Row>
  </SharingPage>
);

Sharing.displayName = 'Sharing';

export default Sharing;
