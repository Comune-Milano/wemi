
import React, { memo } from 'react';
import { isFunction } from 'utils/functions/typeCheckers';
import { useFormContext } from '../hooks/useFormContext';

/**
 * A wrapper for the native form element.
 */
const FormContainer = ({
  nativeValidationEnabled,
  children,
}) => {
  // The form context.
  const formContext = useFormContext();

  /**
   * Handles the form submit.
   * @param {*} event
   */
  const onSubmit = event => {
    // Prevent the submit to the server hosting the client
    // and run the provided submission callback.
    event.preventDefault();
    event.stopPropagation();

    const { handleSubmit } = formContext;
    handleSubmit();
  };

  // The render-prop pattern is used to make the context API
  // available to the children.
  return (
    <form
      noValidate={!nativeValidationEnabled}
      onSubmit={onSubmit}
    >
      { isFunction(children) ? children(formContext) : children }
    </form>
  );
};

FormContainer.displayName = 'FormContainer';

const memoizedComponent = memo(FormContainer);
export { memoizedComponent as FormContainer };
