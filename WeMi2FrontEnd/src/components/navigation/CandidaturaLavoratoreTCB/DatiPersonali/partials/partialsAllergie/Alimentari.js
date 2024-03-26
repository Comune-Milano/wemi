
import React from 'react';
import { Row } from 'components/ui/Grid';
import Text from 'components/ui/Text';
import Checkbox from 'components/ui2/Checkbox';
import TextArea from 'components/ui2/TextArea';
import { STRING_MAX_VALIDATION } from 'libs/Form/errors';

const Alimentari = ({
  dataset,
  setFormField,
  errors,
  touched,
  handleFieldBlur,
}) => (
  <>
    <Row fluid margin="1rem 0 0 0">
      <Text
        weight="bold"
        value="Hai delle intolleranze alimentari?"
      />
    </Row>
    <Row fluid margin="1em 0 0 0">
      <Row fluid>
        <Checkbox
          value={dataset.alimentari}
          onChange={(value) => { setFormField('alimentari', value); }}
          label="Si, ho delle intolleranze (specificare)"
          checkcolor="primary"
          width="fit-content"
        />
      </Row>
    </Row>
    { dataset.alimentari &&
        (
          <Row fluid>
            <TextArea
              placeholder="Scrivi qui le intolleranze alimentari"
              inputValue={dataset.altroAlimentari}
              onChange={(value) => setFormField('altroAlimentari', value)}
              onBlur={() => handleFieldBlur('altroAlimentari')}
              error={touched.altroAlimentari && errors.altroAlimentari}
              maxLength={STRING_MAX_VALIDATION.value}
            />
          </Row>
        )
      }
  </>
  );

Alimentari.displayName = 'Alimentari';

export default (Alimentari);
