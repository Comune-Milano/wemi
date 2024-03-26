import React from 'react';
import moment from 'moment';
import { Row, Column } from 'components/ui/Grid';
import DatePicker from 'components/ui2/DatePicker';
import Input from 'components/ui2/Input';
import Button from 'components/ui2/Button';
import { useFormContext } from 'libs/Form/hooks/useFormContext';


const ModalBodyMerchantComponent = ({
  disabled,
  onSave,
}) => {
  const {
    dataset,
    handleFieldBlur,
    setFormField,
    touched,
    errors,
    isFormValid,
  } = useFormContext();

  return (
    <>
      <Row justifycontent="space-between" fluid flex>
        <Column xs="12" sm="6" padding="0.5em">
          <DatePicker
            required
            disabled={disabled}
            selectedDate={dataset.startDate ? moment(dataset.startDate).toDate() : null}
            label="Data inizio validità"
            error={touched.startDate && (errors.startDate)}
            onChange={value => {
              setFormField('startDate', value);
            }}
            onBlur={() => handleFieldBlur('startDate')}
          />
        </Column>
        <Column xs="12" sm="6" margin="0" padding="0.5em">
          <DatePicker
            selectedDate={dataset.endDate ? moment(dataset.endDate).toDate() : null}
            label="Data fine validità"
            disabled={disabled}
            error={touched.endDate && errors.endDate}
            onChange={value => {
              setFormField('endDate', value);
            }}
            onBlur={() => handleFieldBlur('endDate')}
          />
        </Column>
      </Row>
      <Row fluid margin="0.5 em 0 0.5em 0">
        <Column xs="12" padding="0.5em">
          <Input
            required
            disabled={disabled}
            label="Merchant ID"
            inputValue={dataset.id}
            error={touched.id && errors.id}
            onChange={value => setFormField('id', value)}
            onBlur={() => handleFieldBlur('id')}
          />
        </Column>
      </Row>
      <Row fluid margin="0.5 em 0 0.5em 0">
        <Column xs="12" padding="0.5em">
          <Input
            required
            disabled={disabled}
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
            disabled={disabled}
            label="Private Key"
            inputValue={dataset.privateKey}
            error={touched.privateKey && errors.privateKey}
            onChange={value => setFormField('privateKey', value)}
            onBlur={() => handleFieldBlur('privateKey')}
          />
        </Column>
      </Row>
      {
        disabled ?
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
                  onSave(dataset);
                }}
              />
            </Row>
          )
      }
    </>
  );
};

ModalBodyMerchantComponent.displayName = 'Body modale merchant';

export const MerchantModalBody = ModalBodyMerchantComponent;
