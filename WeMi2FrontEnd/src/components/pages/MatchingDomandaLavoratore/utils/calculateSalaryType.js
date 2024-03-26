import { attributo } from 'components/pages/MatchingDomandaLavoratore/constants/constants';
import { TIPOLOGIA_ORARIO } from '../constants/tipologiaorario';

export const calculateSalaryType = (contractType) => {
  if (!contractType) {
    return;
  }
  // Convivente
  if (contractType === TIPOLOGIA_ORARIO.CONVIVENZA) {
    return attributo.LS_STIPENDIO_CONVIVENTE.ty_dominio_tcb;
  }
  // Non convivente
  if (contractType === TIPOLOGIA_ORARIO.NON_CONVIVENTE) {
    return attributo.LS_STIPENDIO_NON_CONVIVENTE.ty_dominio_tcb;
  }
  // Convivenza ridotta
  if (contractType === TIPOLOGIA_ORARIO.CONVIVENZA_RIDOTTA) {
    return attributo.LS_STIPENDIO_A_CONVIVENZA_RIDOTTA.ty_dominio_tcb;
  }
  // presenza notturna
  if (contractType === TIPOLOGIA_ORARIO.PRESENZA_NOTTURNA) {
    return attributo.LS_STIPENDIO_PRESENZA_NOTTURNA.ty_dominio_tcb;
  }
  // assistenza notturna
  if (contractType === TIPOLOGIA_ORARIO.ASSISTENZA_NOTTURNA) {
    return attributo.LS_STIPENDIO_ASSISTENZA_NOTTURNA.ty_dominio_tcb;
  }
  // weekend
  if (contractType === TIPOLOGIA_ORARIO.WEEKEND) {
    return attributo.LS_STIPENDIO_WEEKEND.ty_dominio_tcb;
  }

  return null;
};
