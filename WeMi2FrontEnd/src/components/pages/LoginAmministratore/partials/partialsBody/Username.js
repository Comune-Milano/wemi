import React from 'react';
import { Row, Column } from 'components/ui/Grid';
import Input from 'components/ui2/Input';

const Username = ({ getFormData, formData }) => (
  <Row justifycontent="flex-start">
    <Column xs={12}>
      <Input
        material
        label="Username"
        placeholder="Inserisci il tuo username"
        onChange={(value) => getFormData('username', value)}
        inputValue={formData.username}
        required
      />
    </Column>

  </Row>
);

Username.displayName = 'Username element';

export default Username;
