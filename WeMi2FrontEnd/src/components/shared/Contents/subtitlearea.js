import React from 'react';
import { Row } from 'components/ui/Grid';
import TextArea from 'components/ui2/TextArea';
import { useFormField } from 'libs/Form/hooks/useFormField';

const Subtitle = () => {
  const { value, setValue, touched, error, handleBlur } = useFormField('subtitle');
  return (
    <Row margin="1rem 0">
      <TextArea
        material
        placeholder="Inserire sottotitolo"
        label="Sottotitolo"
        required
        inputValue={value}
        onChange={setValue}
        error={touched && error ? error : undefined}
        onBlur={handleBlur}
      />
    </Row>
  );
};

Subtitle.displayName = 'Subtitle Content';

export default React.memo(Subtitle);
