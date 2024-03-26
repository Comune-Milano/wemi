import React from 'react';
import { Row } from 'components/ui/Grid';
import Text from 'components/ui/Text';


const Errors = ({ loginErrorVisible }) => (
  <>
    {
          loginErrorVisible?.isErrored ?
                (
                  <Row justifycontent="space-around">
                    <Text
                      margin="6px 0 0 0"
                      value={loginErrorVisible.error ? loginErrorVisible.error?.message : 'Username/Password non validi. Riprova.'}
                      color="red"
                      tag="div"
                    />
                  </Row>
                ) : null
        }
  </>
);

Errors.displayName = 'Errors element';

export default Errors;
