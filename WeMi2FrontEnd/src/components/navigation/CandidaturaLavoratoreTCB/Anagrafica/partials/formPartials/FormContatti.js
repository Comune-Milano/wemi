/** @format */

import React from 'react';
import Text from 'components/ui/Text';
import { Row, Column } from 'components/ui/Grid';
import Input from 'components/ui2/Input';
import { GroupFieldTitle } from 'components/navigation/ConfigurazioneRichiestaTCB/partials';
import { STRING_MAX_VALIDATION } from 'libs/Form/errors';

const FormContatti = ({
  dataset,
  setFormField,
  errors,
  touched,
  handleFieldBlur,
}) => (
  <>
    <Row fluid justifycontent="space-between">
      <GroupFieldTitle
        title="contatti"
      />
    </Row>

    <Row fluid margin=".5em 0 0 0" direction="column">
      <Text
        value="A quale recapito telefonico possiamo contattarti?"
        tag="p"
        weight="bold"
      />
      <Row fluid>
        <Column xs="12" md="4" padding=".5em 1em 1em 0">
          <Input
            label="Telefono 1"
            onChange={(value) => {
              setFormField('contatti', {
                telefono1: value,
                email: dataset.email,
                telefono2: dataset.telefono2,
              });
            }}
            onBlur={() => { handleFieldBlur('contatti.telefono1'); }}
            inputValue={dataset.telefono1}
            error={touched['contatti.telefono1'] && errors['contatti.telefono1']}
            required
          />
        </Column>
        <Column xs="12" md="4" padding=".5em 1em 1em 0">
          <Input
            label="Telefono 2"
            onChange={(value) => {
              setFormField('contatti', {
                telefono1: dataset.telefono1,
                email: dataset.email,
                telefono2: value || undefined,
              });
            }}
            onBlur={() => { handleFieldBlur('contatti.telefono2'); }}
            inputValue={dataset.telefono2}
            error={touched['contatti.telefono2'] && errors['contatti.telefono2']}
          />
        </Column>
      </Row>
    </Row>
    <Row fluid margin=".5em 0 0 0" direction="column">
      <Text
        value="A quale indirizzo e-mail possiamo scriverti?"
        tag="p"
        weight="bold"
      />
      <Column xs="12" md="4" padding=".5em 1em 1em 0">
        <Input
          label="e-mail"
          onChange={(value) => {
            setFormField('contatti', {
              telefono1: dataset.telefono1,
              telefono2: dataset.telefono2,
              email: value,
            });
          }}
          inputValue={dataset.email}
          onBlur={() => { handleFieldBlur('contatti.email'); }}
          error={touched['contatti.email'] && errors['contatti.email']}
          maxLength={STRING_MAX_VALIDATION.value}
          required
        />
      </Column>
    </Row>
  </>
  );

FormContatti.displayName = 'FormContatti';

export default FormContatti;
