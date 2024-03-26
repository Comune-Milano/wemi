import React from 'react';
import Button from 'components/ui2/Button';

// Confirm and pay button.
export const ConfirmAndPayButton = ({ isFormValid, processPayment }) => (
  <Button
    type="button"
    label="Conferma"
    name="conferma"
    color="green"
    hoverColor="green"
    fontSize="f6"
    disabled={!isFormValid}
    onClick={processPayment}
  />
);