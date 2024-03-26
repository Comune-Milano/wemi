/** @format */

import memoize from 'fast-memoize';
import { valuesTranslations } from 'i18n';

const checkLocale = memoize(locale => {
  const translationFound = valuesTranslations.find(lang => lang === locale);

  if (translationFound) return true;
  return false;
});

export default checkLocale;
