import React from 'react';
import { Row, Column } from 'components/ui/Grid';
import Input from 'components/ui2/Input';

const Password = ({ getFormData, formData }) => (
  <Row justifycontent="flex-start">
    <Column xs={12}>
      <Input
        type="Password"
        material
        label="Password"
        placeholder="Inserisci la tua password"
        onChange={(value) => getFormData('password', value)}
        inputValue={formData.password}
        required
      />
    </Column>

  </Row>
);

Password.displayName = 'Password element';

export default Password;
