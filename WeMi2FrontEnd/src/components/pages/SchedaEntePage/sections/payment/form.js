import React, { Fragment } from 'react';
import { Row, Column } from 'components/ui/Grid';
import Input from 'components/ui2/Input';
import { isEmpty } from '../../constants';

const FormPaymentComponent = ({
  dataset = {},
  touched = {},
  errors = {},
  handleFieldBlur,
  disabled,
  setDataset,
  keySection,
}) =>

   (
     <Fragment>
       <Row fluid>
         <Column xs="12" md="4" padding="0" sizepadding={{ xs: '0 0 2em 0', md: '0 1em 0 0' }}>
           <Input
             tabIndex="0"
             label="IBAN"
             error={touched.iban && errors.iban ?
              errors.iban : ''}
             inputValue={dataset.iban}
             maxLength={27}
             uppercase
             required={isEmpty(dataset.accountHolder) || isEmpty(dataset.bankName) || isEmpty(dataset.branchDescription) || isEmpty(dataset.iban)}
             disabled={disabled}
             onChange={(value) => setDataset('iban', value)}
             onBlur={() => handleFieldBlur(`${keySection}.iban`)}
           />
         </Column>
         <Column xs="12" md="8" padding="0" sizepadding={{ xs: '0 0 2em 0', md: '0 0 0 1em' }}>
           <Input
             tabIndex="0"
             label="Intestatario"
             error={touched.accountHolder && errors.accountHolder ?
              errors.accountHolder : ''}
             inputValue={dataset.accountHolder}
             required={isEmpty(dataset.accountHolder) || isEmpty(dataset.bankName) || isEmpty(dataset.branchDescription) || isEmpty(dataset.iban)}
             disabled={disabled}
             onChange={(value) => setDataset('accountHolder', value)}
             onBlur={() => handleFieldBlur(`${keySection}.accountHolder`)}
           />
         </Column>
       </Row>
       <Row fluid margin="2em 0 0 0">
         <Column xs="12" md="6" padding="0" sizepadding={{ xs: '0 0 2em 0', md: '0 1em 0 0' }}>
           <Input
             tabIndex="0"
             label="Banca"
             error={touched.bankName && errors.bankName ?
            errors.bankName : ''}
             inputValue={dataset.bankName}
             required={isEmpty(dataset.accountHolder) || isEmpty(dataset.bankName) || isEmpty(dataset.branchDescription) || isEmpty(dataset.iban)}
             disabled={disabled}
             onChange={(value) => setDataset('bankName', value)}
             onBlur={() => handleFieldBlur(`${keySection}.bankName`)}
           />
         </Column>
         <Column xs="12" md="6" padding="0" sizepadding={{ xs: '0 0 2em 0', md: '0 0 0 1em' }}>
           <Input
             tabIndex="0"
             label="Filiale"
             error={touched.branchDescription && errors.branchDescription ?
            errors.branchDescription : ''}
             required={isEmpty(dataset.accountHolder) || isEmpty(dataset.bankName) || isEmpty(dataset.branchDescription) || isEmpty(dataset.iban)}
             inputValue={dataset.branchDescription}
             disabled={disabled}
             onChange={(value) => setDataset('branchDescription', value)}
             onBlur={() => handleFieldBlur(`${keySection}.branchDescription`)}
           />
         </Column>
       </Row>
     </Fragment>
  );
FormPaymentComponent.displayName = 'FormPaymentComponent';

export const FormPayment = FormPaymentComponent;
