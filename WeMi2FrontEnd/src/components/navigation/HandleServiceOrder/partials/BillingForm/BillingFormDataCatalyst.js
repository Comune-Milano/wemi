
import React, { memo, useState } from 'react';
import { useFormContext } from 'libs/Form/hooks/useFormContext';
import Switch from 'components/ui2/Switch';
import connectContext from 'hoc/connectContext';
import {
  ServiceOrderContext,
  entityType as orderEntityTypes,
} from '../../context/ServiceOrderContext';

/**
 * Allows the billing form to be populated with the billing
 * data used in the latest purhcase.
 */
const BillingFormDataCatalyst = ({
  latestBillingInfo,
  activeEntityType,
}) => {
  // The function to update a set of form fields.
  const { resetFormFields, dataset } = useFormContext();

  // The state of the switch.
  const [switchOn, setSwitchOn] = useState(false);

  /**
   * Handles any change to the switch value.
   * @param {*} value
   */
  const onSwitchChange = value => {
    // Patches the switch state and fill the form.
    setSwitchOn(value);

    if (!value) {
      // resetta tutti i campi
      resetFormFields({
        receiveInvoce: dataset.receiveInvoce,
        selectedVouchers: dataset.selectedVouchers,
        totalVoucherImport: dataset.totalVoucherImport,
        numberSelectedVouchers: dataset.numberSelectedVouchers,
        vouchers: dataset.vouchers,
        otherPaymentMethodSelected: dataset.otherPaymentMethodSelected,
      });
      return;
    }

    const {
      txCAP: postalCode,
      txCF: fiscalCode,
      txCognome: surname,
      txComune: region,
      txIndirizzo: address,
      txNome: name,
      txPiva: vatNumber,
      txProvincia: province,
      txRagSoc: businessName,
      txTel: phoneNumber,
      txTelMobile: mobilePhoneNumber,
    } = latestBillingInfo;

    // valorizza i campi con i dati fatturazione
    resetFormFields({
      name,
      surname,
      address,
      postalCode,
      province,
      region,
      phoneNumber,
      mobilePhoneNumber,
      receiveInvoce: dataset.receiveInvoce,
      selectedVouchers: dataset.selectedVouchers,
      totalVoucherImport: dataset.totalVoucherImport,
      numberSelectedVouchers: dataset.numberSelectedVouchers,
      otherPaymentMethodSelected: dataset.otherPaymentMethodSelected,
      vouchers: dataset.vouchers,
      ...(activeEntityType === orderEntityTypes.CITIZEN && { fiscalCode }),
      ...(activeEntityType === orderEntityTypes.COMPANY && { vatNumber, businessName }),
    });
  };

  return (
    <Switch
      value={switchOn}
      onChange={onSwitchChange}
      fontSize="f7"
      label="Usa i dati di fatturazione associati al precedente acquisto"
      spacing="1em 1.5em 0.5em 0"
      checkcolor="primary"
    />
  );
};

BillingFormDataCatalyst.displayName = 'BillingFormDataCatalyst';

/**
 * Maps the order form data context to the component internal props.
 * @param {*} context
 */
const mapContextToProps = context => ({
  activeEntityType: context.orderState.entityType,
});

export default connectContext(
  ServiceOrderContext,
  mapContextToProps
)(
  memo(BillingFormDataCatalyst)
);
