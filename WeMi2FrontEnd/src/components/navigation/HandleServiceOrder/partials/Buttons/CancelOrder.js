
import React, { memo } from 'react';
import Button from 'components/ui2/Button';
import { generatePath, withRouter } from 'react-router-dom';
import { PAGE_REQUESTSINDEX_URL } from 'types/url';

/**
 * Cancels the order.
 */
const CancelOrderButton = ({
  history,
}) => {
  /**
   * Navigates back to the index of services.
   */
  const goBackToServicesIndex = () => {
    history.push(
      generatePath(PAGE_REQUESTSINDEX_URL)
    );
  };

  return (
    <Button
      label="Annulla"
      name="annulla"
      color="red"
      hoverColor="red"
      fontSize="f6"
      onClick={() => goBackToServicesIndex()}
    />
  );
};

CancelOrderButton.displayName = 'CancelOrderButton';

export default withRouter(
  memo(CancelOrderButton)
);
