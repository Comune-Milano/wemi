import moment from 'moment';

/**
 * The date transformer
 * @param {*} _ the first item not used
 * @param {*} originalValue the originalValue
 */
export const dateTransformer = (_, originalValue) => {
  const date = moment(originalValue, 'DD/MM/YYYY', true);
  return date.isValid() ? date.toDate() : new Date('');
};
