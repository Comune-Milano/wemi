/** @format */

import React from 'react';
import Text from 'components/ui/Text';
import { Row, Column } from 'components/ui/Grid';


// eslint-disable-next-line react/display-name
const TransactionSectionMobile = React.memo(({
  transazione,
}) => {
  return (
    <React.Fragment>
      <Row fluid padding="0">
        <Column xs="12" padding="0.8em 0 0.5em 0" margin="0 0 0 0.5em">
          <Row fluid padding="0" margin="0">
            <Column xs="6" padding="0">
              <Text
                padding="0"
                margin="0"
                align="left"
                value="Servizio Acquistato"
                color="darkGrey"
                transform="uppercase"
                letterSpacing="0.05em"
                size="f10"
              />
            </Column>
            <Column xs="6" padding="0">
              <Text
                padding="0"
                margin="0"
                align="left"
                value="Ente"
                color="darkGrey"
                transform="uppercase"
                letterSpacing="0.05em"
                size="f10"
              />
            </Column>
          </Row>
          <Row fluid padding="0" margin="0">
            <Column xs="6" padding="0">
              <Text
                padding="0"
                margin="0"
                size="f10"
                weight="bold"
                lineHeight="2em"
                transform="uppercase"
                value={`${transazione?.servizioAcquistato ? transazione.servizioAcquistato : ''}`}
              />
            </Column>
            <Column xs="6" padding="0">
              <Text
                padding="0"
                margin="0"
                size="f10"
                weight="bold"
                lineHeight="2em"
                transform="uppercase"
                value={`${transazione?.nomeEnte ? transazione.nomeEnte : ''}`}
              />
            </Column>
          </Row>
        </Column>
      </Row>
      <Row fluid padding="0">
        <Column xs="12" padding="0 0 0.5em 0" margin="0 0 0 0.5em">
          <Row fluid padding="0" margin="0">
            <Column xs="3" padding="0">
              <Text
                padding="0"
                margin="0"
                align="left"
                value="data utilizzo"
                color="darkGrey"
                transform="uppercase"
                letterSpacing="0.05em"
                size="f10"
              />
            </Column>
            <Column xs="3" padding="0">
              <Text
                padding="0"
                margin="0"
                align="left"
                value="importo"
                color="darkGrey"
                transform="uppercase"
                letterSpacing="0.05em"
                size="f10"
              />
            </Column>
            <Column xs="6" padding="0">
              <Text
                padding="0"
                margin="0"
                align="left"
                value="stato"
                color="darkGrey"
                transform="uppercase"
                letterSpacing="0.05em"
                size="f10"
              />
            </Column>
          </Row>
          <Row padding="0" margin="0">
            <Column xs="3" padding="0">
              <Text
                padding="0"
                margin="0"
                size="f10"
                weight="bold"
                lineHeight="2em"
                transform="uppercase"
                value={`${transazione?.dataUtilizzoVoucher ? transazione.dataUtilizzoVoucher : ''}`}
              />
            </Column>
            <Column xs="3" padding="0">
              <Text
                padding="0"
                margin="0"
                size="f10"
                weight="bold"
                lineHeight="2em"
                transform="uppercase"
                color={transazione?.state === 'Stornata' ? 'red' : 'primary'}
                value={transazione?.importoSpeso ? transazione?.importoSpeso : ''}
              />
            </Column>
            <Column xs="6" padding="0">
              <Text
                padding="0"
                margin="0"
                size="f10"
                weight="bold"
                lineHeight="2em"
                transform="uppercase"
                color={transazione?.state === 'Stornata' ? 'red' : 'primary'}
                value={`${transazione?.state ? transazione.state : ''}`}
              />
            </Column>
          </Row>
        </Column>
      </Row>
    </React.Fragment>
  );
});


TransactionSectionMobile.displayName = 'TransactionSectionMobile';

export default TransactionSectionMobile;
