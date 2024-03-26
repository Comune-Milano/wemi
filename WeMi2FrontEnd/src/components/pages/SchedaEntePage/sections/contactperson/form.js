import React, { Fragment } from 'react';
import { Row, Column } from 'components/ui/Grid';
import Input from 'components/ui2/Input';

const FormContactPersonComponent = ({
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
      <Column xs="12" md="4" padding="0" sizepadding={{ xs: '0 0 2em 0', md: '0 2em 0 0' }}>
        <Input
          tabIndex="0"
          label="Referente"
          required
          error={touched.name && errors.name ?
              errors.name : ''}
          inputValue={dataset.name}
          disabled={disabled}
          onChange={(value) => setDataset('name', value)}
          onBlur={() => handleFieldBlur(`${keySection}.name`)}
        />
      </Column>
      <Column xs="12" md="4" padding="0" sizepadding={{ xs: '0 0 2em 0', md: '0 2em 0 0' }}>
        <Input
          tabIndex="0"
          label="Telefono"
          required
          error={touched.phoneNumber && errors.phoneNumber ?
              errors.phoneNumber : ''}
          inputValue={dataset.phoneNumber}
          disabled={disabled}
          onChange={(value) => setDataset('phoneNumber', value)}
          onBlur={() => handleFieldBlur(`${keySection}.phoneNumber`)}
        />
      </Column>
      <Column xs="12" md="4" padding="0">
        <Input
          tabIndex="0"
          label="Telefono secondario"
          error={touched.secondaryPhoneNumber && errors.secondaryPhoneNumber ?
              errors.secondaryPhoneNumber : ''}
          inputValue={dataset.secondaryPhoneNumber}
          disabled={disabled}
          onChange={(value) => setDataset('secondaryPhoneNumber', value)}
          onBlur={() => handleFieldBlur(`${keySection}.secondaryPhoneNumber`)}
        />
      </Column>
    </Row>
    <Row fluid margin="2em 0 0 0">
      <Column xs="12" md="6" padding="0" sizepadding={{ xs: '0 0 2em 0', md: '0 2em 0 0' }}>
        <Input
          tabIndex="0"
          label="e-mail"
          required
          error={touched.email && errors.email ?
              errors.email : ''}
          inputValue={dataset.email}
          disabled={disabled}
          onChange={(value) => setDataset('email', value)}
          onBlur={() => handleFieldBlur(`${keySection}.email`)}
        />
      </Column>
      <Column xs="12" md="6" padding="0">
        <Input
          tabIndex="0"
          label="E-mail secondaria"
          error={touched.secondaryEmail && errors.secondaryEmail ?
              errors.secondaryEmail : ''}
          inputValue={dataset.secondaryEmail}
          disabled={disabled}
          onChange={(value) => setDataset('secondaryEmail', value)}
          onBlur={() => handleFieldBlur(`${keySection}.secondaryEmail`)}
        />
      </Column>
    </Row>
  </Fragment>
  );


FormContactPersonComponent.displayName = 'Form contact person component';

export const FormContactPerson = FormContactPersonComponent;
