
import React, { memo } from 'react';
import Button from 'components/ui2/Button';
import { generatePath, withRouter } from 'react-router-dom';
import { PAGE_ORDERBILLING_URL } from 'types/url';

/**
 * The button to navigate to the billing step.
 */
const NavigateToBilling = ({
  history,
  match,
}) => {
  /**
   * Moves to the payment step.
   */
  const navigateToBilling = () => {
    const { params: { idRichiestaServizio } } = match;

    history.push(generatePath(PAGE_ORDERBILLING_URL, {
      idRichiestaServizio,
    }));
  };

  return (
    <>
      <Button
        type="button"
        label="Indietro"
        name="ritorna-al-billing"
        color="green"
        hoverColor="green"
        fontSize="f6"
        onClick={() => navigateToBilling()}
      />
    </>
  );
};

NavigateToBilling.displayName = 'NavigateToBilling';

export default withRouter(
  memo(NavigateToBilling)
);
