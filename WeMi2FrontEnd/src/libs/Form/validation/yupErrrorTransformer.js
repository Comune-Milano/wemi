
import { isObject } from 'utils/functions/typeCheckers';

/**
 * Determines if the error is originated by Yup.
 * @param {*} error
 */
export function isYupError(error) {
  return isObject(error) && error.name === 'ValidationError';
}

/**
 * Transform Yup ValidationError to a more usable object
 */
export function transformYupError(yupError) {
  if (!Array.isArray(yupError.inner)) {
    return {};
  }

  if (yupError.inner.length === 0) {
    return { [yupError.path]: yupError.message || '' };
  }

  return yupError.inner.reduce(
    (errors, innerError) => {
      if (!errors[innerError.path]) {
        return { ...errors, [innerError.path]: innerError.message };
      }
      return errors;
    },
    {}
  );
}
