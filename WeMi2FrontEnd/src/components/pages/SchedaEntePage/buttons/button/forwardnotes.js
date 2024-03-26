import React from 'react';
import Button from 'components/ui2/Button';
import { noop } from 'utils/functions/noop';

export const ForwardNotesButton = ({ disabled, callback = noop }) => (
  <Button
    label="Inoltra note ad ente"
    disabled={disabled}
    onClick={callback}
    color="blue"
  />
);

ForwardNotesButton.displayName = 'Forward notes button institution card';
