import React from 'react';
import Button from 'components/ui2/Button';
import { noop } from 'utils/functions/noop';

export const SaveButton = ({ disabled, callback = noop }) => (
  <Button
    label="Salva ed esci"
    disabled={disabled}
    onClick={callback}
    color="blue"
  />
);
SaveButton.displayName = 'Save button institution card';
