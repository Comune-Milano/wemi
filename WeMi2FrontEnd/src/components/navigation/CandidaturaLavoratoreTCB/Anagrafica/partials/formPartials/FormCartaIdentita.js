/** @format */

import React from 'react';
import { Row, Column } from 'components/ui/Grid';
import Input from 'components/ui2/Input';
import DatePicker from 'components/ui2/DatePicker';
import { GroupFieldTitle } from 'components/navigation/ConfigurazioneRichiestaTCB/partials';
import RadioGroup from 'components/ui2/RadioGroup';
import { isRequiredErrorType } from 'libs/Form/validation/requiredErrorChecker';

const FormCartaIdentita = ({
  dataset,
  setFormField,
  errors,
  touched,
  handleFieldBlur,
}) => {

  const RadioItems = [
    {
      id: 1,
      label: "Si (specificare i dati della carta d'identità)",
    },
    {
      id: 2,
      label: "No",
    },
  ];
  return (
    <>
      <Row fluid justifycontent="space-between">
        <GroupFieldTitle
          title="carta di identità"
        />
      </Row>
      <RadioGroup
        radioItems={RadioItems}
        selectedItem={RadioItems.find(el => el.id === dataset.checkCarta)}
        onChange={(value) => {
          setFormField("cartaIdentita", {
            checkCarta: value.id,
            numero: dataset.numero,
            dataRilascio: dataset.dataRilascio,
            dataScadenza: dataset.dataScadenza,
            rilasciatoDa: dataset.rilasciatoDa,
          })
        }}
        fontSize="f7"
        checkcolor="primary"
        display="inline-grid"
        style={{ width: 'fit-content' }}
      />
      {dataset.checkCarta === 1 &&
        <Row fluid margin='1em 0 0 0'>
          <Column xs="12" md="4" padding="0 1em 1em 0">
            <Input
              label={"N° carta d'identità"}
              onChange={(value) => {
                setFormField("cartaIdentita", {
                  checkCarta: dataset.checkCarta,
                  numero: value,
                  dataRilascio: dataset.dataRilascio,
                  dataScadenza: dataset.dataScadenza,
                  rilasciatoDa: dataset.rilasciatoDa,
                })
              }}
              onBlur={() => { handleFieldBlur('cartaIdentita.numero') }}
              inputValue={dataset["numero"]}
              error={touched['cartaIdentita.numero'] && errors['cartaIdentita.numero']}
              required
            />
          </Column>
          <Column xs="12" md="4" padding="0 1em 1em 0">
            <DatePicker
              required
              label={"Data di rilascio"}
              onBlur={() => handleFieldBlur('cartaIdentita.dataRilascio')}
              onChange={(day) => {
                setFormField("cartaIdentita", {
                  checkCarta: dataset.checkCarta,
                  numero: dataset.numero,
                  dataRilascio: day,
                  dataScadenza: dataset.dataScadenza,
                  rilasciatoDa: dataset.rilasciatoDa,
                });
              }}
              selectedDate={dataset["dataRilascio"]}
              error={touched['cartaIdentita.dataRilascio'] && errors['cartaIdentita.dataRilascio']}
            />
          </Column>
          <Column xs="12" md="4" padding="0 1em 1em 0">
            <DatePicker
              required
              label={"Data di scadenza"}
              onBlur={() => handleFieldBlur('cartaIdentita.dataScadenza')}
              onChange={(day) => {
                setFormField("cartaIdentita", {
                  checkCarta: dataset.checkCarta,
                  numero: dataset.numero,
                  dataRilascio: dataset.dataRilascio,
                  dataScadenza: day,
                  rilasciatoDa: dataset.rilasciatoDa,
                });
              }}
              selectedDate={dataset["dataScadenza"]}
              error={touched['cartaIdentita.dataScadenza'] && errors['cartaIdentita.dataScadenza']}
            />
          </Column>
          <Column xs="12" md="4" padding="0 1em 1em 0">
            <Input
              label={"Rilasciata dal comune di"}
              onChange={(value) => {
                setFormField("cartaIdentita", {
                  checkCarta: dataset.checkCarta,
                  numero: dataset.numero,
                  dataRilascio: dataset.dataRilascio,
                  dataScadenza: dataset.dataScadenza,
                  rilasciatoDa: value,
                })
              }}
              inputValue={dataset["rilasciatoDa"]}
              onBlur={() => { handleFieldBlur('cartaIdentita.rilasciatoDa') }}
              error={touched['cartaIdentita.rilasciatoDa'] && errors['cartaIdentita.rilasciatoDa']}
              required
            />
          </Column>
        </Row>}
    </>
  );
};

FormCartaIdentita.displayName = 'FormCartaIdentita';

export default FormCartaIdentita;
