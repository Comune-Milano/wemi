import { STATO_SCHEDA_ENTE } from 'constants/db/statoschedaente';
import GestioneSchedaEnteDomain from 'domain/gestioneschedaente/gestioneschedaente';

/**
 * The resolver to save the institution card
 * @param {object} parent the parent results
 * @param {object} args the args
 * @param {object} context the context
 * @returns {object} the result object 
 */
export const validateInstitutionCard = async (parent, args, context) => {
  const { input, notes } = args;
  const gestoreSchedaEnteDomain = new GestioneSchedaEnteDomain(context);
  const state = STATO_SCHEDA_ENTE.VALIDATA;
  await gestoreSchedaEnteDomain.insertDataInstutionCard(input, state);
  return await gestoreSchedaEnteDomain.saveNotesInstitution({ ...input, notes }, state);
};