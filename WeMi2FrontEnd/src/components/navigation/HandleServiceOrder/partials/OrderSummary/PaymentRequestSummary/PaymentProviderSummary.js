
import React, { memo, useRef, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Checkbox from 'components/ui2/Checkbox';
import connectContext from 'hoc/connectContext';
import { useStatelessGraphQLRequest } from 'hooks/graphQLRequest/useStatelessGraphQLRequest';
import { useBraintreePaymentProvider } from 'libs/BraintreePayment/hooks/useBraintreePaymentProvider';
import { getObjectValue } from 'utils/extensions/objectExtensions';
import { useGraphQLRequest } from 'hooks/graphQLRequest/useGraphQLRequest';
import withAuthentication from 'hoc/withAuthentication';
import { useUserProfile } from 'hooks/useUserProfile';
import { Column, Row } from 'components/ui/Grid';
import useWindowSize from 'hooks/useWindowSize';
import { getValidDataMerchant, getUsableVoucherListByUser } from 'components/navigation/HandleServiceOrder/graphqlRequests/graphQLRequests';
import OrderConfirmationModal from '../../Modals/OrderConfirmation';
import {
  ServiceOrderContext,
} from '../../../context/ServiceOrderContext';
import OrderMainLayout from '../../Layout/MainLayout';
import PaymentForm from '../../PaymentForm/PaymentForm';
import { withPaymentErrorHandler } from '../../../hoc/withPaymentErrorHandler';
import BillingSummary from '../BillingSummary/BillingSummary';
import ServiceRequestSummary from '../RequestSummary/RequestSummary';
import {
  getToken as getTokenQuery,
  createPaymentTransaction as createPaymentTransactionMutation,
  createVoucherTransaction as createVoucherTransactionMutation,
  createOtherPaymentMethodTransaction as createOtherPaymentMethodTransactionMutation,
} from '../../../graphqlRequests/payment/index';
import { ConfirmAndPayButton } from './partials';
import CancelOrder from '../../Buttons/CancelOrder';
import AmountNotCoveredByVoucherModal from '../../Modals/AmountNotCoveredByVoucherModal';
import { inputProcessPayment, inputVoucherOrOtherMethodPayment } from './utilities';
/**
 * The order summary.
 */
const PaymentProviderSummary = ({
  infoRichiestaEnte,
  entityType,
  locale,
  paymentError,
  handlePaymentError,
  successModalVisible,
  setFormField,
  setSuccessModalVisibile,
  internalTransactionIdRef,
  isFormValid,
  dataset,
}) => {
  const [userProfile] = useUserProfile();
  // A reference to the container wrapping the payment form.
  const paymentContainerRef = useRef();

  const windowSize = useWindowSize();
  const isMobileScreen = ['xs', 'sm', 'md'].indexOf(windowSize) > -1;

  const qtPersone = getObjectValue(infoRichiestaEnte, 'jsonDatiRichiesta.qtPersone', undefined);
  const [openModalVouchers, setModalVouchersVisible] = useState(false);
  const [paymentWithVoucher, setPaymentWithVoucher] = useState(false);
  const [paymentWithOtherMethod, setPaymentWithOtherMethod] = useState(false);

  // The request to get the payment token.
  const getBraintreeToken = useStatelessGraphQLRequest(
    getTokenQuery,
    { idRichiestaEnte: infoRichiestaEnte.idRichiestaServizioEnte },
    undefined,
    false,
    true
  );

  const [vouchers, getVouchers] = useGraphQLRequest(
    undefined,
    getUsableVoucherListByUser,
    { idRichiesta: infoRichiestaEnte.idRichiestaServizioEnte },
    true,
  );

  const [merchantData] = useGraphQLRequest(
    undefined,
    getValidDataMerchant,
    { id_ente: infoRichiestaEnte.idEnte },
    true
  );
  // The remote call to perform the payment transaction.
  const createPaymentTransaction = useStatelessGraphQLRequest(
    createPaymentTransactionMutation,
    {},
    undefined,
    false,
    true,
  );

  const createVoucherTransaction = useStatelessGraphQLRequest(
    createVoucherTransactionMutation,
    {},
    undefined,
    false,
    true
  );

  const createOtherPaymentMethodTransaction = useStatelessGraphQLRequest(
    createOtherPaymentMethodTransactionMutation,
    {},
    undefined,
    false,
    true,
  );

  // The payment provider instance.
  const paymentProvider = useBraintreePaymentProvider(
    paymentContainerRef,
    { amount: `${amountToPay}` },
    getBraintreeToken,
    createPaymentTransaction,
  );

  const isVoucherActive = React.useMemo(() => dataset.selectedVouchers.length, [dataset]);

  const voucherCoverTheAmount = React.useMemo(() => {
    if (dataset.totalVoucherImport === infoRichiestaEnte.costoTotaleEnte) {
      return true;
    }
    return false;
  }, [dataset]);

  const amountToPay = React.useMemo(() => Number((infoRichiestaEnte.costoTotaleEnte - dataset.totalVoucherImport).toFixed(2)), [dataset]);

  const paymentRequestable = React.useMemo(() => isFormValid && paymentProvider.paymentRequestable &&
  !paymentProvider.performingTransaction &&
  paymentProvider.selectedPaymentMethod !== undefined &&
  !paymentProvider.purchaseCompleted, [paymentProvider]);
  /**
   * Calls the payment providers to request a payment method.
   */
  const requestPaymentMethod = () => {
    const { datiLogin } = userProfile;

    const country = 'IT';

    const {
      name,
      surname,
      region,
      address,
      phoneNumber,
      postalCode,
      totalVoucherImport,
      otherPaymentMethodSelected,
    } = dataset;

    if (totalVoucherImport > 0) {
      if (totalVoucherImport === infoRichiestaEnte.costoTotaleEnte) {
        setPaymentWithVoucher(isFormValid);
         // PAGAMENTO CON VOUCHER
      }
      if ((totalVoucherImport < infoRichiestaEnte.costoTotaleEnte) &&
       (!paymentProvider.paymentRequestable && !otherPaymentMethodSelected)) {
        setPaymentWithVoucher(false);
        setModalVouchersVisible(true);
         // VOUCHER NON COPRONO TUTTO IL COSTO
      }
      if ((totalVoucherImport < infoRichiestaEnte.costoTotaleEnte) &&
       (paymentProvider.paymentRequestable)) {
        setFormField('otherPaymentMethodSelected', false);
        paymentProvider.requestPaymentMethod({
          amount: `${amountToPay}`,
          email: datiLogin?.email,
          billingAddress: {
            givenName: name,
            surname,
            phoneNumber,
            streetAddress: address,
            locality: region,
            region: country,
            postalCode,
            countryCodeAlpha2: country,
          },
        })
    .catch(error => handlePaymentError(error));
        setPaymentWithVoucher(isFormValid);
         // PAGAMENTO CON VOUCHER E CARTA DI CREDITO/PAYPAL
      }
      if ((totalVoucherImport < infoRichiestaEnte.costoTotaleEnte) &&
      (otherPaymentMethodSelected && !paymentProvider.paymentRequestable)) {
        setPaymentWithVoucher(isFormValid);
        setPaymentWithOtherMethod(true);
        // PAGAMENTO CON VOUCHER E ALTRA MODALITA'
      }
    } else if (otherPaymentMethodSelected) {
      setPaymentWithOtherMethod(true);
      setPaymentWithVoucher(false);
      // PAGAMENTO CON ALTRA MODALITA'
    } else if (paymentProvider.paymentRequestable) {
      setFormField('otherPaymentMethodSelected', false);
      setPaymentWithVoucher(false);
      setPaymentWithOtherMethod(false);
      paymentProvider.requestPaymentMethod({
        amount: `${amountToPay}`,
        email: datiLogin?.email,
        billingAddress: {
          givenName: name,
          surname,
          phoneNumber,
          streetAddress: address,
          locality: region,
          region: country,
          postalCode,
          countryCodeAlpha2: country,
        },
      })
  .catch(error => handlePaymentError(error));
      // PAGAMENTO CON CARTA DI CREDITO O PAYPAL
    }
  };

  useEffect(() => {
    if (paymentProvider.selectedPaymentMethod) {
      const togglePayment = document.getElementsByClassName('braintree-toggle');
      togglePayment[0].style.display = 'none';
    }
  }, [paymentProvider]);

  /**
   * Processes the payment.
   */
  const processPayment = async () => {
    if (paymentWithVoucher && paymentProvider.selectedPaymentMethod) {
      try {
        const { nonce, type, deviceData } = paymentProvider.selectedPaymentMethod;

        // Processes the payment.
        const { internalTransactionId } = await paymentProvider.processPayment(
          inputProcessPayment(dataset,
            amountToPay,
            nonce,
            type,
            deviceData,
            internalTransactionIdRef,
            infoRichiestaEnte,
            entityType,
            paymentWithVoucher)
        );
        internalTransactionIdRef.current = internalTransactionId;
        setSuccessModalVisibile(true);
      } catch (error) {
        handlePaymentError(error);
      }
    } else if (!paymentWithVoucher && paymentProvider.selectedPaymentMethod) {
      try {
        const { nonce, type, deviceData } = paymentProvider.selectedPaymentMethod;

        // Processes the payment.
        const { internalTransactionId } = await paymentProvider.processPayment(
          inputProcessPayment(dataset,
            amountToPay,
            nonce,
            type,
            deviceData,
            internalTransactionIdRef,
            infoRichiestaEnte,
            entityType)
        );
        internalTransactionIdRef.current = internalTransactionId;
        setSuccessModalVisibile(true);
      } catch (error) {
        handlePaymentError(error);
      }
    } else if (paymentWithVoucher && voucherCoverTheAmount) {
      try {
        const { internalTransactionId } = await createVoucherTransaction(inputVoucherOrOtherMethodPayment(
          dataset,
          internalTransactionIdRef,
          infoRichiestaEnte,
          entityType,
          paymentWithVoucher
          ));
        internalTransactionIdRef.current = internalTransactionId;
        setSuccessModalVisibile(true);
      } catch (error) {
        handlePaymentError(error);
      }
    } else if (paymentWithOtherMethod && dataset.otherPaymentMethodSelected) {
      try {
        const { internalTransactionId } = await createOtherPaymentMethodTransaction(inputVoucherOrOtherMethodPayment(
          dataset,
          internalTransactionIdRef,
          infoRichiestaEnte,
          entityType,
          paymentWithVoucher
          ));
        internalTransactionIdRef.current = internalTransactionId;
        setSuccessModalVisibile(true);
      } catch (error) {
        handlePaymentError(error);
      }
    }
  };

  const allDisabled = !((!isFormValid || !(isFormValid && paymentProvider.paymentRequestable &&
    !paymentProvider.performingTransaction &&
    paymentProvider.selectedPaymentMethod !== undefined &&
    !paymentProvider.purchaseCompleted)) && (!paymentWithVoucher || !voucherCoverTheAmount) && (!paymentWithOtherMethod));

  const isPurchasedByCardOrPaypal = React.useMemo(() => {
    if (merchantData.data && merchantData.data?.merchantId) {
      return true;
    } return false;
  }, [merchantData]);

/**
   * Triggers the initialization of the payment provider.
   */
  useEffect(
  () => {
    if (!dataset.otherPaymentMethodSelected &&
        !voucherCoverTheAmount &&
        !paymentProvider.loaded &&
        !paymentProvider.loading &&
        isPurchasedByCardOrPaypal) {
      paymentProvider.initialize().catch(error => handlePaymentError(error));
    } else if (paymentProvider.loaded && (voucherCoverTheAmount || dataset.otherPaymentMethodSelected)) {
      paymentProvider.destroyDropin();
    }
  },
  [dataset.otherPaymentMethodSelected, voucherCoverTheAmount, paymentProvider]
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
      paymentProvider.clearSelectedPaymentMethod();
    }
  },
  [paymentError]
);


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
      {/** AMOUNT NOT COVERED BY VOUCHER MODAL */}
      <AmountNotCoveredByVoucherModal
        openModalVouchers={openModalVouchers}
        setModalVouchersVisible={setModalVouchersVisible}
      />
      {/** end of AMOUNT NOT COVERED BY VOUCHER MODAL */}
      {/** PAYMENT FORM */}
      <PaymentForm
        confirmMethodButtonDisabled={((
          !isFormValid ||
          !paymentProvider.paymentRequestable ||
          paymentProvider.performingTransaction ||
          paymentProvider.purchaseCompleted) &&
          (!isVoucherActive && !dataset.otherPaymentMethodSelected)) || (paymentProvider.paymentRequestable && dataset.otherPaymentMethodSelected)
        }
        confirmMethodButtonHidden={paymentProvider.selectedPaymentMethod}
        onConfirmPaymentMethod={requestPaymentMethod}
        paymentProvider={paymentProvider}
        setFormField={setFormField}
        isFormValid={isFormValid}
        voucherCoverTheAmount={voucherCoverTheAmount}
        otherPaymentMethodSelected={dataset.otherPaymentMethodSelected}
        idRichiesta={infoRichiestaEnte.idRichiestaServizioEnte}
        altraModPagamento={getObjectValue(infoRichiestaEnte, 'altraModalitaPagamento', null)}
        qtPersone={qtPersone}
        paymentRequestable={paymentRequestable}
        allDisabled={allDisabled}
        dataset={dataset}
        paymentWithVoucher={paymentWithVoucher}
        paymentWithOtherMethod={paymentWithOtherMethod}
        vouchers={vouchers}
        amount={infoRichiestaEnte.costoTotaleEnte}
        paymentContainerRef={paymentContainerRef}
      />
      {
        isMobileScreen ? (
          <Row margin="0 0 3em 0">
            <Column padding="0" margin="0 0 1em 0" xs="12" md="6" textAlign="right">
              <ConfirmAndPayButton
                isFormValid={isFormValid}
                voucherCoverTheAmount={voucherCoverTheAmount}
                paymentRequestable={paymentRequestable}
                processPayment={processPayment}
                paymentWithVoucher={paymentWithVoucher}
                paymentWithOtherMethod={paymentWithOtherMethod && dataset.otherPaymentMethodSelected}
              />
            </Column>
            <Column padding="0" margin="0" md="6" />
            <Column padding="0" xs="12" md="6" textAlign="right">
              <CancelOrder />
            </Column>
            <Column padding="0" margin="0" md="6" />
          </Row>
        ) : null
      }
      {/** end of PAYMENT FORM */}
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
      onChange={(value) => { setFormField('receiveInvoce', value); }}
      disabled={dataset.totalVoucherImport > 0 || (!dataset.otherPaymentMethodSelected && !paymentProvider.selectedPaymentMethod)}
    />
  );


  /** end of INNER COMPONENTS */
  return (
    <OrderMainLayout
      leftContent={summaryInfo}
      infoRichiestaEnte={infoRichiestaEnte}
      buttonsUpperContent={emailCheckbox}
      creditCardOrPaypalSelected={paymentProvider.selectedPaymentMethod}
      otherPaymentSelected={paymentWithOtherMethod && dataset.otherPaymentMethodSelected}
      dataset={dataset}
      confirmationButton={(
        <ConfirmAndPayButton
          isFormValid={isFormValid}
          processPayment={processPayment}
          paymentRequestable={paymentRequestable}
          paymentWithVoucher={paymentWithVoucher}
          voucherCoverTheAmount={voucherCoverTheAmount}
          paymentWithOtherMethod={paymentWithOtherMethod && dataset.otherPaymentMethodSelected}
        />
      )}
    />

  );
};

PaymentProviderSummary.displayName = 'PaymentProviderSummary';

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
        memo(PaymentProviderSummary)
      )
    )
  )
);
