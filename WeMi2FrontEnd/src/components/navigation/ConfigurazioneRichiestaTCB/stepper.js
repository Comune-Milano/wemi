
/**
 * Gets the prev step.
 * @param {*} steps
 * @param {*} activeIndex
 */
export const getPrevStep = (steps, activeIndex) => {
  let prevStep = -1;

  // The index to use as upper limit to find the prev step index.
  const upperLimitIndex = activeIndex - 1;
  if (upperLimitIndex < 0) {
    return prevStep;
  }

  for (let i = upperLimitIndex; i >= 0; i -= 1) {
    const step = steps[i];
    if (!step.active && !step.disabled &&
      (!step.skipOnBackwardDescendant || i !== (activeIndex - 1))
    ) {
      prevStep = i;
      break;
    }
  }

  return prevStep;
};

/**
 * Gets the next step.
 * @param {*} steps
 * @param {*} activeIndex
 */
export const getNextStep = (steps, activeIndex) => {
  // The index to use as starting point to find the next step index.
  const loopStartIndex = activeIndex + 1;
  if (loopStartIndex > (steps.length - 1)) {
    return -1;
  }

  const nextStep = steps.findIndex(
    (navTab, index) => index >= loopStartIndex && !navTab.active && !navTab.disabled
  );

  return nextStep;
};
