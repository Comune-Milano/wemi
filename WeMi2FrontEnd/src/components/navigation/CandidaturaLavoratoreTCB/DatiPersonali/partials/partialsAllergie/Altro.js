
import React from 'react';
import { Row } from 'components/ui/Grid';
import Text from 'components/ui/Text';
import Checkbox from 'components/ui2/Checkbox';
import TextArea from 'components/ui2/TextArea';
import { STRING_MAX_VALIDATION } from 'libs/Form/errors';

const Altro = ({
  dataset,
  errors,
  handleFieldBlur,
  touched,
  setFormField,
}) => (
  <>
    <Row fluid margin="1rem 0 0 0">
      <Text
        weight="bold"
        value="Hai altre allergie o intolleranze?"
      />
    </Row>
    <Row fluid margin="1em 0 0 0">
      <Row fluid>
        <Checkbox
          value={dataset.altro}
          onChange={(value) => { setFormField('altro', value); }}
          label="Si, ho altre allergie o intolleranze (specificare)"
          checkcolor="primary"
          width="fit-content"
        />
      </Row>
    </Row>
    { dataset.altro &&
        (
          <Row fluid>
            <TextArea
              placeholder="Specificare le altre allergie o intolleranze qui..."
              inputValue={dataset.altroTextArea}
              onBlur={() => handleFieldBlur('altroTextArea')}
              onChange={(value) => setFormField('altroTextArea', value)}
              error={touched.altroTextArea && errors.altroTextArea ? errors.altroTextArea : null}
              maxLength={STRING_MAX_VALIDATION.value}
            />
          </Row>
        )
      }
  </>
  );

Altro.displayName = 'Altro';

export default (Altro);
