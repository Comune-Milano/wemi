import React from 'react';
import Button from 'components/ui2/Button';
import { noop } from 'utils/functions/noop';

export const CancelButton = ({ disabled, callback = noop }) => (
  <Button
    label="Annulla"
    disabled={disabled}
    onClick={callback}
    color="red"
  />
);
CancelButton.displayName = 'Cancel button institution card';
