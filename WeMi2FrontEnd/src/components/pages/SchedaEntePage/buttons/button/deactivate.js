import React from 'react';
import Button from 'components/ui2/Button';
import { noop } from 'utils/functions/noop';

export const DeactivateButton = ({ disabled, callback = noop }) => (
  <Button
    label="Disattiva"
    disabled={disabled}
    onClick={callback}
    color="blue"
  />
);
DeactivateButton.displayName = 'Deactivate button institution card';
