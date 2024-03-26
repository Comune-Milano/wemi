
/**
 * The class to use as base when defining any kind
 * of custom error.
 */
export class WeMiError extends Error {
  constructor(name, message) {
    super(name);
    this.message = message;
  }
}
