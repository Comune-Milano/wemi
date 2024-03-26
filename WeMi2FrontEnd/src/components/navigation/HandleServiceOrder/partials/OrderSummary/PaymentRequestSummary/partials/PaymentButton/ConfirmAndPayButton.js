import React from 'react';
import Button from 'components/ui2/Button';

// Confirm and pay button.
export const ConfirmAndPayButton = ({ isFormValid, paymentRequestable, processPayment, voucherCoverTheAmount, paymentWithVoucher, paymentWithOtherMethod }) => (
  <Button
    type="button"
    label="Conferma e paga"
    name="conferma-e-paga"
    color="green"
    hoverColor="green"
    fontSize="f6"
    disabled={
        (!isFormValid || !paymentRequestable) && (!paymentWithVoucher || !voucherCoverTheAmount) && (!paymentWithOtherMethod)
      }
    onClick={processPayment}
  />
  );

ConfirmAndPayButton.displayName = 'ConfirmAndPayButton';
