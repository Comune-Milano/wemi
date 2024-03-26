/** @format */

import React from 'react';
import { Row, Column } from 'components/ui/Grid';
import Input from 'components/ui2/Input';
import { GroupFieldTitle } from 'components/navigation/ConfigurazioneRichiestaTCB/partials';
import { STRING_MAX_VALIDATION } from 'libs/Form/errors';

const FormDomicilio = ({
  dataset,
  residenza,
  setFormField,
  errors,
  touched,
  handleFieldBlur,
}) => (
  <>
    <Row fluid justifycontent="space-between">
      <GroupFieldTitle
        title="domicilio"
      />
    </Row>
    <Row fluid>
      <Column xs="12" md="4" padding="0 1em 1em 0">
        <Input
          label="Indirizzo"
          onChange={(value) => {
            setFormField('domicilio', {
              indirizzo: value,
              comune: dataset.comune,
            });
            if (residenza.comeDomicilio) {
              setFormField('residenza', {
                comeDomicilio: true,
                indirizzo: value,
                comune: residenza.comune,
              });
            }
          }}
          onBlur={() => { handleFieldBlur('domicilio.indirizzo'); }}
          inputValue={dataset.indirizzo}
          error={touched['domicilio.indirizzo'] && errors['domicilio.indirizzo']}
          maxLength={STRING_MAX_VALIDATION.value}
          required
        />
      </Column>
      <Column xs="12" md="4" padding="0 1em 1em 0">
        <Input
          label="Comune"
          onChange={(value) => {
            setFormField('domicilio', {
              indirizzo: dataset.indirizzo,
              comune: value,
            });
            if (residenza.comeDomicilio) {
              setFormField('residenza', {
                comeDomicilio: true,
                indirizzo: residenza.indirizzo,
                comune: value,
              });
            }
          }}
          inputValue={dataset.comune}
          onBlur={() => { handleFieldBlur('domicilio.comune'); }}
          error={touched['domicilio.comune'] && errors['domicilio.comune']}
          required
        />
      </Column>
    </Row>
  </>
  );

FormDomicilio.displayName = 'FormDomicilio';

export default FormDomicilio;
