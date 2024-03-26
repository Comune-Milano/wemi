
import React, { memo } from 'react';
import { FormProvider } from './FormProvider';
import { FormContainer } from './FormContainer';

/**
 * A generic component form.
 */
const Form = ({
  onSubmit,
  nativeValidationEnabled,
  initialDataset,
  validationSchema,
  children,
  validateOnChange,
  onChangeValidationDebounce = 500,
  validateOnBlur,
  validateOnMount,
}) => (
  <FormProvider
    initialDataset={initialDataset}
    validationSchema={validationSchema}
    validateOnChange={validateOnChange}
    onChangeValidationDebounce={onChangeValidationDebounce}
    validateOnBlur={validateOnBlur}
    onSubmit={onSubmit}
    validateOnMount={validateOnMount}
  >
    <FormContainer
      nativeValidationEnabled={nativeValidationEnabled}
    >
      { children }
    </FormContainer>
  </FormProvider>
);

Form.displayName = 'Form';

const memoizedComponent = memo(Form);
export { memoizedComponent as Form };
