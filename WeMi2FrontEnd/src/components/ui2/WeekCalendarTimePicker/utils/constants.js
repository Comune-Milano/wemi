import moment from "moment";

export const LUNEDI = Object.freeze({
  id: 1,
  value: 'LUNEDÌ',
  label: 'Lunedì',
});
export const MARTEDI = Object.freeze({
  id: 2,
  value: 'MARTEDÌ',
  label: 'Martedì',
});
export const MERCOLEDI = Object.freeze({
  id: 3,
  value: 'MERCOLEDÌ',
  label: 'Mercoledì',
});
export const GIOVEDI = Object.freeze({
  id: 4,
  value: 'GIOVEDÌ',
  label: 'Giovedì',
});
export const VENERDI = Object.freeze({
  id: 5,
  value: 'VENERDÌ',
  label: 'Venerdì',
});
export const SABATO = Object.freeze({
  id: 6,
  value: 'SABATO',
  label: 'Sabato',
});
export const DOMENICA = Object.freeze({
  id: 7,
  value: 'DOMENICA',
  label: 'Domenica',
});

export const WEEK = Object.freeze({
  [LUNEDI.value]: LUNEDI,
  [MARTEDI.value]: MARTEDI,
  [MERCOLEDI.value]: MERCOLEDI,
  [GIOVEDI.value]: GIOVEDI,
  [VENERDI.value]: VENERDI,
  [SABATO.value]: SABATO,
  [DOMENICA.value]: DOMENICA,
});

const getValue = (index) => {
  const prevDate = moment().startOf('day').set('minute', (index - 1) * BIT_VALUE).startOf('day');
  const date = moment().startOf('day').set('minute', index * BIT_VALUE).startOf('day');
  if (date.diff(prevDate, 'days') === 1 && index !== 0) {
    return '24:00';
  }
  return moment().startOf('day').set('minute', index * BIT_VALUE).format('HH:mm');
};

export const BIT_ON = 1;
export const BIT_OFF = 0;
export const BIT_VALUE = 30;
export const NUMBER_OF_BITS = 48 + 1;
export const DAY_IN_MINUTES = 1440;
export const selectHourItems = new Array(NUMBER_OF_BITS).fill(undefined).map((_, index) => ({
  id: index * BIT_VALUE,
  value: getValue(index),
}));
