import { SEZIONI, SEZIONI_ARR } from 'types/sezioni';
import { PAGE_DOMICILIARITA, PAGE_HOME_018 } from 'types/url';

export const breadcrumbFromSez = (codSezione, location) => {
  if ((!codSezione && !location) || (location && location.state?.isFromHomeSearch)) {
    return undefined;
  }
  if (codSezione === SEZIONI.ANNI_0_18) {
    return {
      slash: '0-18 anni',
      url: PAGE_HOME_018,
    };
  }
  if (location.state && location.state.is018) {
    return {
      slash: '0-18 anni',
      url: PAGE_HOME_018,
    };
  }
  return {
    slash: 'Domiciliarità',
    url: PAGE_DOMICILIARITA,
  };
};

export const codSezioneIsValid = (codSezione) => SEZIONI_ARR.includes(codSezione);
