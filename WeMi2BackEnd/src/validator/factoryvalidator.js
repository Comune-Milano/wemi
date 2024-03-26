import { ApolloError } from 'apollo-server';
import { ENUM_VALIDATOR } from '../constants/authorization/validator';
import { VALIDATOR_UNDEFINED } from '../errors/authorization';
import { AMMINISTRATORE } from 'constants/usercode';
/**
 * The factory validator class
 */
export class FactoryValidator {
    /**
     * The method of the class to create validator
     * @param {string} type to generate the right validator
     * @param {string} keysToArgs to find the right key in the validator
     * @param {object} parameters the arguments of the query and the parameters of the user logged
     * @returns {*} the validator
     */
  create(type, keysToArgs, parameters) {
    const { profile } = parameters;
        /**
         * If the user is an administrator has no resource,
         * so has a special validator to call
         */
    if (profile === AMMINISTRATORE) {
      const adminValidator = ENUM_VALIDATOR.ADMIN_VALIDATOR.class;
      return new adminValidator(keysToArgs, parameters);
    }
        /**
         * In other cases checks the validator involved
         */
    const validatorsObject = ENUM_VALIDATOR;
    const constantValidation = Object.values(validatorsObject);
    for (const validator of constantValidation) {
      if (type === validator.code) {
        const classValidator = validator.class;
        return new classValidator(keysToArgs, parameters);
      }
    }
    throw new ApolloError(VALIDATOR_UNDEFINED.message, VALIDATOR_UNDEFINED.code);
  }
}