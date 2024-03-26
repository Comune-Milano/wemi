/** @format */

import React from 'react';
import { Column } from 'components/ui/Grid';
import Text from 'components/ui/Text';

const Info = () => (
  <Column xs="12" md="3">
    <Text
      value="Lorem ipsum dolor sit amet, consectetur adipisici elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipisici elit."
      color="darkGrey"
      size="f7"
      tag="p"
    />
  </Column>
);

Info.displayName = 'Info';
export default Info;
