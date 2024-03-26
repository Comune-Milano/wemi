import moment from 'moment';
const format = 'HH:mm';

export const isAllDaySelected = (selectedIntervals) => (
  selectedIntervals.length === 1 &&
  selectedIntervals[0].end?.diff(selectedIntervals[0].start, 'days') > 0
);

export const isBetween = (checkDate, startDate, endDate) => {
  checkDate = moment(checkDate, format);
  startDate = moment(startDate, format);
  endDate = moment(endDate, format);
  return checkDate.isBetween(startDate, endDate);
};

export const isEqual = (date1, date2) => {
  date1 = moment(date1, format);
  date2 = moment(date2, format);
  return date1.isSame(date2);
};

export const sortDate = (date1, date2) => (
  moment(date1, format).isBefore(moment(date2, format)) ? -1 : 1
);
