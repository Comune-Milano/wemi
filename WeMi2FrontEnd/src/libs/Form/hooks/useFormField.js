
import { useCallback, useMemo } from 'react';
import { useContextSelector } from 'use-context-selector';
import { FormContext } from '../context/FormContext';

/**
 * An hook exposing an API to manage the form field
 * state and appearance.
 */
export const useFormField = (name) => {
  // The form context.
  const value = useContextSelector(FormContext, state => state.dataset[name]);
  const setFormField = useContextSelector(FormContext, state => state.setFormField);
  const handleBlur = useContextSelector(FormContext, state => state.handleFieldBlur);
  const touched = useContextSelector(FormContext, state => state.touched[name]);
  const error = useContextSelector(FormContext, state => state.errors[name]);

  const setValue = useCallback(
    data => setFormField(name, data),
   [setFormField, name]
  );

  // The metadata linked to the field.
  const fieldMeta = useMemo(() => ({
    name,
    value,
    error,
    touched,
    setValue,
    handleBlur,
  }), [value, setValue, handleBlur, touched, error]);

  return fieldMeta;
};
