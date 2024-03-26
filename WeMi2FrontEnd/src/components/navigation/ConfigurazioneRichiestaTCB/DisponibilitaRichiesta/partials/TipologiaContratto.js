/** @format */

import React from 'react';
import Text from 'components/ui/Text';
import { Row, Column } from 'components/ui/Grid';
import RadioGroup from 'components/ui2/RadioGroup';
import DatePicker from 'components/ui2/DatePicker';
import TextArea from 'components/ui2/TextArea';
import { STRING_MAX_VALIDATION } from 'libs/Form/errors';
import GroupFieldTitle from '../../partials/GroupFieldTitle';
import { createRadioArray } from '../../utils';


const TipologiaContratto = ({
  setFormField,
  tipologiaContratto,
  tipologieContratto,
  contrattoDa,
  contrattoAl,
  noteContratto,
  touched,
  handleFieldBlur,
  errors,
  locale,
}) => {
  const tipologieContrattoRadio = createRadioArray(tipologieContratto, locale);

  return (
    <>
      <GroupFieldTitle
        title="Che tipologia di contratto vuoi proporre?"
        required
      />
      <Row fluid margin="0" alignitems="center">
        <Column xs="12" md="4" padding="0 0 1em 0" sizepadding={{ md: '0 1em 0 0' }}>
          <RadioGroup
            radioItems={tipologieContrattoRadio}
            selectedItem={tipologiaContratto}
            error={touched.tipologiaContratto && errors.tipologiaContratto}
            onBlur={() => handleFieldBlur('tipologiaContratto')}
            onChange={(value) => { setFormField('tipologiaContratto', value); }}
            fontSize="f7"
            checkcolor="primary"
            display="inline-grid"
          />
        </Column>
        <Column xs="6" md="4" padding="0 .5em 0 0">
          <DatePicker
            required
            label="Dal giorno"
            onBlur={() => handleFieldBlur('contrattoDa')}
            error={touched.contrattoDa && errors.contrattoDa}
            onChange={(day, value) => {
              const date = day || value;
              setFormField('contrattoDa', date || undefined);
            }}
            selectedDate={contrattoDa}
            disabledDays={(date) => {
              const today = new Date();
              return date < today.setDate(today.getDate() - 1);
            }}
          />
        </Column>
        {tipologiaContratto.id === 2 || !tipologiaContratto.id ? (
          <Column xs="6" md="4" padding="0 0 0 .5em">
            <DatePicker
              required
              label="Al giorno"
              error={touched.contrattoAl && errors.contrattoAl}
              onBlur={() => handleFieldBlur('contrattoAl')}
              onChange={(day, value) => {
                const date = day || value;
                setFormField('contrattoAl', date || undefined);
              }}
              selectedDate={contrattoAl}
              disabledDays={(date) => contrattoDa ? date < contrattoDa : false}
            />
          </Column>
        )
          : null}
      </Row>
      <Text
        value="Vuoi aggiungere altro sul contratto e su orario di lavoro?"
        size="f7"
        margin="2em 0 .5em 0"
        tag="p"
      />
      <Row fluid margin="0">
        <Column xs="12" padding="0">
          <TextArea
            onChange={(value) => setFormField('noteContratto', value)}
            placeholder="Scrivi qui..."
            inputValue={noteContratto}
            onBlur={() => handleFieldBlur('noteContratto')}
            name="Altre note sul contratto"
            error={touched.noteContratto && errors.noteContratto}
            maxLength={STRING_MAX_VALIDATION.value}
            rows={3}
          />
        </Column>
      </Row>
    </>
  );
};

TipologiaContratto.displayName = 'TipologiaContratto';

export default TipologiaContratto;
