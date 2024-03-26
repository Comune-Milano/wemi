/** @format */

import React from 'react';
import Text from 'components/ui/Text';
import { Row, Column } from 'components/ui/Grid';
import styled from 'styled-components';
import { colors } from 'theme';

export const StyledRow = styled(Row)`
  border-bottom: 2px solid ${colors.grey};
  `;

export const RightRow = styled(Row)`
  justify-content: flex-end;
  `;

// eslint-disable-next-line react/display-name
const TransactionSectionDesktop = React.memo(({
  transazione,
}) => {
  return (
    <React.Fragment>
      <Row fluid padding="0.8em 0 0 0">
        <Column md="3" padding="0" margin="0 0 0 0.5em" order={{ md: 1 }}>
          <Row padding="0">
            <Text
              padding="0"
              align="left"
              value="Servizio Acquistato"
              color="darkGrey"
              transform="uppercase"
              letterSpacing="0.05em"
              size="f8"
              weight="bold"
            />
          </Row>
        </Column>
        <Column md="3" padding="0" margin="0 0 0 0.5em" order={{ md: 2 }}>
          <Row padding="0">
            <Text
              padding="0"
              align="left"
              value="Ente"
              color="darkGrey"
              transform="uppercase"
              letterSpacing="0.05em"
              size="f8"
              weight="bold"
            />
          </Row>
        </Column>
        <Column md="2" padding="0" margin="0 0 0 0.5em" order={{ md: 3 }}>
          <Row padding="0">
            <Text
              padding="0"
              align="left"
              value="data utilizzo"
              color="darkGrey"
              transform="uppercase"
              letterSpacing="0.05em"
              size="f8"
              weight="bold"
            />
          </Row>
        </Column>
        <Column md="1" padding="0" margin="0 0 0 0.5em" order={{ md: 4 }}>
          <RightRow paddin="0">
            <Text
              padding="0 0.8em 0 0"
              align="right"
              value="importo"
              color="darkGrey"
              transform="uppercase"
              letterSpacing="0.05em"
              size="f8"
              weight="bold"
            />
          </RightRow>
        </Column>
        <Column md="2" padding="0" margin="0 0.5em 0 0" order={{ md: 5 }}>
          <Row padding="0">
            <Text
              padding="0"
              align="left"
              value="stato"
              color="darkGrey"
              transform="uppercase"
              letterSpacing="0.05em"
              size="f8"
              weight="bold"
            />
          </Row>
        </Column>
      </Row>
      <Row fluid padding="0">
        <Column md="3" padding="0 0 0.5em 0" margin="0 0 0 0.5em" order={{ md: 1 }}>
          <Row padding="0">
            <Text
              padding="0"
              margin="0"
              size="f6"
              weight="bold"
              lineHeight="2em"
              transform="uppercase"
              value={`${transazione?.servizioAcquistato ? transazione.servizioAcquistato : ''}`}
            />
          </Row>
        </Column>
        <Column md="3" padding="0 0 0.5em 0" margin="0 0 0 0.5em" order={{ md: 2 }}>
          <Row padding="0">
            <Text
              padding="0"
              margin="0"
              size="f6"
              weight="bold"
              lineHeight="2em"
              transform="uppercase"
              value={`${transazione?.nomeEnte ? transazione.nomeEnte : ''}`}
            />
          </Row>
        </Column>
        <Column md="2" padding="0 0 0.5em 0" margin="0 0 0 0.5em" order={{ md: 3 }}>
          <Row padding="0">
            <Text
              padding="0"
              margin="0"
              size="f6"
              weight="bold"
              lineHeight="2em"
              transform="uppercase"
              value={`${transazione?.dataUtilizzoVoucher ? transazione.dataUtilizzoVoucher : ''}`}
            />
          </Row>
        </Column>
        <Column md="1" padding="0 0 0.5em 0" margin="0 0 0 0.5em" order={{ md: 4 }}>
          <RightRow padding="0">
            <Text
              padding="0 1em 0 0"
              margin="0"
              size="f6"
              weight="bold"
              lineHeight="2em"
              transform="uppercase"
              color={transazione?.state === 'Stornata' ? 'red' : 'primary'}
              value={transazione?.importoSpeso ? transazione?.importoSpeso : ''}
            />
          </RightRow>
        </Column>
        <Column md="2" padding="0 0 0.5em 0" margin="0 0.5em 0 0" order={{ md: 5 }}>
          <Row padding="0">
            <Text
              padding="0"
              margin="0"
              size="f6"
              weight="bold"
              lineHeight="2em"
              transform="uppercase"
              color={transazione?.state === 'Stornata' ? 'red' : 'primary'}
              value={`${transazione?.state ? transazione.state : ''}`}
            />
          </Row>
        </Column>
      </Row>
    </React.Fragment>
  );
});


TransactionSectionDesktop.displayName = 'TransactionSectionDesktop';

export default TransactionSectionDesktop;
