import React from 'react';
import Input from 'components/ui2/Input';
import { useFormField } from 'libs/Form/hooks/useFormField';

const Code = ({
  label = 'Codice',
}) => {
  const { value, setValue, handleBlur, touched, error } = useFormField('code');
  return (
    <Input
      material
      placeholder="Inserire codice"
      label={label}
      inputValue={value}
      onChange={(inputValue) => {
        let newValue = null;
        if (inputValue) {
          newValue = inputValue;
        }
        setValue(newValue);
      }}
      error={touched && error ? error : undefined}
      onBlur={handleBlur}
      maxLength="10"
    />
  );
};

Code.displayName = 'Code Content';

export default React.memo(Code);
