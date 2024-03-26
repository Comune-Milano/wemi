/** @format */

import React from 'react';
import styled from 'styled-components';
import { Row, Column } from 'components/ui/Grid';
import { colors } from 'theme';
import Text from 'components/ui/Text';
import RatingStatico from 'components/ui/Rating/RatingStatico';
import Button from 'components/ui/Button';
import NavLink from 'components/router/NavLink';
import { PAGE_ORDER_URL } from 'types/path';

const AcquistaServizioRow = styled(Row)`
  border: 1px solid ${colors.primary};
  padding: 10px
  margin-top: 20px;
  &:first-child {
      margin-top: 0;
  }
`;

const LabelCostColumn = styled(Column)`
  display: flex;
  background-color: ${colors.grey};
  justify-content: center;
  align-items: center;
`;

const Servizio = ({ props }) => {
  const { nomeEnte } = props;
  return (
    <AcquistaServizioRow fluid justifycontent="space-between">
      <Column
        xs="12"
        md="6"
        padding="0"
        margin="5px"
        flex
        direction="column"
        justifycontent="space-between"
        alignitems="center"
      >
        <Row fluid>
          <Text value="Servizio:" color="darkGrey" size="f8" weight="bold" tag="p" />
          <Text
            value="Lorem ipsum dolor sit amet, consectetur adipisici elit, sed eiusmod tempor incidunt ut labore."
            color="darkGrey"
            size="f8"
            tag="p"
          />
        </Row>
        <Row fluid>
          <Column xs="9" padding="0">
            <Row fluid flex alignitems="center">
              <Text value="Rilasciato da: " color="darkGrey" size="f9" weight="bold" />

              <Text value={nomeEnte} color="blue" size="f8" />
            </Row>

            <Row fluid flex alignitems="center">
              <Text value="Scadenza offerta:" color="darkGrey" size="f9" weight="bold" />
              <Text value=" gg/mm/aaaa - h: 12:30" color="red" size="f8" />
            </Row>
          </Column>
          <Column xs="3" padding="0" flex justifycontent="flex-end" alignitems="flex-end">
            <RatingStatico fontSize="f9" stars={5} rate={3} spacingRight="p0" />
            <Text value="(32)" color="darkGrey" size="f9" />
          </Column>
        </Row>
      </Column>
      <LabelCostColumn xs="12" md="2" padding="0" margin="5px">
        <Text value="€" color="primary" size="f8" />
        <Text value="32,00" color="primary" size="f5" />
      </LabelCostColumn>
      <Column
        xs="12"
        md="3"
        padding="0"
        margin="5px"
        flex
        alignitems="center"
        direction="column"
        justifycontent="space-between"
      >
        <Row fluid padding="2.5px 0">
          <NavLink to={PAGE_ORDER_URL}>
            <Button fontSize="f9" type="primary" value="Acquista entro 24h" />
          </NavLink>
        </Row>
        <Row fluid padding="2.5px 0">
          <Button fontSize="f9" value="Rimuovi" />
        </Row>
        <Row fluid padding="2.5px 0">
          <Button fontSize="f9" value="Torna all'ordine" />
        </Row>
      </Column>
    </AcquistaServizioRow>
  );
};

Servizio.displayName = 'Servizio';

export default Servizio;
