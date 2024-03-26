import { cdAttributo } from "../../CodiciAttributi";

export const findFasceStipendio = (tipologiaOrario, datiDb) => {
  switch (tipologiaOrario.id) {
    case 1:
      if (datiDb) {
        return cdAttributo.IM_STIPENDIO_CONVIVENTE
      }
      else return 'EstraiFasceStipendioConvivente';
    case 2:
      if (datiDb) {
        return cdAttributo.IM_STIPENDIO_A_CONVIVENZA_RIDOTTA
      }
      else return 'EstraiFasceStipendioConvivenzaRidotta';
    case 3:
      if (datiDb) {
        return cdAttributo.IM_STIPENDIO_NON_CONVIVENTE
      }
      else return 'EstraiFasceStipendioNonConvivente';
    case 4:
      if (datiDb) {
        return cdAttributo.IM_STIPENDIO_PRESENZA_NOTTURNA
      }
      else return 'EstraiFasceStipendioPresenzaNotturna';
    case 5:
      if (datiDb) {
        return cdAttributo.IM_STIPENDIO_WEEKEND
      }
      else return 'EstraiFasceStipendioWeekend';
    case 6:
      if (datiDb) {
        return cdAttributo.IM_STIPENDIO_ASSISTENZA_NOTTURNA
      }
      else return 'EstraiFasceStipendioAssistenzaNotturna';
    default:
      return;
  };
};
