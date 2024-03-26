import moment from 'moment';
import yup from 'libs/Form/validation/yup';
import * as constants from './constants';
import { string, array } from 'prop-types';

const initialState = {
  [constants.LUNEDI.value]: [],
  [constants.MARTEDI.value]: [],
  [constants.MERCOLEDI.value]: [],
  [constants.GIOVEDI.value]: [],
  [constants.VENERDI.value]: [],
  [constants.SABATO.value]: [],
  [constants.DOMENICA.value]: [],
};

export const generateCalendar = (bin) => (
  bin.reduce((accumulator, obj) => ({
    ...accumulator,
    [getDayByTxValue(obj.txValue)]: decodeBin(obj.hoursBin),
  }), { ...initialState })
);

export const convertObjectToBin = (obj) => (
  obj ?
    Object.keys(obj).map(key => {
      const hoursBin = (obj[key].length !== 0) ?
        convertBitsToString(generateBin(obj[key]))
        : null;
      const count = hoursBin ?
        (hoursBin.split('1').length - 1) * 0.5
        : 0;
      return {
        dayId: getIdByDay(key),
        txValue: convertKeyToDayLabel(key),
        hoursBin: hoursBin ? hoursBin : '000000000000000000000000000000000000000000000000',
        count,
      };
    })
    :
    null
);

export const convertBinToObject = (calendar) => (
  calendar ? generateCalendar(calendar) : { ...initialState }
);


export const convertKeyToDayLabel = (key) => (
  constants.WEEK[key] && constants.WEEK[key].label
);

const getIdByDay = day => (
  constants.WEEK[day] && constants.WEEK[day].id
);

const getDayByTxValue = (txValue) => {
  if (txValue) {
    switch (txValue.toLowerCase()) {
      case constants.LUNEDI.label.toLocaleLowerCase(): return constants.LUNEDI.value;
      case constants.MARTEDI.label.toLocaleLowerCase(): return constants.MARTEDI.value;
      case constants.MERCOLEDI.label.toLocaleLowerCase(): return constants.MERCOLEDI.value;
      case constants.GIOVEDI.label.toLocaleLowerCase(): return constants.GIOVEDI.value;
      case constants.VENERDI.label.toLocaleLowerCase(): return constants.VENERDI.value;
      case constants.SABATO.label.toLocaleLowerCase(): return constants.SABATO.value;
      case constants.DOMENICA.label.toLocaleLowerCase(): return constants.DOMENICA.value;
      default: return null;
    }
  }
};

export const binToString = (bin) => {
  return decodeBin(bin).reduce((acc, el) => (
    `${acc}${acc ? '- ' : ''}${el.end.diff(el.start, 'days') === 1 ?
      'Tutto il giorno'
      : `dalle ${el.start.format('HH:mm')} alle ${el.end.format('HH:mm')}`} `
  ), '');
}


const decodeBin = (bin) => {
  if (!bin) {
    return [];
  }
  const bits = [];
  for (let i = 0; i < bin.length; i += 1) {
    bits.push(parseInt(bin.charAt(i), 10) === constants.BIT_ON);
  }
  return convertIntervalsToTime(activeIntervals(bits));
};

const activeIntervals = bits => {
  const intervals = [];
  let start = 0;
  let end = 0;
  for (let i = 1; i < bits.length; i += 1) {
    //se due bit consecutivi sono differenti
    if (bits[i - 1] !== bits[i]) {
      /*
        se l'ultimo bit è attivo allora sta iniziando una nuova sequenza
        altrimenti significa che è terminata la sequenza di bit attivi
        e va inserita negli intervalli attivi
      */
      if (bits[i]) {
        start = i;
      } else {
        end = i - 1;
        intervals.push({
          start,
          end,
        });
      }
    } else if (bits[i] && i === bits.length - 1) {
      //altrimenti se i bit sono uguali ed è l'ultimo lo aggiungo
      end = i;
      intervals.push({
        start,
        end,
      });
    }
  }
  return intervals;
};


const convertIntervalsToTime = (intervals) => (
  intervals.map(interval => ({
    start: moment().startOf('day').set('minute', interval.start * constants.BIT_VALUE),
    end: moment().startOf('day').set('minute', (interval.end + 1) * constants.BIT_VALUE),
  }))
);

const generateBin = (intervals) => {
  const bits = new Array(constants.NUMBER_OF_BITS - 1).fill(false);
  intervals.forEach(interval => {
    const startMinute = (interval.start.hour() * 60) + interval.start.minute();
    const endMinute = startMinute + interval.end.diff(interval.start, 'minutes');
    const startIndex = getMinuteIndex(startMinute);
    const endIndex = getMinuteIndex(endMinute);
    bits.fill(true, startIndex, endIndex);
  });
  return bits;
};

const convertBitsToString = (bits) => (
  bits.reduce((accumulator, bit) => (
    accumulator.concat(bit ? '1' : '0')
  ), '')
);

const getMinuteIndex = (minute) => (
  Math.floor(
    minute / (constants.DAY_IN_MINUTES / constants.NUMBER_OF_BITS)
  )
);

const enteSchema = yup
  .array()
  .of(
    yup.object().shape({
      disponibilita: yup.array().of(
        yup.object().shape({
          oraA: yup.string(),
          oraDa: yup.string(),
        })
      ),
      giorno: yup.string(),
    })
  );
export const convertFasceOrarieToObj = (fasceOrarie) => {
  try {
    enteSchema.validateSync(fasceOrarie);
    return fasceOrarie.reduce((acc, fascia) => ({
      ...acc,
      [getDayByTxValue(fascia.giorno)]: convertInterval(fascia.disponibilita),
    }), {});
  } catch {
    return {
      ...initialState,
    };
  }
};

const convertInterval = (intervals) => (
  intervals.map(intervallo => ({
    start: moment(intervallo.oraDa, 'HH:mm'),
    end: moment(intervallo.oraA, 'HH:mm'),
  })));

export const convertObjectToIntervals = (obj) => (
  Object.keys(obj).map(key => ({
    giorno: convertKeyToDayLabel(key),
    disponibilita: convertToInterval(obj[key]),
  })
  ));

const convertToInterval = (intervals) => (
  intervals.map(interval => {
    const start = moment(interval.start);
    const end = moment(interval.end);
    const diff = end.startOf('day').diff(start.startOf('day'), 'days');
    return {
      oraA: diff === 1 ? '24:00' : interval.end.format('HH:mm'),
      oraDa: interval.start.format('HH:mm'),
    };
  })
);