import { STATO_SCHEDA_ENTE } from 'constants/db/statoschedaente';
import GestioneSchedaEnteDomain from 'domain/gestioneschedaente/gestioneschedaente';

/**
 * The resolver to save the institution card
 * @param {object} parent the parent results
 * @param {object} args the args
 * @param {object} context the context
 * @returns {object} the result object 
 */
export const forwardNotesInstitutionCard = async (parent, args, context) => {
  const { input, others } = args;
  const gestoreSchedaEnteDomain = new GestioneSchedaEnteDomain(context);
  const state = STATO_SCHEDA_ENTE.DA_CORREGGERE;
  await gestoreSchedaEnteDomain.insertDataInstutionCard(others, state);
  const result = await gestoreSchedaEnteDomain.forwardNotesInstitution(input, state);
  return result;
};