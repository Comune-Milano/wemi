import React from 'react';
import Button from 'components/ui2/Button';
import { noop } from 'utils/functions/noop';

export const ValidateButton = ({ disabled, callback = noop }) => (
  <Button
    label="Valida"
    disabled={disabled}
    onClick={callback}
    color="blue"
  />
);
ValidateButton.displayName = 'Button validate institution card';
