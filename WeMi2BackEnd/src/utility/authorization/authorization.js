import { ApolloError } from 'apollo-server';
import { verifyUser } from 'utility/user/verifyuser';
import { logger } from 'utility/logger/getInstance';
import { UNAUTHORIZED } from 'errors/authorization';
import { AuthorizationManagerDomain } from 'domain/authorizationmanager';

/**
 * Checks if the user is authorized or not
 * @param {number[]} authorizationList the list of authorization for the operation
 * @returns {Function} the function to check if the user is authorized for the operatotion
 */
export default (authorizationList = []) => next => async (root, args, context, info) => {
  try {
    const { req } = context;
    const { session } = req;
    const user = verifyUser(session.user);
    const authorizationManager = new AuthorizationManagerDomain(context);
    await authorizationManager.isAuthorized(authorizationList, { ...user, profile: user.profileObject });
    return next(root, args, context, info);
  }
  catch (error) {
    logger.error(error, 'Error while checking the user permissions');
    throw new ApolloError(UNAUTHORIZED.message, UNAUTHORIZED.code);
  }
};