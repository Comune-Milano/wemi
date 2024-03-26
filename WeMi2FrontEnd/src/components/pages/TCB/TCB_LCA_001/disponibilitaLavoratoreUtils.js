import * as tipologiaOrario from 'types/tipologiaOrario';
import { nameKey, nameKeyStipendio } from './constants';
import { NAME_TIPOLOGIA_ORARIO } from 'types/tipologiaOrario';

export const getCheckboxesTipologiaOrario = tipologieOrarioLavoratore => {
  let checkboxes = {};
  tipologieOrarioLavoratore.forEach(tipoOrario => {
    switch (tipoOrario.value) {
      case 1:
        checkboxes.convivenza = tipoOrario;
        break;
      case 2:
        checkboxes.convivenzaRidotta = tipoOrario;
        break;
      case 3:
        checkboxes.fullTimePartTimeAOre = tipoOrario;
        break;
      case 4:
        checkboxes.presenzaNotturna = tipoOrario;
        break;
      case 5:
        checkboxes.weekend = tipoOrario;
        break;
      case 6:
        checkboxes.assistenzaNotturna = tipoOrario;
        break;
      default:
        break;
    }
  });
  return checkboxes;
};

export const getCheckboxTipologiaOrario = (checkboxesTipologiaOrario, tipologiaOrarioLavoratore) => {
  switch (tipologiaOrarioLavoratore.value) {
    case 1:
      return checkboxesTipologiaOrario.convivenza
    case 2:
      return checkboxesTipologiaOrario.convivenzaRidotta;
    case 3:
      return checkboxesTipologiaOrario.fullTimePartTimeAOre;
    case 4:
      return checkboxesTipologiaOrario.presenzaNotturna;
    case 5:
      return checkboxesTipologiaOrario.weekend;
    case 6:
      return checkboxesTipologiaOrario.assistenzaNotturna;
    default:
      break;
  }
};

export const setCheckboxTipologiaOrario = (checkboxesTipologiaOrario, checkboxTipologiaOrario, isChecked) => {
  switch (checkboxTipologiaOrario.value) {
    case 1:
      checkboxesTipologiaOrario.convivenza.checked = isChecked;
      break;
    case 2:
      checkboxesTipologiaOrario.convivenzaRidotta.checked = isChecked;
      break;
    case 3:
      checkboxesTipologiaOrario.fullTimePartTimeAOre.checked = isChecked;
      break;
    case 4:
      checkboxesTipologiaOrario.presenzaNotturna.checked = isChecked;
      break;
    case 5:
      checkboxesTipologiaOrario.weekend.checked = isChecked;
      break;
    case 6:
      checkboxesTipologiaOrario.assistenzaNotturna.checked = isChecked;
      break;
    default:
      break;
  }

  return checkboxesTipologiaOrario;
};

export const getCheckboxesNrOreSettimanali = nrOreSettimanaliLavoratore => {
  let checkboxes = {};
  nrOreSettimanaliLavoratore.forEach(tipoNrOraSettimanale => {
    switch (tipoNrOraSettimanale.value) {
      case 1:
        checkboxes.lavoroFullTime = tipoNrOraSettimanale;
        break;
      case 2:
        checkboxes.lavoroPartTime15_25 = tipoNrOraSettimanale;
        break;
      case 3:
        checkboxes.lavoroPartTime6_15 = tipoNrOraSettimanale;
        break;
      case 4:
        checkboxes.lavoroAOre = tipoNrOraSettimanale;
        break;
      default:
        break;
    }
  });
  return checkboxes;
};

export const getCheckboxNrOreSettimanali = (checkboxesNrOreSettimanali, nrOreSettimanali) => {
  switch (nrOreSettimanali.value) {
    case 1:
      return checkboxesNrOreSettimanali.lavoroFullTime
    case 2:
      return checkboxesNrOreSettimanali.lavoroPartTime15_25;
    case 3:
      return checkboxesNrOreSettimanali.lavoroPartTime6_15;
    case 4:
      return checkboxesNrOreSettimanali.lavoroAOre;
    default:
      break;
  }
};

export const setCheckboxNrOreSettimanali = (checkboxesNrOreSettimanali, checkboxNrOreSettimanali, isChecked) => {
  switch (checkboxNrOreSettimanali.value) {
    case 1:
      checkboxesNrOreSettimanali.lavoroFullTime.checked = isChecked;
      break;
    case 2:
      checkboxesNrOreSettimanali.lavoroPartTime15_25.checked = isChecked;
      break;
    case 3:
      checkboxesNrOreSettimanali.lavoroPartTime6_15.checked = isChecked;
      break;
    case 4:
      checkboxesNrOreSettimanali.lavoroAOre.checked = isChecked;
      break;
    default:
      break;
  }

  return checkboxesNrOreSettimanali;
};


export const getCalendarValues = (tipologieOrarioCalendarioOffertaServizio) => {
  let calendarValues = {};
  tipologieOrarioCalendarioOffertaServizio.forEach(el => {
    if (el.calendarValues) {
      switch (el.value) {
        case 2:
          calendarValues.convivenzaRidotta = getCalendarValuesObj(el.calendarValues);
          break;
        case 3:
          calendarValues.fullTimePartTimeAOre = getCalendarValuesObj(el.calendarValues);
          break;
        case 4:
          calendarValues.presenzaNotturna = getCalendarValuesObj(el.calendarValues);
          break;
        case 5:
          calendarValues.weekend = getCalendarValuesObj(el.calendarValues);
          break;
        case 6:
          calendarValues.assistenzaNotturna = getCalendarValuesObj(el.calendarValues);
          break;
        default:
          break;
      }
    }
  });

  return calendarValues;
}

const getCalendarValuesObj = (calendarValues) => {
  return Object.keys(calendarValues).map(key => ({
    txValue: key,
    hoursBin: calendarValues[key],
    count: calendarValues[key] && calendarValues[key].match(/1/gi) ? calendarValues[key].match(/1/g).length : 0
  }));
}


export const formatItems = (value) => {
  return value.map(el => ({ id: el.value, value: el.textValue }))
};

export const getNameKey = (id) => {
  switch (id) {
    case tipologiaOrario.CONVIVENZA:
      return nameKey.convivenza;
    case tipologiaOrario.CONVIVENZA_RIDOTTA:
      return nameKey.convivenzaRidotta;
    case tipologiaOrario.NON_CONVIVENTI:
      return nameKey.nonConviventi;
    case tipologiaOrario.PRESENZA_NOTTURNA:
      return nameKey.presenzaNotturna;
    case tipologiaOrario.WEEKEND:
      return nameKey.weekend;
    case tipologiaOrario.ASSISTENZA_NOTTURNA:
      return nameKey.assistenzaNotturna;
    default:
      return "";
  }
};

export const getNameKeyStipendio = (id) => {
  switch (id) {
    case tipologiaOrario.CONVIVENZA:
      return nameKeyStipendio.convivenza;
    case tipologiaOrario.CONVIVENZA_RIDOTTA:
      return nameKeyStipendio.convivenzaRidotta;
    case tipologiaOrario.NON_CONVIVENTI:
      return nameKeyStipendio.nonConviventi;
    case tipologiaOrario.PRESENZA_NOTTURNA:
      return nameKeyStipendio.presenzaNotturna;
    case tipologiaOrario.WEEKEND:
      return nameKeyStipendio.weekend;
    case tipologiaOrario.ASSISTENZA_NOTTURNA:
      return nameKeyStipendio.assistenzaNotturna;
    default:
      return "";
  }
};

export const getNameDisponibilitaOraria = (id) => {
  switch (id) {
    case tipologiaOrario.CONVIVENZA:
      return NAME_TIPOLOGIA_ORARIO.convivenza;
    case tipologiaOrario.CONVIVENZA_RIDOTTA:
      return NAME_TIPOLOGIA_ORARIO.convivenzaRidotta;
    case tipologiaOrario.NON_CONVIVENTI:
      return NAME_TIPOLOGIA_ORARIO.nonConviventi;
    case tipologiaOrario.PRESENZA_NOTTURNA:
      return NAME_TIPOLOGIA_ORARIO.presenzaNotturna;
    case tipologiaOrario.WEEKEND:
      return NAME_TIPOLOGIA_ORARIO.weekend;
    case tipologiaOrario.ASSISTENZA_NOTTURNA:
      return NAME_TIPOLOGIA_ORARIO.assistenzaNotturna;
    default:
      return "";
  }
};