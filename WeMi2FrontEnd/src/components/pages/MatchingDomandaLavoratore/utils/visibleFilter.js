/**
 * @param {Object} valore
 */
export const visibleFilter = valore => {

  /**
   * Se array non vuoto lo conto
   */
  if (Array.isArray(valore) && valore.length > 0) {
    return true;
  }

  /**
    * Se è un numerico con valore > 0 lo conto
    */
  if (typeof valore === "number" && valore > 0) {
    return true;
  }

  /**
    * Se è un booleano ed è true lo conto
    */
  if (typeof valore === "boolean" && valore) {
    return true;
  }

  /**
   * Se è un oggetto e non è vuoto lo conto
   */
  if (valore && valore.hasOwnProperty('id')) {
    return true;
  }

  return false;

};