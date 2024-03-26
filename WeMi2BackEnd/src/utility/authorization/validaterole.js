import { isUndefined, isArray } from 'util';
import { ApolloError } from 'apollo-server';
import { UNAUTHORIZED, ROLES_UNDEFINED } from 'errors/authorization';
import { verifyUser } from 'utility/user/verifyuser';
import { logger } from 'utility/logger/getInstance';

/**
 * Verify if the user has the permission to access to the resource
 * @param {string[]} rolesAccepted indicates the roles
 * @returns {Function} the function to check the role of the user
 */
export default (rolesAccepted) => next => async (root, args, context, info) => {
  if (isUndefined(rolesAccepted) || (isArray(rolesAccepted) && rolesAccepted.length === 0)) {
    throw new ApolloError(ROLES_UNDEFINED.message, ROLES_UNDEFINED.code);
  }
  else {
    const roles = Array(...rolesAccepted);
        /**
         * Verify if the user is authenticated. This will happen if the @auth decorators it's not used!
         */
    try {
      const { req } = context;
      const { session } = req;
      const user = verifyUser(session.user);
             /**
              * It checks if the user is authorized to get the resource
              */
      if (!roles.includes(user.profile)) {
        throw new ApolloError(UNAUTHORIZED.message, UNAUTHORIZED.code);
      }

      return next(root, args, context, info);

    }
       
    catch (error) {
      logger.trace(error);
      throw new ApolloError(UNAUTHORIZED.message, UNAUTHORIZED.code);
    }
          
  }

};