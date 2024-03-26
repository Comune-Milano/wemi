
import { isString } from 'utils/functions/typeCheckers';
import {
  DEFAULT_NAVIGATION_STEPS,
  stepRedirectMapping,
  stepVisibilityFlagMapping,
} from '../constants/DefaultNavigationSteps';

/**
 * Get the redirect index of the step.
 * @param {*} stepIndex
 */
export function getRedirectStepIndex(stepIndex) {
  const stepValue = DEFAULT_NAVIGATION_STEPS[stepIndex];
  const mappedStepCode = stepRedirectMapping[stepValue.code];
  const mappedStepIndex = DEFAULT_NAVIGATION_STEPS.findIndex(current => current.code === mappedStepCode);

  return mappedStepIndex > -1 ? mappedStepIndex : stepIndex;
}

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

/**
 * Gets the new set of steps based on the provided candidacy flags.
 * @param {*} steps
 * @param {*} flags
 */
export const getMutatedStepsByCandidacyFlags = (steps, flags) => steps.map(step => {
  const flagKey = stepVisibilityFlagMapping[step.code];
  const hide = isString(flagKey) ? !flags[flagKey] : step.hide;

  return { ...step, hide };
});
