import React, { memo, useEffect } from 'react';
import Checkbox from 'components/ui2/Checkbox';
import { noop } from 'utils/functions/noop';
import { useStatelessGraphQLRequest } from 'hooks/graphQLRequest/useStatelessGraphQLRequest';
import { withPaymentErrorHandler } from 'components/navigation/HandleServiceOrder/hoc/withPaymentErrorHandler';
import withAuthentication from 'hoc/withAuthentication';
import { connect } from 'react-redux';
import connectContext from 'hoc/connectContext';
import { ServiceOrderContext, entityType as orderEntityTypes } from 'components/navigation/HandleServiceOrder/context/ServiceOrderContext';
import { getObjectValue } from 'utils/extensions/objectExtensions';
import OrderConfirmationModal from '../../Modals/OrderConfirmation';
import OrderMainLayout from '../../Layout/MainLayout';
import BillingSummary from '../BillingSummary/BillingSummary';
import ServiceRequestSummary from '../RequestSummary/RequestSummary';
import {
  createPaymentFree as createPaymentFreeMutation,
} from '../../../graphqlRequests/payment/index';
import { ConfirmAndPayButton } from './PaymentButton/ConfirmAndPayButton';

const FreeRequestSummary = ({
  paymentError,
  handlePaymentError,
  infoRichiestaEnte,
  locale,
  entityType,
  successModalVisible,
  setSuccessModalVisibile,
  internalTransactionIdRef,
  isFormValid,
  dataset,
}) => {
  // The remote call to perform the insert to the backend
  const createPayment = useStatelessGraphQLRequest(
    createPaymentFreeMutation,
    {},
    undefined,
    undefined,
    false,
    true,
  );

  /**
   * Reacts to any failed transaction by:
   * - updating the internal transaction id
   * - clearing the selected payment method.
   */
  useEffect(
    () => {
      const graphQLErrors = getObjectValue(paymentError, 'error.graphQLErrors', []);

      const internalTransactionId = graphQLErrors.reduce((accumulator, graphQLError) => {
        const transactionId = getObjectValue(graphQLError, 'data.internalTransactionId');
        return transactionId || accumulator;
      }, undefined);

      if (internalTransactionId) {
        internalTransactionIdRef.current = internalTransactionId;
      }
    },
    [paymentError]
  );

  /**
   * Processes the payment.
   */
  const processPayment = async () => {
    try {
      /**
       * the graphQLRequest to change the state of the request of service
       */
      const { internalTransactionId } = await createPayment({
        identificationBoundary: {
          idRichiestaEnte: infoRichiestaEnte.idRichiestaServizioEnte,
          idInternoTransazionePagamento: internalTransactionIdRef.current,
        },
        billing: { name: dataset.name,
          surname: dataset.surname,
          address: dataset.address,
          postalCode: dataset.postalCode,
          province: dataset.province,
          region: dataset.region,
          phoneNumber: dataset.phoneNumber,
          notes: dataset.notes,
          fiscalCode: dataset.fiscalCode,
          businessName: dataset.businessName,
          vatNumber: dataset.vatNumber,
          receiveInvoce: dataset.receiveInvoce,
          isCitizen: entityType === orderEntityTypes.CITIZEN },
      });
      internalTransactionIdRef.current = internalTransactionId;
      setSuccessModalVisibile(true);
    } catch (error) {
      handlePaymentError(error);
    }
  };

  /** INNER COMPONENTS */

  // The order summary data.
  const summaryInfo = (
    <>
      {/** ORDER CONFIRMATION MODAL */}
      <OrderConfirmationModal
        open={successModalVisible}
        setOpenModal={setSuccessModalVisibile}
        infoRichiestaEnte={infoRichiestaEnte}
        transactionIdentifier={internalTransactionIdRef.current}
      />
      {/** end of ORDER CONFIRMATION MODAL */}
      {/** BILLING SUMMARY */}
      <BillingSummary
        billingInfo={dataset}
        entityType={entityType}
      />
      {/** end of BILLING SUMMARY */}
      {/** REQUEST SUMMARY */}
      <ServiceRequestSummary
        infoRichiestaEnte={infoRichiestaEnte}
        locale={locale}
      />
      {/** end of REQUEST SUMMARY */}
    </>
  );

  // Email flag.
  const emailCheckbox = (
    <Checkbox
      value={dataset.receiveInvoce}
      checkcolor="primary"
      label="Ricevi la fattura tramite email"
      fontSize="f6"
      onChange={noop}
      disabled
    />
  );

  /** end of INNER COMPONENTS */
  return (
    <OrderMainLayout
      leftContent={summaryInfo}
      infoRichiestaEnte={infoRichiestaEnte}
      buttonsUpperContent={emailCheckbox}
      dataset={dataset}
      confirmationButton={(
        <ConfirmAndPayButton
          isFormValid={isFormValid}
          processPayment={processPayment}
        />
      )}
    />
  );
};

FreeRequestSummary.displayName = 'FreeRequestSummary';

const mapStoreToProps = store => ({
  locale: store.locale,
});

const mapContextToProps = context => ({
  entityType: context.orderState.entityType,
});

export default connectContext(
  ServiceOrderContext,
  mapContextToProps
)(
  connect(
    mapStoreToProps,
  )(
    withPaymentErrorHandler(
      withAuthentication(
        memo(FreeRequestSummary)
      )
    )
  )
);
