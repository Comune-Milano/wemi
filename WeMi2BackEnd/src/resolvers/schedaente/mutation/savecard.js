import { STATO_SCHEDA_ENTE } from 'constants/db/statoschedaente';
import GestioneSchedaEnteDomain from 'domain/gestioneschedaente/gestioneschedaente';

/**
 * The resolver to save the institution card
 * @param {object} parent the parent results
 * @param {object} args the args
 * @param {object} context the context
 * @returns {object} the result object 
 */
export const saveInstitutionCard = async (parent, args, context) => {
  const { input } = args;
  const { user } = context;
  const gestoreSchedaEnteDomain = new GestioneSchedaEnteDomain(context);
  const state = STATO_SCHEDA_ENTE.IN_COMPILAZIONE;
  return await gestoreSchedaEnteDomain.insertDataInstutionCard({
    ...input,
    id: user.idEnte,
  }, state);
};