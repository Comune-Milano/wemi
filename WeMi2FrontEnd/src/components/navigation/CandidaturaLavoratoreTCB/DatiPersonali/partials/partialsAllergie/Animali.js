
import React from 'react';
import { Row, Column } from 'components/ui/Grid';
import Text from 'components/ui/Text';
import Checkbox from 'components/ui2/Checkbox';
import TextArea from 'components/ui2/TextArea';
import { STRING_MAX_VALIDATION } from 'libs/Form/errors';

const Animali = ({
  dataset,
  setFormField,
  errors,
  touched,
  handleFieldBlur,
}) => (
  <>
    <Row fluid>
      <Text weight="bold" value="Sei allergico/a agli animali?" />
    </Row>
    <Row fluid margin="1em 0 0 0">
      <Row fluid>
        <Checkbox
          value={dataset.cani}
          onChange={value => {
            setFormField('cani', value);
          }}
          label="Si, ai cani"
          checkcolor="primary"
          width="fit-content"
        />
      </Row>
      <Row fluid>
        <Checkbox
          value={dataset.gatti}
          onChange={value => {
            setFormField('gatti', value);
          }}
          label="Si, ai gatti"
          checkcolor="primary"
          width="fit-content"
        />
      </Row>
      <Row fluid>
        <Checkbox
          value={dataset.altriAnimali}
          onChange={value => {
            setFormField('altriAnimali', value);
          }}
          label="Si, ad altri animali (specificare)"
          checkcolor="primary"
          width="fit-content"
        />
      </Row>
      {dataset.altriAnimali ? (
        <Row fluid>
          <Column xs="12" md="6" padding="0">
            <TextArea
              onChange={value => setFormField('altriAnimaliTextArea', value)}
              onBlur={() => handleFieldBlur('altriAnimaliTextArea')}
              placeholder="Specificare allergie o intolleranze ad altri animali qui..."
              inputValue={dataset.altriAnimaliTextArea}
              name="altriAnimaliTextArea"
              rows="2"
              error={touched.altriAnimaliTextArea && errors.altriAnimaliTextArea}
              maxLength={STRING_MAX_VALIDATION.value}
            />
          </Column>
        </Row>
        ) : null}
    </Row>
  </>
  );

Animali.displayName = 'Animali';

export default (Animali);
