import moment from 'moment';
import { DOMENICA, LUNEDI } from 'components/ui2/WeekCalendarTimePicker/utils/constants';

export const mergeHoursBetween = (calendarObject = {}, interval) => {
  if (!interval) {
    return {};
  }
  const calendario = Object.assign({}, calendarObject);
  const array = moment.weekdays(true);
  const arrayUpper = array.map(day => day.toUpperCase());
  const json = { };
  arrayUpper.forEach(key => {
    json[key] = [];
  });

  arrayUpper.forEach((currentKey) => {
    const currentElement = calendario[currentKey];
    currentElement.forEach(element => {
      if (interval.start.isSame(element.start) && interval.middleUp.isSame(element.end)) {
        json[currentKey] = [interval];
      }
    });
  });

  return json;
};

export const splitHoursBetween = (calendarObject = {}, interval) => {
  if (!interval) {
    return {};
  }
  const calendario = Object.assign({}, calendarObject);
  const array = moment.weekdays(true);
  const arrayUpper = array.map(day => day.toUpperCase());
  const json = { };
  arrayUpper.forEach(key => {
    json[key] = [];
  });

  arrayUpper.forEach((currentKey, index) => {
    const currentElement = calendario[currentKey];
    const isLastDay = currentKey === DOMENICA.value;
    let nextKey = currentKey;
    if (isLastDay) {
      nextKey = LUNEDI.value;
    } else {
      const nextKeyIndex = index + 1;
      nextKey = arrayUpper[nextKeyIndex];
    }
    const { middleUp, middleDown, start, end } = currentElement[0] || {};
    if (middleUp && middleDown) {
      const updNextElement = {
        start: middleDown,
        end,
      };
      const updCurrentElement = {
        start,
        end: middleUp,
      };
      json[currentKey].push(updCurrentElement);
      json[nextKey].push(updNextElement);
    }
  });

  return json;
};

export const countHours = (calendarStateObject, defaultHours) => {
  if (!defaultHours || !calendarStateObject) {
    return Number.parseFloat(0).toFixed(1);
  }
  const nuovoStato = Object.assign({}, calendarStateObject);
  const arrayStato = Object.values(nuovoStato);
  let counter = 0;
  const timeScheduleConstant = defaultHours;
  arrayStato.forEach((value) => {
    if (value.length > 0) {
      counter += timeScheduleConstant;
    }
  });
  return Number.parseFloat(counter).toFixed(1);
};
