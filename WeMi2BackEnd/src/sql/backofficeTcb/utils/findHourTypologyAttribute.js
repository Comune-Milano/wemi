import { attributo } from "constants/db/attributo";
import { dominioTcb } from "constants/db/dominio_tcb";

export const findHourTypologyAttribute = (hourTypology) => {

  if (!hourTypology) {
    return;
  }

  const { orarioLavoro } = dominioTcb;

  switch (hourTypology) {
    case orarioLavoro.convivenza:
      return attributo.LS_STIPENDIO_CONVIVENTE;
    case orarioLavoro.fullTimePartTimeAdOre:
      return attributo.LS_STIPENDIO_NON_CONVIVENTE;
    case orarioLavoro.presenzaNotturna:
      return attributo.LS_STIPENDIO_PRESENZA_NOTTURNA;
    case orarioLavoro.convivenzaRidotta:
      return attributo.LS_STIPENDIO_A_CONVIVENZA_RIDOTTA;
    case orarioLavoro.weekend:
      return attributo.LS_STIPENDIO_WEEKEND;
    case orarioLavoro.assistenzaNotturna:
      return attributo.LS_STIPENDIO_ASSISTENZA_NOTTURNA;
    default:
      return;
  }

};