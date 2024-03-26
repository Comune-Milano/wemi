
import React, { memo } from 'react';
import { FormContextProvider } from '../context/FormContext';
import { useFormApi } from '../hooks/useFormApi';

/**
 * Wraps the component children in the form provider.
 */
const FormProvider = ({
  children,
  initialDataset,
  validationSchema,
  validateOnChange,
  onChangeValidationDebounce,
  validateOnBlur,
  onSubmit,
  validateOnMount,
}) => {
  const contextApi = useFormApi({
    initialDataset,
    validationSchema,
    validateOnChange,
    onChangeValidationDebounce,
    validateOnBlur,
    onSubmit,
    validateOnMount,
  });

  return (
    <FormContextProvider value={contextApi}>
      { children}
    </FormContextProvider>
  );
};


FormProvider.displayName = 'FormProvider';

const memoizedComponent = memo(FormProvider);
export { memoizedComponent as FormProvider };
