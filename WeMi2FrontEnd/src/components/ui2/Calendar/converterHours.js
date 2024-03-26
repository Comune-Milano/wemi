import moment from 'moment';

export function converterHours(hoursBin) {
  const arrHoursBin= [...hoursBin];

  const ore = (desiredStartTime, interval, period, format = 'k') => {
    const periodsInADay = moment.duration(1, 'day').as(period);
  
    const timeLabels = [];
    const startTimeMoment = moment(desiredStartTime, 'hh:mm');
    for (let i = interval; i <= periodsInADay; i += interval) {
      startTimeMoment.add(i === 0 ? 0 : interval, period);
      timeLabels.push(startTimeMoment.format(format));
    }
  
    return timeLabels;
  };

  return ore('00:00', 1, 'hours').filter((ele, index)=>{
   return parseInt(arrHoursBin[index], 10);
  })

}