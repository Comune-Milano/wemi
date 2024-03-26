
import React, { memo } from 'react';
import Input from 'components/ui2/Input';
import { FormField } from 'libs/Form/components/FormField';

/**
 * An input field within the billing form.
 */
const BillingFormInputField = ({
  fieldName,
  fieldLabel,
  optional,
  required
}) => (
  <FormField name={fieldName}>
    {
      ({ value, error, touched, setValue, handleBlur }) => (
        <Input
          {...(!optional )}
          required={required}
          inputValue={value}
          onChange={setValue}
          error={touched && error}
          onBlur={handleBlur}
          label={fieldLabel}
        />
      )
    }
  </FormField>
);

BillingFormInputField.displayName = 'BillingFormInputField';

const memoizedComponent = memo(BillingFormInputField);
export { memoizedComponent as BillingFormInputField };
