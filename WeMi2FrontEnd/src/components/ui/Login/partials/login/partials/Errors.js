import React from 'react';
import { Row } from 'components/ui/Grid';
import Text from 'components/ui/Text';

const Errors = ({ errore }) => (
  <>
    {errore?.isErrored ? (
      <Row display="flex" justifycontent="center" padding="1em">
        <Text color="red" value={errore.message || 'Username e/o password errati'} />
      </Row>
    )
    : null}
  </>

);
Errors.displayName = 'Errors component';
export default Errors;
