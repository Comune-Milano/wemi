
import React, { memo } from 'react';
import { generatePath, withRouter } from 'react-router-dom';
import Button from 'components/ui2/Button';
import { PAGE_ORDERSUMMARY_URL } from 'types/url';
import { useFormContext } from 'libs/Form/hooks/useFormContext';
import { requestTypeChecker } from '../../utils/requestTypeChecker';
import { FREE } from 'types/requestType';

/**
 * Handles to rendering of the button allowing to Navigates to the
 * order summary step if the user is in the billing page.
 */
const NavigateToSummaryButton = ({
  infoRichiestaEnte,
  history,
  match,
}) => {
  const { isFormValid } = useFormContext();

  /**
   * Moves to the payment step.
   */
  const continueToPayment = () => {
    const { params: { idRichiestaServizio } } = match;

    history.push(generatePath(PAGE_ORDERSUMMARY_URL, {
      idRichiestaServizio,
    }));
  };
  
  const requestType = requestTypeChecker(infoRichiestaEnte);
  const type = requestType === FREE;
  const label = type? "Concludi Richiesta" : "Prosegui con il pagamento";
  const name = type? "concludi-richiesta" :"prosegui-al-pagamento";

  return (
    <Button
      type="button"
      label={label}
      name={name}
      color="green"
      hoverColor="green"
      fontSize="f6"
      disabled={!isFormValid}
      onClick={() => continueToPayment()}
    />
  );
};

NavigateToSummaryButton.displayName = 'NavigateToSummaryButton';

export default withRouter(
  memo(NavigateToSummaryButton)
);
