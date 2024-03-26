import React from 'react';
import Input from 'components/ui2/Input';
import { Column, Row } from 'components/ui/Grid';
import { useFormField } from 'libs/Form/hooks/useFormField';

const Link = ({
  name = '',
}) => {
  const { value, setValue, handleBlur, touched, error } = useFormField(name);
  return (
    <Row margin="1rem 0">
      <Column xs="12" padding="0">
        <Input
          material
          placeholder="Inserire link"
          label="Link Associato"
          required
          inputValue={value}
          onChange={setValue}
          error={touched && error ? error : undefined}
          onBlur={handleBlur}
        />
      </Column>
    </Row>
  );
};

Link.displayName = 'Link Content';

export default Link;
