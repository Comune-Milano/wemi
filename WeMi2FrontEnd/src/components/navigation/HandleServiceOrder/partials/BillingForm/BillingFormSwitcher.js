
import React, { memo, useEffect } from 'react';
import { Row, Column } from 'components/ui/Grid';
import Button from 'components/ui2/Button';
import Checkbox from 'components/ui2/Checkbox';
import connectContext from 'hoc/connectContext';
import { useFormField } from 'libs/Form/hooks/useFormField';
import { useFormContext } from 'libs/Form/hooks/useFormContext';
import CompanyBillingForm from './forms/CompanyBillingForm';
import CitizenBillingForm from './forms/CitizenBillingForm';
import { ServiceOrderContext, entityType as orderEntityTypes } from '../../context/ServiceOrderContext';
import OrderSectionHeader from '../Layout/SectionHeader';
import OrderMainLayout from '../Layout/MainLayout';
import NavigateToSummaryButtom from '../Buttons/NavigateToSummary';
import BillingFormDataCatalyst from './BillingFormDataCatalyst';

const BillingFormSwitcher = ({
  infoRichiestaEnte,
  latestBillingInfo,
  activeEntityType,
  setEntityType,
}) => {
  // The email-flag form field.
  const {
    value: receiveInvoce,
    setValue: setReceiveInvoce,
  } = useFormField('receiveInvoce');

  const { dataset, resetFormFields } = useFormContext();


 /**
   * Reset voucher values.
   */
  useEffect(
    () => {
      resetFormFields({
        ...dataset,
        selectedVouchers: [],
        totalVoucherImport: 0,
        numberSelectedVouchers: 0,
        vouchers: [],
        otherPaymentMethodSelected: false,
      });
    },
    []
  );

  /** INNER COMPONENTS */

  // The billing form content.
  const billingForm = (
    <>
      <OrderSectionHeader
        title="Dati di fatturazione"
        description="Compila inserendo i tuoi dati personali"
      />
      <Row padding="2em 0">
        <Column xs="6" md="4" lg="3" padding="0 0.5em 0 0">
          <Button
            type="button"
            label="cittadino / a"
            name="cittadino"
            fontSize="f7"
            isActive={activeEntityType === orderEntityTypes.CITIZEN}
            onClick={() => setEntityType(orderEntityTypes.CITIZEN)}
          />
        </Column>
        <Column xs="6" md="4" lg="3" padding="0 0 0 0.5em">
          <Button
            type="button"
            label="ente / società"
            name="ente"
            fontSize="f7"
            isActive={activeEntityType === orderEntityTypes.COMPANY}
            onClick={() => setEntityType(orderEntityTypes.COMPANY)}
          />
        </Column>
      </Row>
      {
        (
          !latestBillingInfo ||
          (
            latestBillingInfo.flSocieta === 'N' &&
            activeEntityType === orderEntityTypes.COMPANY
          ) ||
          (
            latestBillingInfo.flSocieta === 'S' &&
            activeEntityType === orderEntityTypes.CITIZEN
          )
        ) ?
        null :
        (
          <Row padding="0 0 2em 0">
            <Column xs="12" padding="0">
              <BillingFormDataCatalyst
                latestBillingInfo={latestBillingInfo}
              />
            </Column>
          </Row>
        )
      }
      {
        // eslint-disable-next-line no-nested-ternary
        activeEntityType === orderEntityTypes.COMPANY ?
          <CompanyBillingForm /> :
          activeEntityType === orderEntityTypes.CITIZEN ?
            <CitizenBillingForm /> :
            null
      }
    </>
  );

  // Email flag.
  const emailCheckbox = (
    <Checkbox
      value={receiveInvoce}
      onChange={flag => setReceiveInvoce(flag)}
      checkcolor="primary"
      label="Ricevi la fattura tramite email"
      fontSize="f6"
      width="auto"
    />
  );

  /** end of INNER COMPONENTS */
  return (
    <>
      <OrderMainLayout
        leftContent={billingForm}
        infoRichiestaEnte={infoRichiestaEnte}
        buttonsUpperContent={emailCheckbox}
        dataset={dataset}
        confirmationButton={<NavigateToSummaryButtom infoRichiestaEnte={infoRichiestaEnte} />}
      />
    </>
  );
};

/**
 * Maps the order form data context to the component internal props.
 * @param {*} context
 */
const mapContextToProps = context => ({
  activeEntityType: context.orderState.entityType,
  setEntityType: context.setEntityType,
});

BillingFormSwitcher.displayName = 'BillingFormSwitcher';

export default connectContext(
  ServiceOrderContext,
  mapContextToProps
)(
  memo(BillingFormSwitcher)
);
