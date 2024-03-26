import React from 'react';
import { Row, Column } from 'components/ui/Grid';
import Text from 'components/ui/Text';

const LoginHeader = () => (
  <Row fluid>
    <Column xs={12} padding="1em">
      <Text value="Login Amministratore" size="f3" color="primary" />
    </Column>
  </Row>
);

LoginHeader.displayName = 'LoginHeader';
export default LoginHeader;
