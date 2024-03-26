import React from 'react';
import { Column, Row } from 'components/ui/Grid';
import DatePicker from 'components/ui2/DatePicker';
import moment from 'moment';
import TextTitle from './TextTitle';

const ModifyProfileValidityDates = React.memo(({
  dataset,
  errors,
  setFormField,
}) => {

  const setInizioValidita = (date, inputValue) => {
    setFormField('inizioValidita', date);
    setFormField('inizioValiditaInputValue', inputValue || undefined);
  };

  const setFineValidita = (date, inputValue) => {
    setFormField('fineValidita', date);
    setFormField('fineValiditaInputValue', inputValue || undefined);
  };
  
  return (
    <Row fluid margin="0 0 3em 0">
      <Column padding="0 0 0 1em" fluid >
        <TextTitle
          value="Validità profilo"
          color="primary"
        />
      </Column>
      <Column padding="1em" lg="3" md="5" sm="6" xs="10">
        <DatePicker
          label="Inizio validità"
          selectedDate={dataset.inizioValidita ? moment(dataset.inizioValidita).format('DD/MM/YYYY') : undefined}
          disabledDays={(date) => dataset.fineValidita ? date > dataset.fineValidita : false}
          onChange={setInizioValidita}
          error={errors?.inizioValidita || errors?.inizioValiditaInputValue}
        />
      </Column>
      <Column padding="1em" lg="3" md="5" sm="6" xs="10">
        <DatePicker
          label="Fine validità"
          selectedDate={dataset.fineValidita ? moment(dataset.fineValidita).format('DD/MM/YYYY') : undefined}
          disabledDays={(date) => dataset.inizioValidita ? date < dataset.inizioValidita : false}
          onChange={setFineValidita}
          error={errors?.fineValidita || errors?.fineValiditaInputValue}
        />
      </Column>
    </Row>
  )
});

ModifyProfileValidityDates.displayName = 'ModificaUtenzaNavigation- ModifyProfileValidityDates';

export default ModifyProfileValidityDates;