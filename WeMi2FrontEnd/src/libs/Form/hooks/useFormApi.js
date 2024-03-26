import { useEventCallback } from 'hooks/useEventCallback';
import React, { useCallback, useEffect, useMemo, useReducer, useRef } from 'react';
import debounce from 'utils/functions/debounce';
import isEqual from 'react-fast-compare';
import { isFunction } from 'utils/functions/typeCheckers';
import { resetForm, setField, setFields, setFieldTouched, setFormErrors, setIsValidating } from '../state/actionCreators/actionCreators';
import { formStateReducer } from '../state/reducer/reducer';
import { transformYupError, isYupError } from '../validation/yupErrrorTransformer';
import { FormSubmitError, isSubmitError } from '../validation/SubmitError';

export const useFormApi = ({
  initialDataset,
  validationSchema,
  validateOnChange,
  onChangeValidationDebounce,
  validateOnBlur,
  onSubmit,
  validateOnMount,
}) => {
  // Keeps track of the mounting status of the component.
  const isMounted = useRef(false);

  // The form state.
  const [formState, dispatch] = useReducer(formStateReducer, {
    dataset: initialDataset,
    errors: {},
    touched: {},
    submitting: false,
    validating: false,
  });

  /**
   * Gets the form errors asynchronously basing on the provided dataset.
   * @param {*} dataset
   */
  const getFormErrors = useCallback(
    dataset => validationSchema
      .validate(dataset, { abortEarly: false })
      // If the validation promise resolves, there are no errors.
      .then(() => ({}))
      // Catches the validation errors and applies a transformation.
      .catch(error => {
        // Propagates the error if it does not originated by yup.
        if (!isYupError(error)) {
          throw error;
        }
        return transformYupError(error);
      }),
    [validationSchema]
  );

  /**
   * Gets the form errors synchronously basing on the provided dataset.
   * @param {*} dataset
   */
  const getFormErrorsSync = useCallback(
    dataset => {
      try {
        validationSchema.validateSync(dataset, { abortEarly: false });
        return {};
      } catch (error) {
        // Propagates the error if it does not originated by yup.
        if (!isYupError(error)) {
          throw error;
        }
        return transformYupError(error);
      }
    },
    [validationSchema]
  );

  /**
   * Updates the form fields validity asynchronously.
   */
  const lazilyValidateForm = React.useCallback(async () => {
    try {
      dispatch(setIsValidating(true));
      const errors = await getFormErrors(formState.dataset);

      // Updates errors and validating flag if the component is mounted.
      if (isMounted.current) {
        dispatch(setFormErrors(errors));
        dispatch(setIsValidating(false));
      }

      return errors;
    } catch (error) {
      throw error;
    }
  }, [getFormErrors, dispatch, setFormErrors, setIsValidating, formState.dataset]);

  /**
   * Performs a low priority validation without moving
   * the form in a validating status.
   */
  const validateDatasetWithLowPriority = useCallback(
    async dataset => {
      const errors = await getFormErrors(dataset);
      dispatch(setFormErrors(errors));
    },
    [getFormErrors, dispatch]
  );

  /**
   * Performs a debounce on a low priority validation.
   */
  const performDebouncedDatasetValidation = useCallback(
    debounce(validateDatasetWithLowPriority, onChangeValidationDebounce),
    []
  );

  /**
   * Updates the form fields validity synchronously.
   */
  const validateForm = useCallback(() => {
    try {
      const errors = getFormErrorsSync(formState.dataset);
      dispatch(setFormErrors(errors));
      return errors;
    } catch (error) {
      throw error;
    }
  }, [getFormErrorsSync, dispatch, formState.dataset, setFormErrors]);

  /**
   * Handles to blur event on a form field.
   * @param {*} key
   */
  const handleFieldBlur = useEventCallback(async key => {
    dispatch(setFieldTouched(key));

    // Breaks if no validation is required on blur.
    if (!validateOnBlur) {
      return;
    }

    // Updates the form errors asynchronously.
    lazilyValidateForm();
  });

  /**
   * Triggers the action to update a form field value.
   */
  const setFormField = React.useCallback((key, value) => {
    dispatch(setField(key, value));
  }, [dispatch, setField]);

  /**
   * Reset the form
   */
  const resetFormFields = useCallback((value) => {
    dispatch(resetForm(value || initialDataset));
  }, [resetForm, dispatch, initialDataset]);

  /**
  * Set values dataset
  */
  const setFormFields = React.useCallback(
    (values = {}) => {
      dispatch(setFields(values));
    }, [dispatch, setFields]
);

  /**
   * Determines if the form is valid.
   */
  const isFormValid = useMemo(
    () => formState.errors && Object.keys(formState.errors).length === 0,
    [formState.errors]
  );

  /**
   * Determines if the form is dirty.
   */
  const isFormDirty = React.useMemo(
    () => !isEqual(initialDataset, formState.dataset),
    [formState.dataset]
  );

  /**
   * Handles the submit of the form.
   */
  const handleSubmit = useCallback(() => {
    if (!isFunction(onSubmit)) {
      return Promise.resolve();
    }

    return lazilyValidateForm()
      .then(errors => {
        const isValid = Object.keys(errors).length === 0;

        if (isValid && isMounted.current) {
          // Wrapping the "onSubmit" handler in a promise allows
          // to avoid checking if that handler is async or not.
          return Promise.resolve(onSubmit(formState.dataset));
        }

        return Promise.reject(
          new FormSubmitError('FormProvider - Just tried to submit an invalid form')
        );
      })
      .catch(error => {
        if (!isSubmitError(error)) {
          throw error;
        }
      });
  }, [lazilyValidateForm, onSubmit, formState.dataset]);

  /**
   * Updates the mounting state of the component.
   */
  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = true;
    };
  }, []);

  /**
   * Triggers a validation when the component is mounted.
   */
  useEffect(
    () => {
      if (validateOnMount) {
        validateForm();
      }
    },
    [validateOnMount]
  );

  /**
   * Performs a form validation as a side effect of any
   * dataset changes.
   */
  useEffect(
    () => {
      if (!validateOnChange || !isMounted.current) {
        return;
      }
      // Since performing the form validation on every change could
      // impact the performances, we perform a debounce on the validation
      // trigger.
      // This can be considered a low-priority validation.
      // (NOTE: When the form is submitted a HIGH priority validation
      // takes place, so we're sure that form data is valid on submission).
      performDebouncedDatasetValidation(formState.dataset);
    },
    [formState.dataset]
  );

  /**
   * Exposes to the clidren a set of public API
   * to manipulate and interact with the form.
   */
  const contextAPI = {
    dataset: formState.dataset,
    errors: formState.errors,
    touched: formState.touched,
    submitting: formState.submitting,
    validating: formState.validating,
    validateForm,
    lazilyValidateForm,
    setFormField,
    resetFormFields,
    handleFieldBlur,
    isFormValid,
    isFormDirty,
    handleSubmit,
    setFormFields,
  };

  return contextAPI;
};
