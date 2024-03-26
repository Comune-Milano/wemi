/** @format */

import React from 'react';
import { Column, Row } from 'components/ui/Grid';
import Text from 'components/ui/Text';
import Icon from 'components/ui/Icon';
import RatingStatico from 'components/ui/Rating/RatingStatico';
import enteLogo from 'images/entiloghi/comin.jpg';

const Info = () => (
  <Column xs="12" md="3">
    <Text value="Rilasciato da: " color="darkGrey" size="f6" tag="h1" weight="light" />
    <Text
      value="Nome Dell'Ente "
      transform="uppercase"
      letterSpacing="0.05em"
      color="blue"
      weight="bold"
      size="f6"
      tag="p"
    />
    <Icon src={enteLogo} width="60%" />
    <Text
      value="Servizio: "
      color="darkGrey"
      size="f7"
      tag="h1"
      weight="light"
      padding="1rem 0 0"
    />
    <Text
      value="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. "
      color="darkGrey"
      size="f8"
      tag="p"
    />
    <Row fluid padding="10px 0">
      <RatingStatico stars={5} rate={2.5} fontSize="f8" spacingRight="p0" />
      <Text value="(31)" color="darkGrey" size="f8" />
    </Row>
  </Column>
);

Info.displayName = 'Info';
export default Info;
