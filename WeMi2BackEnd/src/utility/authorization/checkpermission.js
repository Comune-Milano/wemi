import { ApolloError } from 'apollo-server';
import { FactoryValidator } from 'validator/factoryvalidator';
import { verifyUser } from 'utility/user/verifyuser';
import { logger } from 'utility/logger/getInstance';

/**
 * To check if the user it's the owner of the resource
 * @param {string} type the type validator to invoke
 * @param {string} argsToKey the path to retrieve arguments
 * @returns {Function} the function to check permissions
 */
export default (type, argsToKey) => next => async (root, args, context, info) => {
    /**
     * Verify if the user is authenticated. This will happen if the @auth decorators it's not used!
     */
  try {
    const { req } = context;
    const { session } = req;
    const user = verifyUser(session.user);
    const factoryValidator = new FactoryValidator();
    const parameters = { ...args, ...user };
    const validator = factoryValidator.create(type, argsToKey, parameters);
    await validator.validate(user);
    return next(root, args, context, info);
  }
  catch (error) {
    logger.error(error, 'Error while checking the user permissions');
    throw new ApolloError(error.message, error.code);
  }
};