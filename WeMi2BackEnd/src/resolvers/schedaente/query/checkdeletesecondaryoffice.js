import OfficeDomain from 'domain/gestioneschedaente/nesteddomain/officedomain';

/**
 * The resolver to get the institution card
 * @param {object} parent the parent results
 * @param {object} args the args
 * @param {object} context the context
 * @returns {object} the result object 
 */
export const checkDeleteSecondaryOfficeCard = async (parent, args, context) => {
  const { offices, institutionId } = args;
  const officeDomain = new OfficeDomain(context);
  return await officeDomain.checkDeleteSecondaryOffices(institutionId, offices);
};