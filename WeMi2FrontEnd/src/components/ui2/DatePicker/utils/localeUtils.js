
import { LocaleUtils } from 'react-day-picker';
import { MONTHS } from '../translations/translations';

/**
 * Gets the set of months in the provided locale.
 * @param {*} locale
 */
function getMonths(locale) {
  const localizedMonths = MONTHS[locale];
  if (!localizedMonths) {
    return LocaleUtils.getMonths();
  }
  return localizedMonths;
}

export default {
  getMonths,
  formatDay: LocaleUtils.formatDay,
  formatMonthTitle: LocaleUtils.formatMonthTitle,
  formatWeekdayLong: LocaleUtils.formatWeekdayLong,
  formatWeekdayShort: LocaleUtils.formatWeekdayShort,
  getFirstDayOfWeek: LocaleUtils.getFirstDayOfWeek,
};
