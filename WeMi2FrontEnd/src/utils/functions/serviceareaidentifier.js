/**
 * Checks if the provided value matches a services aread identifier.
 * @param {*} value
 */
export const matchServicesAreaIdentifier = value => /AREA_SERVIZI_[0-9]+/gm.test(value);
