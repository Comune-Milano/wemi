import moment from 'moment';

/**
 * function to verify if the user is of age
 * @param {Date} date the date
 * @param {string} cf the cf
 * @returns {*} any
 */
export const isYoung = (date) => {
  if(!date){
    return false;
  } 
  const birthday = moment(date);
  const years = moment().diff(birthday, 'years');
  return years < 18;
};