import { authenticated, validateRole, checkPermission, checkAuthorization } from 'utility/authorization';

/**
 * Constant to define the directives of the schema
 */

export const DIRECTIVE_TO_GUARD = {
  auth: () => authenticated(),
  protect: ({ roles }) =>  validateRole(roles),
  validate: ({ type, argsKey }) => checkPermission(type, argsKey),
  allowed: ({ list }) => checkAuthorization(list),
};