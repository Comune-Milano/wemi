
import React, { memo } from 'react';
import { useFormField } from '../hooks/useFormField';

/**
 * A wrapper component for a form field that gives
 * access to the field context.
 */
const FormField = ({
  name,
  children,
}) => {
  // The form field context.
  const fieldContext = useFormField(name);

  return (
    <>
      { children(fieldContext) }
    </>
  );
};

FormField.displayName = 'FormField';

const memoizedComponent = memo(FormField);
export { memoizedComponent as FormField };
