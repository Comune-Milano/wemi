
import React from 'react';
import { Row } from 'components/ui/Grid';
import Text from 'components/ui/Text';
import Animali from './partialsAllergie/Animali';
import Alimentari from './partialsAllergie/Alimentari';
import Altro from './partialsAllergie/Altro';
import { GroupFieldTitle } from 'components/navigation/ConfigurazioneRichiestaTCB/partials';

const Allergie = ({
  dataset,
  setFormField,
  errors,
  touched,
  handleFieldBlur
}) => {
  return (
    <>
      <Row fluid >
        <GroupFieldTitle
          title="Allergie e intolleranze"
          marginTop="2em"
        />
      </Row>
      <Animali
        dataset={dataset}
        touched={touched}
        errors={errors}
        setFormField={setFormField}
        handleFieldBlur={handleFieldBlur}
      />
      <Alimentari
        dataset={dataset}
        errors={errors}
        touched={touched}
        setFormField={setFormField}
        handleFieldBlur={handleFieldBlur}
      />
      <Altro
        dataset={dataset}
        errors={errors}
        handleFieldBlur={handleFieldBlur}
        touched={touched}
        setFormField={setFormField}
      />
    </>
  );
};

Allergie.displayName = 'Allergie';

export default (Allergie);
