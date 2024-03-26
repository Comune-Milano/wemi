import React from 'react';
import Input from 'components/ui2/Input';
import { noop } from 'utils/functions/noop';

export const CodeInput = ({
  handleChange = noop,
  inputValue = '',
  label = 'Codice Sezione',
}) => (
  <Input
    material
    placeholder="Cerca"
    id="label"
    label={label}
    inputValue={inputValue}
    onChange={handleChange}
  />
);

CodeInput.displayName = 'Code Input';
