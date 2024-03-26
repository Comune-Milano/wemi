
import React, { memo, useRef, useState } from 'react';
import { FREE } from 'types/requestType';
import { useFormContext } from 'libs/Form/hooks/useFormContext';
import { Redirect, generatePath } from 'react-router';
import { PAGE_REQUESTSINDEX_URL } from 'types/url';
import { connect } from 'react-redux';
import FreeRequestSummary from './FreeRequestSummary/FreeRequestSummary';
import PaymentProviderSummary from './PaymentRequestSummary/PaymentProviderSummary';
import { requestTypeChecker } from '../../utils/requestTypeChecker';

/**
 * The order summary.
 */
const OrderSummary = ({
  infoRichiestaEnte,
  locale,
}) => {
  /**
   * Shared properties of Payment Summary and Free Summary
   */

  // A flag telling whether the billing data is valid or not.
  const { isFormValid, dataset, setFormField } = useFormContext();
  // Keep track of the last stored internal transaction id, if any.
  const internalTransactionIdRef = useRef(undefined);

  // The state handling the visibility of the modal to
  // be shown when the purchase completes.
  const [successModalVisible, setSuccessModalVisibile] = useState();

  // A boolean that indicates if the request is free of charge or none
  const requestType = requestTypeChecker(infoRichiestaEnte);

  const typeCheck = requestType === FREE;
  /**
   * If typeCheck is true means that the service selected has free cost
   */
  if (!isFormValid) {
    return <Redirect to={generatePath(PAGE_REQUESTSINDEX_URL, { locale })} />;
  }

  if ((dataset.totalVoucherImport > infoRichiestaEnte.costoTotaleEnte) || (dataset.totalVoucherImport < 0)) {
    return <Redirect to={generatePath(PAGE_REQUESTSINDEX_URL, { locale })} />;
  }

  if (typeCheck) {
    return (
      <FreeRequestSummary
        infoRichiestaEnte={infoRichiestaEnte}
        isFormValid={isFormValid}
        dataset={dataset}
        successModalVisible={successModalVisible}
        setSuccessModalVisibile={setSuccessModalVisibile}
        internalTransactionIdRef={internalTransactionIdRef}

      />
    );
  }

  return (
    <PaymentProviderSummary
      infoRichiestaEnte={infoRichiestaEnte}
      isFormValid={isFormValid}
      dataset={dataset}
      setFormField={setFormField}
      successModalVisible={successModalVisible}
      setSuccessModalVisibile={setSuccessModalVisibile}
      internalTransactionIdRef={internalTransactionIdRef}
    />
  );
};

OrderSummary.displayName = 'OrderSummary';

const mapStoreToProps = (store) =>
({
  locale: store.locale,
});

export default connect(mapStoreToProps)(OrderSummary);
