import React from 'react';
import yup from 'libs/Form/validation/yup';
import moment from 'moment';
import { Row, Column } from 'components/ui/Grid';
import DatePicker from 'components/ui2/DatePicker';
import Input from 'components/ui2/Input';
import Button from 'components/ui2/Button';
import Checkbox from 'components/ui2/Checkbox';
import { Form } from 'libs/Form/components/Form';

const formValidationSchema = yup.object().shape({
  dataInizio: yup
    .date()
    .required()
    .when('dataFine', (dataFine, schema, dataInizio) => {
      if (dataFine && moment(dataInizio.value).isSameOrAfter(moment(dataFine), 'days')) {
        return schema.test(
          'checkDate',
          null,
          obj => (new yup.ValidationError(
            'La data di inizio deve essere precedente a quella di fine',
            null,
            'prevDataInizio',
          )),
        );
      }
      return schema;
    })
    .typeError('Il campo deve essere una data'),
  dataFine: yup
    .date()
    .min(moment().startOf('day').toDate(), 'La data non può essere precedente alla giornata attuale')
    .typeError('Il campo deve essere una data')
    .nullable(),
  merchantId: yup
    .string()
    .required(),
  publicKey: yup
    .string()
    .required(),
  privateKey: yup
    .string()
    .required(),
});

const defaultFormModel = {
  dataInizio: null,
  dataFine: null,
  merchantId: '',
  publicKey: '',
  privateKey: '',
};
const MerchantModalBody = ({
  data,
  saveCredentials,
  modifyCredentials,
  disableModify,
}) => {
  const openForModification = !!data;
  
  const buttonSaveClick = openForModification ? modifyCredentials : saveCredentials;
  return (
      <Form
        initialDataset={data ? {...data} : {...defaultFormModel}}
        validationSchema={formValidationSchema}
        validateOnChange
      >
        {
          ({
            setFormField,
            resetFormFields,
            dataset,
            errors,
            touched,
            handleFieldBlur,
            isFormValid,
           }) => (
             <>
               <Row justifycontent="space-between" fluid flex>
                 <Column xs="12" sm="6" padding="0.5em">
                   <DatePicker
                     required
                     disabled={disableModify}
                     selectedDate={dataset.dataInizio ? moment(dataset.dataInizio).toDate() : null}
                     label="Data inizio validità"
                     error={touched.dataInizio && (errors.dataInizio || errors.prevDataInizio)}
                     onChange={value => {
                       setFormField('dataInizio', value);
                    }}
                     onBlur={() => handleFieldBlur('dataInizio')}
                   />
                 </Column>
                 <Column xs="12" sm="6" margin="0" padding="0.5em">
                   <DatePicker
                     selectedDate={dataset.dataFine ? moment(dataset.dataFine).toDate() : null}
                     label="Data fine validità"
                     disabled={disableModify}
                     error={touched.dataFine && errors.dataFine}
                     onChange={value => {
                       setFormField('dataFine', value);
                      }}
                      onBlur={() => handleFieldBlur('dataFine')}
                   />
                 </Column>
               </Row>
               <Row fluid margin="0.5 em 0 0.5em 0">
                 <Column xs="12" padding="0.5em">
                   <Input
                     required
                     disabled={disableModify}
                     label="Merchant ID"
                     inputValue={dataset.merchantId}
                     error={touched.merchantId && errors.merchantId}
                     onChange={value => setFormField('merchantId', value)}
                     onBlur={() => handleFieldBlur('merchantId')}
                   />
                 </Column>
               </Row>
               <Row fluid margin="0.5 em 0 0.5em 0">
                 <Column xs="12" padding="0.5em">
                   <Input
                     required
                     disabled={disableModify}
                     label="Public key"
                     inputValue={dataset.publicKey}
                     error={touched.publicKey && errors.publicKey}
                     onChange={value => setFormField('publicKey', value)}
                     onBlur={() => handleFieldBlur('publicKey')}
                   />
                 </Column>
               </Row>
               <Row fluid margin="0.5 em 0 0.5em 0">
                 <Column xs="12" padding="0.5em">
                   <Input
                     required
                     disabled={disableModify}
                     label="Private Key"
                     inputValue={dataset.privateKey}
                     error={touched.privateKey && errors.privateKey}
                     onChange={value => setFormField('privateKey', value)}
                     onBlur={() => handleFieldBlur('privateKey')}
                   />
                 </Column>
               </Row>
               {
                 disableModify ?
                 null
                 :
                 (
                  <Row fluid margin="2em 0 0 0" flex justifycontent="center">
                    <Button
                      padding="0.4em 2em"
                      margin="0 1em"
                      label="OK"
                      color="blue"
                      autowidth
                      disabled={!isFormValid}
                      onClick={() => {
                        buttonSaveClick(dataset);
                      }}
                      />
                  </Row>
                 )
               }
            </>
          )
        }
      </Form>
  );
};

MerchantModalBody.displayName = 'Body modale merchant';

export default MerchantModalBody;
