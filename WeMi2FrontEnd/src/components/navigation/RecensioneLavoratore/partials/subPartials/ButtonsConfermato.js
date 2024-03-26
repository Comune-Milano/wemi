/** @format */

import React from 'react';
import { Row, Column } from 'components/ui/Grid';
import Button from 'components/ui2/Button';

const ButtonsConfermato = ({
    setRedirect,
}) => (
  <>
    <Row fluid margin="3em 0 2em">
      <Column xs="12" flex justifycontent="center" padding="0">
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
      </Column>
    </Row>
  </>
    );


ButtonsConfermato.displayName = 'ButtonsConfermato';

export default (ButtonsConfermato);
