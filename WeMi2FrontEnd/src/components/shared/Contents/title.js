import React from 'react';
import Input from 'components/ui2/Input';
import { Column, Row } from 'components/ui/Grid';
import { useFormField } from 'libs/Form/hooks/useFormField';

const Title = () => {
  const { value, setValue, handleBlur, touched, error } = useFormField('title');
  return (
    <Row margin="1rem 0" fluid>
      <Column xs="12" padding="0">
        <Input
          material
          placeholder="Inserire titolo"
          label="Titolo"
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

Title.displayName = 'Title Content';

export default React.memo(Title);
