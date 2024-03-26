import React from 'react';
import Input from 'components/ui2/Input';
import { noop } from 'utils/functions/noop';

export const DescriptionInput = ({
  handleChange = noop,
  inputValue = '',
}) => (
  <Input
    material
    placeholder="Cerca"
    label="Descrizione"
    id="Descrizione"
    inputValue={inputValue}
    onChange={handleChange}
  />
);

DescriptionInput.displayName = 'Description Input';
