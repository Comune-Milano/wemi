import GestioneSchedaEnteDomain from 'domain/gestioneschedaente/gestioneschedaente';

/**
 * The resolver to get the institution card
 * @param {object} parent the parent results
 * @param {object} args the args
 * @param {object} context the context
 * @returns {object} the result object 
 */
export const getInstitutionCardAdmin = async (parent, args, context) => {
  const { institutionId } = args;
  const gestoreSchedaEnteDomain = new GestioneSchedaEnteDomain(context);
  return await gestoreSchedaEnteDomain.findInstitutionCardInformation(institutionId);
};