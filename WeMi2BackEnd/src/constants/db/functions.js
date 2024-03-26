export const getCalendarValuesObj = (calendarValues) => {
  if(calendarValues) {
    return Object.keys(calendarValues).map(key => ({
      txValue: key,
      hoursBin: calendarValues[key],
      count: calendarValues[key] && calendarValues[key].match(/1/gi) ? calendarValues[key].match(/1/g).length / 2 : 0
    }));
  }
  
  return null;
}
