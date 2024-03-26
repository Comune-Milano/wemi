/** @format */

import React from 'react';
import { Row, Column } from 'components/ui/Grid';
import Button from 'components/ui2/Button';

const ButtonsRilasciato = ({
    isAdmin,
    isCittadino,
    callUpdateRec,
    callConfermaRec,
    setRedirect,
}) => (
  <>
    <Row fluid margin="3em 0 2em">
      <Column xs="12" flex justifycontent="center" padding="0">
        {isAdmin ? (
          <>
            <Button
              autowidth
              submit
              label="CONFERMA VALUTAZIONE"
              name="CONFERMA VALUTAZIONE"
              fontSize="f6"
              color="primary"
              onClick={callConfermaRec}
              margin="0 2em 0 0"
              padding="0.4em 2.5em"
            />
            <Button
              autowidth
              submit
              label="RICHIEDI VALUTAZIONE"
              name="RICHIEDI VALUTAZIONE"
              fontSize="f6"
              color="primary"
              onClick={callUpdateRec}
              margin="0 2em 0 0"
              padding="0.4em 2.5em"
            />
          </>
      )
                    : null }
        {isCittadino ? (
          <Button
            autowidth
            submit
            label="ESCI"
            name="ESCI"
            fontSize="f6"
            color="primary"
            onClick={setRedirect}
            margin="0 2em 0 0"
            padding="0.4em 2.5em"
          />
      )
                    : null}
      </Column>
    </Row>
  </>
    );


ButtonsRilasciato.displayName = 'ButtonsRilasciato';

export default (ButtonsRilasciato);
