import OperatorDomain from 'domain/gestioneschedaente/nesteddomain/operatordomain';

/**
 * The resolver to get the institution card
 * @param {object} parent the parent results
 * @param {object} args the args
 * @param {object} context the context
 * @returns {object} the result object 
 */
export const checkInsertOperatorCard = async (parent, args, context) => {
  const { users, institutionId } = args;
  const operatorDomain = new OperatorDomain(context);
  await operatorDomain.checkInsertUsersValidity(users, institutionId);
  return users;
};