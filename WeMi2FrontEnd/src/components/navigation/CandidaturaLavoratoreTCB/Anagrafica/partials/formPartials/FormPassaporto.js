/** @format */

import React from 'react';
import Checkbox from 'components/ui2/Checkbox';
import { Row, Column } from 'components/ui/Grid';
import Input from 'components/ui2/Input';
import Text from 'components/ui/Text';
import DatePicker from 'components/ui2/DatePicker';
import { GroupFieldTitle } from 'components/navigation/ConfigurazioneRichiestaTCB/partials';
import RadioGroup from 'components/ui2/RadioGroup';
import { isRequiredErrorType } from 'libs/Form/validation/requiredErrorChecker';

const RadioItems = [
  {
    id: 1,
    label: 'Si (specificare i dati del passaporto)',
  },
  {
    id: 2,
    label: 'No',
  },
];

const FormPassaporto = ({
  dataset,
  setFormField,
  errors,
  touched,
  handleFieldBlur,
}) => {

  return (
    <>
      <Row fluid justifycontent="space-between">
        <GroupFieldTitle
          title="passaporto"
        />
        <Row fluid>
          <RadioGroup
            radioItems={RadioItems}
            onBlur={() => handleFieldBlur('passaporto.checkPassaporto')}
            error={touched['passaporto.checkPassaporto'] && errors['passaporto.checkPassaporto']}
            selectedItem={RadioItems.find(el => el.id === dataset.checkPassaporto)}
            onChange={(value) => {
              setFormField('passaporto', {
                checkPassaporto: value.id,
                numero: dataset.numero,
                dataRilascio: dataset.dataRilascio,
                dataScadenza: dataset.dataScadenza,
                rilasciatoDa: dataset.rilasciatoDa,
              });
            }}
            fontSize="f7"
            checkcolor="primary"
            display="inline-grid"
            style={{ width: 'fit-content' }}
          />
        </Row>
      </Row>

      {dataset.checkPassaporto === 1 ?
        (
          <Row fluid margin="1em 0 0 0">
            <Column xs="12" md="4" padding="0 1em 1em 0">
              <Input
                label="N° passaporto"
                onChange={(value) => {
                  setFormField('passaporto', {
                    checkPassaporto: dataset.checkPassaporto,
                    numero: value,
                    dataRilascio: dataset.dataRilascio,
                    dataScadenza: dataset.dataScadenza,
                    rilasciatoDa: dataset.rilasciatoDa,
                  });
                }}
                onBlur={() => { handleFieldBlur('passaporto.numero'); }}
                inputValue={dataset.numero}
                error={touched['passaporto.numero'] && errors['passaporto.numero']}
                required
              />
            </Column>
            <Column xs="12" md="4" padding="0 1em 1em 0">
              <DatePicker
                required
                label="Data di rilascio"
                onBlur={() => handleFieldBlur('passaporto.dataRilascio')}
                onChange={(day) => {
                  setFormField('passaporto', {
                    checkPassaporto: dataset.checkPassaporto,
                    numero: dataset.numero,
                    dataRilascio: day,
                    dataScadenza: dataset.dataScadenza,
                    rilasciatoDa: dataset.rilasciatoDa,
                  });
                }}
                selectedDate={dataset.dataRilascio}
                error={touched['passaporto.dataRilascio'] && errors['passaporto.dataRilascio']}
              />
            </Column>
            <Column xs="12" md="4" padding="0 1em 1em 0">
              <DatePicker
                required
                label="Data di scadenza"
                onBlur={() => handleFieldBlur('passaporto.dataScadenza')}
                onChange={(day) => {
                  setFormField('passaporto', {
                    checkPassaporto: dataset.checkPassaporto,
                    numero: dataset.numero,
                    dataRilascio: dataset.dataRilascio,
                    dataScadenza: day,
                    rilasciatoDa: dataset.rilasciatoDa,
                  });
                }}
                selectedDate={dataset.dataScadenza}
                error={touched['passaporto.dataScadenza'] && errors['passaporto.dataScadenza']}
              />
            </Column>
            <Column xs="12" md="4" padding="0 1em 1em 0">
              <Input
                label="Rilasciato da"
                onChange={(value) => {
                  setFormField('passaporto', {
                    checkPassaporto: dataset.checkPassaporto,
                    numero: dataset.numero,
                    dataRilascio: dataset.dataRilascio,
                    dataScadenza: dataset.dataScadenza,
                    rilasciatoDa: value,
                  });
                }}
                inputValue={dataset.rilasciatoDa}
                onBlur={() => { handleFieldBlur('passaporto.rilasciatoDa'); }}
                error={touched['passaporto.rilasciatoDa'] && errors['passaporto.rilasciatoDa']}
                required
              />
            </Column>
          </Row>
        )
        : null}
    </>
  );
};

FormPassaporto.displayName = 'FormPassaporto';

export default FormPassaporto;
