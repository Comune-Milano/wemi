/** @format */

import React from 'react';
import { Row, Column } from 'components/ui/Grid';
import Button from 'components/ui2/Button';
import Text from 'components/ui/Text';

const BottoniNavigazione = ({
  moveNextValid,
  moveBack,
  moveNext,
  openSummary,
}) => (
  <>
    <Row fluid margin="3em 0 2em">
      <Column xs="12" flex justifycontent="center" padding="0">
        {moveBack !== null && moveBack !== undefined && (
        <Button
          iconLeft="arrow-left"
          color="primary"
          label="INDIETRO"
          width="10rem"
          onClick={() => { moveBack(); }}
          margin="0 2em 0 0"
        />
          )}
        {moveNext !== null && moveNext !== undefined && (
        <Button
          disabled={!moveNextValid}
          iconRight="arrow-right"
          color="primary"
          label="AVANTI"
          width="10rem"
          onClick={() => { moveNext(); }}
        />
          )}
        {openSummary !== null && openSummary !== undefined && (
        <Button
          disabled={!moveNextValid}
          color="primary"
          label="RIEPILOGO"
          width="10rem"
          onClick={() => { openSummary(); }}
        />
          )}
      </Column>
      <Column xs="12" padding="2rem 0 0 0" sizepadding={{ md: '2rem 15% 0 15%' }}>
        <p style={{ textAlign: 'center' }}>
          <Text
            tag="span"
            size="f7"
            color="black"
            value="Andando avanti i dati inseriti vengono "
          />
          <Text
            tag="strong"
            size="f7"
            color="primary"
            value="salvati automaticamente"
          />
          <br />
          <Text
            tag="span"
            size="f7"
            color="black"
            value="Se vuoi completare la richiesta in un secondo momento, potrai riprendere la compilazione da dove hai lasciato."
          />
        </p>
      </Column>
    </Row>
  </>
  );

BottoniNavigazione.displayName = 'BottoniNavigazione';

export default BottoniNavigazione;
