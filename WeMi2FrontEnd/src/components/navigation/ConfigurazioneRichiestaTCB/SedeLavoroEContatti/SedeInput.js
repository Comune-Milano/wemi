/** @format */

import React from 'react';
import { Row, Column } from 'components/ui/Grid';
import Input from 'components/ui2/Input';
import { MAX_LENGTH_CAP } from 'types/maxInput';
import { STRING_MAX_VALIDATION } from 'libs/Form/errors';

const SedeInput = ({
    dataset,
    setFormField,
    errors,
    touched,
    handleFieldBlur,
}) => (
  <Row fluid margin="1em 0 0 0">

    <Column xs="12" md="6" padding="0 0 1em 0" sizepadding={{ md: '0 .5em 0 0' }}>
      <Input
        label="Indirizzo"
        onChange={(value) => { setFormField('indirizzo_utente', value); }}
        inputValue={dataset.indirizzo_utente}
        onBlur={() => { handleFieldBlur('indirizzo_utente'); }}
        error={touched.indirizzo_utente && errors.indirizzo_utente}
        maxLength={STRING_MAX_VALIDATION.value}
        required
      />
    </Column>
    <Column xs="12" md="2" padding="0 0 1em 0" sizepadding={{ md: '0 .5em 0 .5em' }}>
      <Input
        label="CAP"
        onChange={(value) => { if (value.length <= MAX_LENGTH_CAP) setFormField('cap_utente', value); }}
        inputValue={dataset.cap_utente}
        onBlur={() => { handleFieldBlur('cap_utente'); }}
        error={touched.cap_utente && errors.cap_utente}
        required
      />
    </Column>
    <Column xs="12" md="4" padding="0 0 1em 0" sizepadding={{ md: '0 0 0 .5em' }}>
      <Input
        label="Comune"
        onChange={(value) => { setFormField('comune_utente', value); }}
        inputValue={dataset.comune_utente}
        onBlur={() => { handleFieldBlur('comune_utente'); }}
        error={touched.comune_utente && errors.comune_utente}
        maxLength={STRING_MAX_VALIDATION.value}
        required
      />
    </Column>

  </Row>
    );

SedeInput.displayName = 'SedeInput';

export default SedeInput;
