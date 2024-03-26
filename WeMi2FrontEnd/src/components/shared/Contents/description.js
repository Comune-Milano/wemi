import React from 'react';
import { Row } from 'components/ui/Grid';
import TextArea from 'components/ui2/TextArea';
import { useFormField } from 'libs/Form/hooks/useFormField';

const Description = ({ required = true }) => {
  const { value, setValue, touched, error, handleBlur } = useFormField('description');
  return (
    <Row margin="1rem 0">
      <TextArea
        material
        placeholder="Inserire descrizione"
        label="Descrizione"
        required={required}
        inputValue={value}
        onChange={setValue}
        error={touched && error ? error : undefined}
        onBlur={handleBlur}
      />
    </Row>
  );
};

Description.displayName = 'Description Content';

export default React.memo(Description);
