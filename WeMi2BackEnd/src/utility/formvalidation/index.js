import { isIbanValid } from 'utility/formvalidation/constants/isIbanValid';
import { regexEmail, regexUrl, regexPhoneNumber, regexIban } from 'constants/regex';

/**
 * Validation form class
 */
export class ValidationForm {
  /**
   * The validator for email
   * @param {string} email the email 
   * @returns {boolean} the validity of the email
   */
  static validateEmail(email){
    if(!email){
      return true;
    }
    const regex = regexEmail;
    return regex.test(email);
  }
    /**
     * The validator for iban
     * @param {string} iban the iban 
     * @returns {boolean} the validity of the iban
     */
  static validateIban(iban){
    if(!iban){
      return true;
    }
    const regex = regexIban;
    return regex.test(iban) && isIbanValid(iban);
  }
  /**
   * The validator for phoneNumber
   * @param {string} phoneNumber the phoneNumber 
   * @returns {boolean} the validity of the phoneNumber
   */
  static validatePhoneNumber(phoneNumber){
    if(!phoneNumber){
      return true;
    }
    const regex = regexPhoneNumber;
    return regex.test(phoneNumber);
  }
  /**
   * The validator for url
   * @param {string} url the url 
   * @returns {boolean} the validity of the url
   */
  static validateUrl(url){
    if(!url){
      return true;
    }
    const regex = regexUrl;
    return regex.test(url);
  }
}