 /**
   * The validator for iban
   * @param {string} iban the iban 
   * @returns {boolean} the validity of the iban
   */
export const isIbanValid = (iban) => {
  const newString = iban.substring(4, iban.length) + iban.substring(0, 4);
  const numeric = Array.from(newString).map(c => (Number.isNaN(parseInt(c, 10)) ? (c.charCodeAt(0) - 55).toString() : c)).join('');
  const remainder = Array.from(numeric).map(c => parseInt(c, 10)).reduce((remainder, value) => (remainder * 10 + value) % 97, 0);
  
  return remainder === 1;
};