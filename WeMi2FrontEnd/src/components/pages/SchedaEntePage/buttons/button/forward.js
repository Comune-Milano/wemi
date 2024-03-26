import React from 'react';
import Button from 'components/ui2/Button';
import { noop } from 'utils/functions/noop';

export const ForwardButton = ({ disabled, callback = noop }) => (
  <Button
    label="Inoltra scheda"
    disabled={disabled}
    onClick={callback}
    color="blue"
  />
);
ForwardButton.displayName = 'Forward button institution card';
