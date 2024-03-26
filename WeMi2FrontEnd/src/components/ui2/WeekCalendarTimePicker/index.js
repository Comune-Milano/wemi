/** @format */

import React from 'react';
import moment from 'moment';
import { noop } from 'utils/functions/noop';
import DayRow from './DayRow/index';
import {
  convertKeyToDayLabel,
} from './utils/converter';
import {
  LUNEDI,
  MARTEDI,
  MERCOLEDI,
  GIOVEDI,
  VENERDI,
  SABATO,
  DOMENICA,
} from './utils/constants';

const allDays = [
  LUNEDI.value,
  MARTEDI.value,
  MERCOLEDI.value,
  GIOVEDI.value,
  VENERDI.value,
  SABATO.value,
  DOMENICA.value,
];

/**
 *
 * @param {{
 * LUNEDI:[{start: moment, end: moment}]
 * MARTEDI:[{start: moment, end: moment}]
 * MERCOLEDI:[{start: moment, end: moment}]
 * GIOVEDI:[{start: moment, end: moment}]
 * VENERDI:[{start: moment, end: moment}]
 * SABATO:[{start: moment, end: moment}]
 * DOMENICA:[{start: moment, end: moment}]
 * }} calendar, l'oggetto calendario da gestire
 * @param {function ({day: [{start: moment, end: moment}]}):void} onChange,
 * @param {Boolean} disabled, abilita il componente in sola visualizzazione se true
 * @param {Boolean} hideRadio, nasconde la visualizzazione del radio per la selezione della giornata intera
 * @param {Integer} maxIntervals, imposta il numero massimo di intervalli selezionabili per giorno
 * @param {Integer} maxHours, imposta il numero massimo di ore complessive nel calendario
 * @param {[days]} daysToShow, i giorni da mostrare
 */
const WeekCalendarTimePicker = ({
  calendar,
  onChange,
  disabled,
  hideRadio,
  maxIntervals = Number.POSITIVE_INFINITY,
  daysToShow,
  bgColor,
  labelDisabilita,
  maxHours,
  sizeLabelDay,
  error,
  onBlur = noop,
  disableTimeSlot = false,
  labelCheckDefaultTimeSlot = 'Seleziona fascia oraria di default',
  defaultInterval = {},
}) => {
  const handleDayIntervals = (day) => (
    (intervals) => {
      onChange({
        [day]: intervals,
      });
    }
  );
  const daysOfWeek = moment.weekdays(true);
  daysToShow = daysToShow || allDays;
  return (
    <div
      style={{
        width: '100%',
      }}
      onBlur={onBlur}
    >
      {
        daysOfWeek.slice().map(day => {
          const elementUpper = day.toUpperCase();
          return (
            daysToShow.includes(elementUpper) ?
              (
                <DayRow
                  key={elementUpper}
                  labelDisabilita={labelDisabilita}
                  day={convertKeyToDayLabel(elementUpper)}
                  selectedIntervals={calendar[elementUpper]}
                  setSelectedIntervals={handleDayIntervals(elementUpper)}
                  disabled={disabled}
                  hideRadio={hideRadio}
                  maxIntervals={maxIntervals}
                  bgColor={bgColor}
                  maxHours={maxHours}
                  calendar={calendar}
                  sizeLabelDay={sizeLabelDay}
                  error={error}
                  disableTimeSlot={disableTimeSlot}
                  labelCheckDefaultTimeSlot={labelCheckDefaultTimeSlot}
                  defaultInterval={defaultInterval}
                />
              )
              : null
          );
        })
      }
    </div>
  );
};

WeekCalendarTimePicker.displayName = 'WeekCalendarTimePicker';
export default WeekCalendarTimePicker;
