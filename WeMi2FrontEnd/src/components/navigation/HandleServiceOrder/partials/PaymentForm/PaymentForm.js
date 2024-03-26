
import React from 'react';
import Button from 'components/ui2/Button';
import Loader from 'components/ui2/Loader';
import { Row, Column } from 'components/ui/Grid';
import useWindowSize from 'hooks/useWindowSize';
import otherPaymentMethodImage from 'images2/gestione-voucher/M2.png';
import Text from 'components/ui/Text';
import { moneyFormat } from 'utils/formatters/moneyFormat';
import OrderSectionHeader from '../Layout/SectionHeader';
// Braintree only supports global styling through a set of custom data attributes.
import './PaymentForm.style.css';
import AccordionVoucherComponent from './AccordionVoucher/AccordionComponent';
import { ChooseAnotherPaymentMethodDiv, Div, ImageContainer, OtherPaymentMethodDiv, OtherPaymentMethodTextContainer } from './AccordionVoucher/styled';

/**
 * The braintree payment button.
 */
const PaymentForm = ({
  confirmMethodButtonDisabled,
  confirmMethodButtonHidden,
  onConfirmPaymentMethod,
  dataset,
  vouchers,
  amount,
  otherPaymentMethodSelected,
  voucherCoverTheAmount,
  allDisabled,
  paymentRequestable,
  isFormValid,
  idRichiesta,
  paymentWithVoucher,
  paymentWithOtherMethod,
  setFormField,
  altraModPagamento,
  qtPersone,
  paymentProvider,
  paymentContainerRef,
}) => {
  const windowSize = useWindowSize();
  const isMobileScreen = ['xs', 'sm'].indexOf(windowSize) > -1;

  const differenceToPay = React.useMemo(() => Number((amount - dataset.totalVoucherImport).toFixed(2)), [dataset]);
  const residualToPay = `Scegli la modalità di pagamento con cui saldare la quota residua di ${moneyFormat(differenceToPay, true)} tra le seguenti opzioni`;

  /**
   * Renders the payment form.
   */
  const renderPaymentMethodConfirmationButton = () => {
    if (paymentProvider.loading) {
      return <Loader margin="0 auto" />;
    }

    if (confirmMethodButtonHidden) {
      return null;
    }

    return (
      <Button
        autowidth={!isMobileScreen}
        name="requestPaymentMethod"
        padding="0.6em 1em"
        margin="1.4em 0 0 0"
        color="green"
        label="Conferma metodo di pagamento"
        disabled={confirmMethodButtonDisabled || allDisabled}
        onClick={onConfirmPaymentMethod}
      />
    );
  };
  renderPaymentMethodConfirmationButton.displayName = '(renderPaymentMethodButton) PaymentForm';

  return (
    <Row padding="0 0 2em 0">
      <Column xs={12} padding="0 0 1em 0">
        <OrderSectionHeader
          title="Metodo di pagamento"
          description="Seleziona come preferisci effettuare il pagamento"
        />
      </Column>
      {vouchers.data?.length ? (
        <Column xs={12} padding="1em 0 0 0">
          <AccordionVoucherComponent
            vouchers={vouchers.data}
            amount={amount}
            qtPersone={qtPersone}
            isFormValid={isFormValid}
            paymentRequestable={paymentRequestable}
            paymentWithVoucher={paymentWithVoucher}
            paymentWithOtherMethod={paymentWithOtherMethod}
            voucherCoverTheAmount={voucherCoverTheAmount}
            allDisabled={allDisabled}
            idRichiesta={idRichiesta}
          />
        </Column>
    )
        : null }
      {dataset.totalVoucherImport > 0 && dataset.totalVoucherImport < amount ? (
        <Column xs={12} padding="28px 0 18px 0" margin="0">
          <Text
            value={residualToPay}
            size="f7"
          />
        </Column>
        ) : null }
      <Column xs={12} padding="1em 0 0 0">
        <Div
          ref={paymentContainerRef}
          style={{ display: paymentProvider.loading ? 'none' : 'initial' }}
        />
        {altraModPagamento && (!paymentProvider.paymentRequestable && !voucherCoverTheAmount) ? (
          <OtherPaymentMethodDiv
            isLoading={paymentProvider.loading}
            isSelected={otherPaymentMethodSelected}
            allDisabled={allDisabled}
            onClick={() => {
              setFormField('otherPaymentMethodSelected', !otherPaymentMethodSelected);
            }}
          >
            <ImageContainer>
              <img src={otherPaymentMethodImage} width="52px" height="35px" alt="otherPaymentMethod" />
            </ImageContainer>
            <div style={{ display: 'block', marginLeft: '20px', width: '100%' }}>
              <OtherPaymentMethodTextContainer>
                {paymentProvider.instance ? "Altra modalità concordata con l'ente " : 'Modalità di pagamento concordata' }
              </OtherPaymentMethodTextContainer>
            </div>
          </OtherPaymentMethodDiv>
      )
        : null }
        {otherPaymentMethodSelected &&
        (!isFormValid || !paymentRequestable) && (!paymentWithVoucher || !voucherCoverTheAmount) && (!paymentWithOtherMethod) ? (
          <ChooseAnotherPaymentMethodDiv
            onClick={() => {
              setFormField('otherPaymentMethodSelected', !otherPaymentMethodSelected);
            }}
            onKeyDown={() => {
              setFormField('otherPaymentMethodSelected', !otherPaymentMethodSelected);
            }}
          >
            Scegli un altro metodo di pagamento
          </ChooseAnotherPaymentMethodDiv>
        ) : null}
        {
          paymentProvider.performingTransaction ?
            (
              <Loader
                overlay
                margin="0 auto"
                label="Stiamo processando il pagamento"
              />
            ) :
            null
        }
        {
          <Row margin="0" padding="0">
            <Column xs="12" margin="0" padding="0" textAlign="right">
              { renderPaymentMethodConfirmationButton() }
            </Column>
          </Row>
        }
      </Column>
    </Row>
  );
};

PaymentForm.displayName = 'PaymentForm';

export default PaymentForm;
