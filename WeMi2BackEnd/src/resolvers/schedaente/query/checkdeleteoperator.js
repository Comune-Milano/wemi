import OperatorDomain from 'domain/gestioneschedaente/nesteddomain/operatordomain';

/**
 * The resolver to get the institution card
 * @param {object} parent the parent results
 * @param {object} args the args
 * @param {object} context the context
 * @returns {object} the result object 
 */
export const checkDeleteOperatorCard = async (parent, args, context) => {
  const { users } = args;
  const operatorDomain = new OperatorDomain(context);
  return await operatorDomain.checkDeleteUsersValidity(users);
};