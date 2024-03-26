
import React, { memo } from 'react';
import yup from 'libs/Form/validation/yup';
import { Form } from 'libs/Form/components/Form';
import connectContext from 'hoc/connectContext';
import { ServiceOrderContext, entityType as orderEntityTypes } from '../../context/ServiceOrderContext';

const noNumbersRegex = /^([^0-9]*)$/;
const onlyDigitRegex = /^\d+$/;
const postalCodeRegex = /^\d{5}$/;
const fiscalCodeRegex = /^([A-Za-z]{6}[0-9lmnpqrstuvLMNPQRSTUV]{2}[abcdehlmprstABCDEHLMPRST]{1}[0-9lmnpqrstuvLMNPQRSTUV]{2}[A-Za-z]{1}[0-9lmnpqrstuvLMNPQRSTUV]{3}[A-Za-z]{1})$|([0-9]{11})$/;

/**
 * The billing form provider.
 */
const BillingFormContainer = ({
  activeEntityType,
  children,
}) => {
  /**
   * The dataset properties shared by a citized and a company.
   */
  const commonDataset = {
    name: '',
    surname: '',
    // The address has a different meaning depending on the scope:
    // - For a citizen is the home address.
    // - For a company is the company headquarters.
    address: '',
    postalCode: '',
    province: '',
    region: '',
    phoneNumber: '',
    notes: '',
    receiveInvoce: false,
  };

  /**
   * The initial form dataset for a citizen.
   */
  const citizenInitialFormDataset = {
    ...commonDataset,
    vouchers: [],
    selectedVouchers: [],
    numberSelectedVouchers: 0,
    totalVoucherImport: 0,
    otherPaymentMethodSelected: false,
    fiscalCode: '',
  };

  /**
   * The initial form dataset for a citizen.
   */
  const companyInitialFormDataset = {
    ...commonDataset,
    businessName: '',
    vatNumber: '',
  };

  /**
   * The validation schema slice shared by a citizen and a company.
   */

  const commonFormValidationSchema = yup.object().shape({
    address: yup
      .string()
      .typeError('Indirizzo non valido.')
      .required(),
    phoneNumber: yup
      .string()
      .typeError('Inserisci le cifre del tuo numero telefonico senza interruzioni e senza altri caratteri (es. 0123456789)')
      .required()
      .matches(onlyDigitRegex, 'Inserisci le cifre del tuo numero telefonico senza interruzioni e senza altri caratteri (es. 0123456789)'),
    postalCode: yup
      .string()
      .typeError('Cap non valido.')
      .required()
      .matches(postalCodeRegex, 'Cap non valido.'),
    province: yup
      .string()
      .typeError('Provincia non valida.')
      .required()
      .test('province', 'Minimo due caratteri', val => val.length >= 2),
    region: yup
      .string()
      .typeError('Comune non valido.')
      .required()
      .matches(noNumbersRegex, 'Comune non valido.'),
  });

  /**
   * The initial form dataset for a citizen.
   */
  const citizenFormValidationSchema = commonFormValidationSchema.concat(
    yup.object().shape({
      fiscalCode: yup
        .string()
        .typeError('Codice fiscale non valido.')
        .required()
        .matches(fiscalCodeRegex, 'Codice fiscale non valido.'),
      name: yup
        .string()
        .typeError('Nome non valido.')
        .required()
        .matches(noNumbersRegex, 'Nome non valido.'),
      numberSelectedVouchers: yup.number(),
      otherPaymentMethodSelected: yup.boolean(),
      selectedVouchers: yup.array().of(
        yup.object().shape({
          cfAssegnatario: yup.string(),
          code: yup.string(),
          endValidity: yup.date().nullable(),
          id: yup.number(),
          lastUseTimeStamp: yup.date().nullable(),
          isActive: yup.boolean(),
          maxShare: yup.number().min(0),
          remainingImport: yup.number(),
          voucherShare: yup.number().min(0)
          .when(['maxShare', 'isActive'], (maxShare, isActive, schema) => (
            isActive ?
            schema.max(maxShare, 'Inserire un importo minore') :
            schema.max(90000)
          )),
        })
      ),
      surname: yup
        .string()
        .typeError('Cognome non valido.')
        .required()
        .matches(noNumbersRegex, 'Cognome non valido.'),
      totalVoucherImport: yup.number().min(0),
      vouchers: yup.array().of(
          yup.object().shape({
            cfAssegnatario: yup.string(),
            code: yup.string(),
            endValidity: yup.date().nullable(),
            id: yup.number(),
            isActive: yup.boolean(),
            lastUseTimeStamp: yup.date().nullable(),
            maxShare: yup.number().min(0),
            remainingImport: yup.number(),
            voucherShare: yup.number().min(0),
          })
        ),
    })
  );

  /**
   * The initial form dataset for a citizen. /^[0-9]{11}$/
   */
  const companyFormValidationSchema = commonFormValidationSchema.concat(
    yup.object().shape({
      businessName: yup
        .string()
        .typeError('Ragione sociale non valida.')
        .required(),
      vatNumber: yup
        .string()
        .typeError('Partita Iva non valida.')
        .required()
        .matches(/^[0-9]{11}$/, 'Partita Iva non valida.'),
      name: yup
        .string()
        .typeError('Nome non valido.')
        .matches(noNumbersRegex, 'Nome non valido.'),
      surname: yup
        .string()
        .typeError('Cognome non valido.')
        .matches(noNumbersRegex, 'Cognome non valido.'),

    })
  );

  // Renders the form provider for a citizen.
  if (activeEntityType === orderEntityTypes.CITIZEN) {
    return (
      <Form
        key="billingForm"
        validateOnChange
        initialDataset={citizenInitialFormDataset}
        validationSchema={citizenFormValidationSchema}
      >
        { children }
      </Form>
    );
  }

  // Renders the form provider for a company.
  if (activeEntityType === orderEntityTypes.COMPANY) {
    return (
      <Form
        key="companyForm"
        validateOnChange
        initialDataset={companyInitialFormDataset}
        validationSchema={companyFormValidationSchema}
      >
        { children }
      </Form>
    );
  }

  return null;
};

BillingFormContainer.displayName = 'BillingFormContainer';

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
  memo(BillingFormContainer)
);
