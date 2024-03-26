import { isString, isNumber } from 'util';

/**
 * Replaces all interpolated values (in the shape of $[var]) embedded
 * in the input string using the provided object (i.e. "interpolations").
 * @param {*} stringValue
 * @param {*} interpolations
 */
export function replaceInterpolations (stringValue, interpolations) {
  return stringValue.replace(/{([^{}]*)}/g, (matched, idex) => {
    const value = interpolations[idex];
    return isString(value) || isNumber(value) ? value : matched;
  });
}
