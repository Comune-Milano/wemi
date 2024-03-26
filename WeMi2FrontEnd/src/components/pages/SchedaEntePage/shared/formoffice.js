import React, { Fragment } from 'react';
import { Row, Column } from 'components/ui/Grid';
import Input from 'components/ui2/Input';
import { MAX_LENGTH_CAP, MAX_LENGTH_PROVINCIA } from 'types/maxInput';

const FormOfficeComponent = ({
  dataset = {},
  touched = {},
  errors = {},
  handleFieldBlur,
  disabled,
  setDataset,
  keySection,
  required,
  column = '6',
  sizepadding = { xs: '0 0 2em 0', md: '0 2em 0 0' },
}) => (
  <Fragment>
    <Row fluid>
      <Column xs="12" md={column} padding="0" sizepadding={sizepadding}>
        <Input
          tabIndex="0"
          label="Indirizzo Principale"
          required={required}
          error={touched.txIndirizzo && errors.txIndirizzo ?
              errors.txIndirizzo : ''}
          inputValue={dataset.txIndirizzo}
          disabled={disabled}
          onChange={(value) => setDataset('txIndirizzo', value)}
          onBlur={() => handleFieldBlur(`${keySection}.txIndirizzo`)}
        />
      </Column>
      <Column xs="12" md={column} padding="0">
        <Input
          tabIndex="0"
          label="CAP"
          required={required}
          error={touched.txCAP && errors.txCAP ?
              errors.txCAP : ''}
          inputValue={dataset.txCAP}
          disabled={disabled}
          onChange={(value) => {
            if (value.length <= MAX_LENGTH_CAP) {
              setDataset('txCAP', value);
            }
          }}
          onBlur={() => handleFieldBlur(`${keySection}.txCAP`)}
        />
      </Column>
    </Row>
    <Row fluid margin="2em 0 0 0">
      <Column xs="12" md={column} padding="0" sizepadding={sizepadding}>
        <Input
          tabIndex="0"
          label="Città"
          required={required}
          error={touched.txCitta && errors.txCitta ?
              errors.txCitta : ''}
          inputValue={dataset.txCitta}
          disabled={disabled}
          onChange={(value) => setDataset('txCitta', value)}
          onBlur={() => handleFieldBlur(`${keySection}.txCitta`)}
        />
      </Column>
      <Column xs="12" md={column} padding="0">
        <Input
          tabIndex="0"
          label="Provincia"
          required={required}
          error={touched.txProvincia && errors.txProvincia ?
              errors.txProvincia : ''}
          inputValue={dataset.txProvincia}
          disabled={disabled}
          onChange={(value) => {
            if (value.length <= MAX_LENGTH_PROVINCIA) {
              setDataset('txProvincia', value);
            }
          }}
          onBlur={() => handleFieldBlur(`${keySection}.txProvincia`)}
        />
      </Column>
    </Row>
  </Fragment>
  );


FormOfficeComponent.displayName = 'Form office component';

export const FormOffice = FormOfficeComponent;
