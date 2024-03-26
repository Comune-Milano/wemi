import { isUndefined, isArray } from 'util';
import { ApolloError } from 'apollo-server';

/**
 * General Interface for validators 
 */
export class Validator {
  /**
   * The cons
   * @param {string} keysToArgs the keys to find the right primary key of the validator
   * @param {object} argomenti are the parameters of the resolver invoked 
   */
  constructor(keysToArgs, argomenti) {
    this.keysToArgs = keysToArgs;
    this.arguments = argomenti;
  }
  /**
   * The function to validate the parameters
   * @param {*} user to validate the access of the user to the result of the resource
   */
  async validate(user) {
    if (isUndefined(this.arguments) || isUndefined(user) || isUndefined(this.keysToArgs)) {
      throw new ApolloError('INTERNAL_SERVER_ERROR');
    }
  }
  /**
   * Recursive function to find the key in the arguments object
   * @param {*} object the object
   * @param {*} keys the keys
   * @param {*} defaultValue the value default
   * @returns {*} the value
   */
  findValues(object, keys, defaultValue) {
    const checkType = typeof object !== 'object';
    const checkPath = keys.length > 0;
    if ((checkType || isUndefined(object) || isArray(object)) && checkPath) {
      return defaultValue;
    }
    const segments = keys.split('.');
    const [field, ...rest] = segments;
    const fieldValue = object[field];
    if (rest.length === 0) {
      return fieldValue || defaultValue;
    }
    return this.findValues(fieldValue, rest.join('.'), defaultValue);
  }
  /**
   * function to initialize the recursive call
   * @returns {*} the value
   */
  findArgs() {
    const object = this.arguments;
    const pathToValue = this.keysToArgs;
    return this.findValues(object, pathToValue, '');
  }
}