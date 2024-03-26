/** @format */

import React from 'react';
import Checkbox from 'components/ui2/Checkbox';
import { Row, Column } from 'components/ui/Grid';
import Input from 'components/ui2/Input';
import { GroupFieldTitle } from 'components/navigation/ConfigurazioneRichiestaTCB/partials';
import { STRING_MAX_VALIDATION } from 'libs/Form/errors';

const FormResidenza = ({
  dataset,
  setFormField,
  domicilio,
  errors,
  touched,
  handleFieldBlur,
}) => (
  <>
    <Row fluid justifycontent="space-between">
      <GroupFieldTitle
        title="residenza"
      />
    </Row>
    <Row fluid>
      <Checkbox
        value={dataset.comeDomicilio}
        onChange={(value) => {
          setFormField('residenza', {
            comeDomicilio: value,
            indirizzo: value ? domicilio.indirizzo : dataset.indirizzo,
            comune: value ? domicilio.comune : dataset.comune,
          });
        }}
        label="La residenza coincide con il domicilio"
        checkcolor="primary"
        width="fit-content"
      />
    </Row>


    <Row fluid margin="1em 0 0 0">
      <Column xs="12" md="4" padding="0 1em 1em 0">
        <Input
          label="Indirizzo"
          disabled={dataset.comeDomicilio}
          onChange={(value) => {
            setFormField('residenza', {
              comeDomicilio: false,
              indirizzo: value,
              comune: dataset.comune,
            });
          }}
          onBlur={() => { handleFieldBlur('residenza.indirizzo'); }}
          inputValue={dataset.indirizzo}
          error={touched['residenza.indirizzo'] && errors['residenza.indirizzo']}
          maxLength={STRING_MAX_VALIDATION.value}
          required
        />
      </Column>
      <Column xs="12" md="4" padding="0 1em 1em 0">
        <Input
          label="Comune"
          disabled={dataset.comeDomicilio}
          onChange={(value) => {
            setFormField('residenza', {
              comeDomicilio: false,
              indirizzo: dataset.indirizzo,
              comune: value,
            });
          }}
          inputValue={dataset.comune}
          onBlur={() => { handleFieldBlur('residenza.comune'); }}
          error={touched['residenza.comune'] && errors['residenza.comune']}
          maxLength={STRING_MAX_VALIDATION.value}
          required
        />
      </Column>
    </Row>
  </>
  );

FormResidenza.displayName = 'FormResidenza';

export default FormResidenza;
