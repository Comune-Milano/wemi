import { checkElement } from "./checkelement";
import { labelCalendario } from "../labels";

/**
 * @param {Array} arrayLabel label da includere nel conteggio
 * @param {Object} filtriSelezionati filtri da contare
 */
export const countFilter = (arrayLabel, filtriSelezionati) => {
  const { calendario, popupFilters } = filtriSelezionati;

  let conteggio = 0;
  for (const label of Object.values(arrayLabel)) {
    for (const filtro of Object.keys(popupFilters)) {
      const valore = popupFilters[filtro];
      /**
       * Se label è nei filtri selezionati ed il valore è definito
       * verifico se lo devo contare
       */
      if (label === filtro && valore) {
        /**
         * Se array non vuoto lo conto
         */
        if (checkElement(valore)) {

          conteggio += 1;
          continue;
        }
         /**
         * Se è il calendario
         */
        if (calendario && filtro === labelCalendario) {
          conteggio += 1;
          continue;
        }
      }
    }
  }
  return conteggio;
};
