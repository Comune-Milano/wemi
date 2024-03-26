import moment from 'moment';

const ASSISTENZA_NOTTURNA_DEFAULT_HOURS = 8;
const PRESENZA_NOTTURNA_DEFAULT_HOURS = 5;

const ASSISTENZA_NOTTURNA_INTERVALS = {
  start: 20,
  end: 8,
};

const PRESENZA_NOTTURNA_INTERVALS = {
  start: 21,
  end: 8,
};


export const INTERVALS = {
  ASSISTENZA_NOTTURNA: {
    start: moment().startOf('day').set('hour', ASSISTENZA_NOTTURNA_INTERVALS.start),
    middleUp: moment().startOf('day').set('hour', 24),
    middleDown: moment().startOf('day').set('hour', 0),
    end: moment().startOf('day').set('hour', ASSISTENZA_NOTTURNA_INTERVALS.end),
    defaultHours: ASSISTENZA_NOTTURNA_DEFAULT_HOURS,
  },
  PRESENZA_NOTTURNA: {
    start: moment().startOf('day').set('hour', PRESENZA_NOTTURNA_INTERVALS.start),
    middleUp: moment().startOf('day').set('hour', 24),
    middleDown: moment().startOf('day').set('hour', 0),
    end: moment().startOf('day').set('hour', PRESENZA_NOTTURNA_INTERVALS.end),
    defaultHours: PRESENZA_NOTTURNA_DEFAULT_HOURS,
  },
};
