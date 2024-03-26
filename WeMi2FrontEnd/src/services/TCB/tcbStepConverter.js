export const stepStatus = {
  activeAndValid: '4',
  activeAndInvalid: '3',
  visitedAndValid: '2',
  visitedAndInvalid: '1'
};

/**
 * Converts the provided step to the status expected by our backend API.
 * @param {*} step The step to convert.
 */
export const getBackendStepStatus = step => {
  if (step.active === true && step.valid) {
    return stepStatus.activeAndValid;
  }

  if (step.active === true && !step.valid) {
    return stepStatus.activeAndInvalid;
  }

  if (step.visited === true && step.valid === true) {
    return stepStatus.visitedAndValid;
  }

  if (step.visited === true && step.valid === false) {
    return stepStatus.visitedAndInvalid;
  }

  return null;
};

/**
 * Converts the provided step code to the status expected by the client.
 * @param {*} step The code to convert.
 */
export const getClientStepStatus = code => {
  switch (code) {
    case 1:
      return ({
        valid: false,
        visited: true,
        active: false,
      });
    case 2:
      return ({
        valid: true,
        visited: true,
        active: false,
      });
    case 3:
      return ({
        visited: true,
        active: true,
        valid: false,
      });
    case 4:
      return ({
        visited: true,
        active: true,
        valid: true,
      });
    default:
      return {};
  }
};
