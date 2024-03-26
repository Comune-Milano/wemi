import { getObjectValue } from 'utils/extensions/objectExtensions';

/**
   *
   * @param {*} filterList
   * @param {*} key
   */
export const mapFilterList = (filterList, type) => {
  if (!filterList) {
    return [];
  }

  return filterList.filter(element => {
    const value = getObjectValue(element, 'type', null);
    if (value === type) {
      return true;
    }
    return false;
  });
};
