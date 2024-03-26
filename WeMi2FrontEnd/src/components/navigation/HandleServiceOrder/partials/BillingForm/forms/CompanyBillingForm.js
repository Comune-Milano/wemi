
import React, { memo } from 'react';
import TextArea from 'components/ui2/TextArea';
import { Row, Column } from 'components/ui/Grid';
import { FormField } from 'libs/Form/components/FormField';
import { BillingFormInputField } from './BillingFormInputField';

/**
 * The billing form dedicated to a company.
 */
const CompanyBillingForm = () => (
  <>
    <Row>
      <Column xs={6} md={6} padding="0 0.5em 0 0">
        <BillingFormInputField
          fieldName="name"
          fieldLabel="Nome"
        />
      </Column>

      <Column xs={6} md={6} padding="0 0 0 0.5em">
        <BillingFormInputField
          fieldName="surname"
          fieldLabel="Cognome"
        />
      </Column>
    </Row>

    <Row margin="1.5em 0">
      <Column xs={6} md={6} padding="0 0.5em 0 0">
        <BillingFormInputField
          fieldName="businessName"
          fieldLabel="Ragione sociale"
          required
        />
      </Column>

      <Column xs={6} md={6} padding="0 0 0 0.5em">
        <BillingFormInputField
          fieldName="vatNumber"
          fieldLabel="Partita iva"
          required
        />
      </Column>
    </Row>

    <Row margin="1.5em 0">
      <Column xs={8} md={8} padding="0 0.5em 0 0">
        <BillingFormInputField
          fieldName="address"
          fieldLabel="Indirizzo"
          required
        />
      </Column>
      <Column xs={4} md={4} padding="0 0 0 0.5em">
        <BillingFormInputField
          fieldName="postalCode"
          fieldLabel="Cap"
          required
        />
      </Column>
    </Row>
    <Row margin="1.5em 0">
      <Column xs={8} md={8} padding="0 0.5em 0 0" sizepadding={{ md: '0 0.5em 0 0' }}>
        <BillingFormInputField
          fieldName="region"
          fieldLabel="Comune"
          required
        />
      </Column>
      <Column xs={4} md={4} padding="0 0 0 0.5em">
        <BillingFormInputField
          fieldName="province"
          fieldLabel="Provincia"
          required
        />
      </Column>
    </Row>
    <Row margin="1.5em 0">
      <Column xs={12} md={8} padding="0" sizepadding={{ md: '0 0.5em 0 0' }}>
        <BillingFormInputField
          fieldName="phoneNumber"
          fieldLabel="Recapito telefonico"
          required
        />
      </Column>
    </Row>
    <Row margin="1.5em 0 0 0">
      <Column xs={12} padding="0">
        <FormField name="notes">
          {
            ({ value, setValue }) => (
              <TextArea
                label="Note"
                height="8em"
                inputValue={value}
                onChange={setValue}
              />
            )
          }
        </FormField>
      </Column>
    </Row>
  </>
);

CompanyBillingForm.displayName = 'CompanyBillingForm';

export default memo(CompanyBillingForm);
