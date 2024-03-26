import React, { Fragment } from 'react';
import { Row, Column } from 'components/ui/Grid';
import Switch from 'components/ui2/Switch';

const FormOthersInfoComponent = ({
  dataset = {},
  touched = {},
  errors = {},
  handleFieldBlur,
  disabled,
  setDataset,
  keySection,
}) => (
  <Fragment>
    <Row fluid>
      <Column xs="12" md="6" padding="0" sizepadding={{ xs: '0 0 2em 0', md: '0 2em 0 0' }}>
        <Switch
          tabIndex="0"
          label="L'Ente è disponibile a offrire servizi di welfare aziendale?"
          required
          error={touched.welfareAvailability && errors.welfareAvailability ?
              errors.welfareAvailability : ''}
          value={!!(dataset.welfareAvailability)}
          disabled={disabled}
          onChange={(value) => setDataset('welfareAvailability', value)}
          onBlur={() => handleFieldBlur(`${keySection}.welfareAvailability`)}
        />
      </Column>
      <Column xs="12" md="6" padding="0">
        <Switch
          tabIndex="0"
          label="L'Ente è disponibile ad accogliere volontari?"
          required
          error={touched.volunteerAvailability && errors.volunteerAvailability ?
              errors.volunteerAvailability : ''}
          value={!!(dataset.volunteerAvailability)}
          disabled={disabled}
          onChange={(value) => setDataset('volunteerAvailability', value)}
          onBlur={() => handleFieldBlur(`${keySection}.volunteerAvailability`)}
        />
      </Column>
    </Row>
  </Fragment>
  );


FormOthersInfoComponent.displayName = 'Form citizen availability component';

export const FormOthersInfo = FormOthersInfoComponent;
