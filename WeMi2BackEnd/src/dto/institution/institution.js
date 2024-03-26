import { ApolloError } from 'apollo-server';
import { VALIDATION_ERROR, MULTIPLE_VALIDATION_ERROR } from 'errors/errors';
import { ValidationForm } from 'utility/formvalidation';
import { TIPS_ERROR } from 'errors/tips';


/**
 * Class to describe the Institution entity
 */
export class Institution {
  /**
   * The constructor of the class
   * @param {object} dbObject the input object from db
   * @param {boolean} validation set the validation of the dataset in the form
   */
  constructor(dbObject = {}, validation = true){
    this.validation = validation;
    this.operatorsWeMI = dbObject.institutionOperatorsWeMI;
    this.firstContactNote = dbObject.institutionFirstContactNote;
    this.id = dbObject.institutionId;
    this.fullname = dbObject.institutionFullname;
    this.name = dbObject.institutionName;
    this.vatNumber = dbObject.institutionVATNumber;
    this.weMiSpaces = dbObject.institutionWeMiSpaces;
    this.administratorEmail = dbObject.institutionAdministratorEmail;
    this.state = dbObject.institutionState;
    this.stateDescription = dbObject.institutionStateDescription;
    this.accreditationCategories = dbObject.institutionAccreditationCategories;
    this.deletedOperators = dbObject.institutionDeletedOperators;
    this.updatedOperators = dbObject.institutionUpdatedOperators;
    this.setAuthorizedOperators(dbObject.institutionAuthorizedOperators);
    this.description = dbObject.institutionDescription;
    this.logo = dbObject.institutionLogo;
    this.documents = dbObject.institutionDocuments;
    this.principalLocation = dbObject.institutionPrincipalLocation;
    this.locations = dbObject.institutionLocations;
    this.setContactPerson(dbObject.institutionContactPerson);
    this.setCitizenAvailability(dbObject.institutionCitizenAvailability);
    this.setOthersInfo(dbObject.institutionOthersInfo);
    this.setMerchant(dbObject.institutionMerchant);
    this.setPaymentInfo(dbObject.institutionPaymentInfo);
    /**
     * Notes for institution card
     */
    this.note = dbObject.institutionNote;
  }
  /**
   * The validate method for merchant info
   * @param {object} merchant the merchant param
   */
  validateMerchant(merchant){
    if(!this.validation){
      return;
    }
    let isValid = true;
    const validation = { };
    if (!merchant.id) {
      validation.id = {
        value: merchant.id,
        message: 'Il merchantId è obbligatorio',
      };
      isValid = false;
    }
    if (!merchant.publicKey) {
      validation.publicKey = {
        value: merchant.publicKey,
        message: 'La public key è obbligatoria',
      };
      isValid = false;
    }
    if (!merchant.privateKey) {
      validation.privateKey = {
        value: merchant.privateKey,
        message: 'La private key è obbligatoria',
      };
      isValid = false;
    }
    if (!merchant.startDate) {
      validation.startDate = {
        value: merchant.startDate,
        message: 'La data di inizio è obbligatoria',
      };
      isValid = false;
    } else if (
      merchant.endDate &&
      new Date(merchant.startDate).getTime() >= new Date(merchant.endDate).getTime()) {
      validation.endDate = {
        value: merchant.endDate,
        message: 'La data di inizio deve essere precedente alla data di fine',
      };
      
      isValid = false;
    } else if (
      merchant.endDate &&
      new Date(merchant.endDate).getTime() < new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()).getTime()
    ) {
      validation.endDate = {
        value: merchant.endDate,
        message: 'La data di fine non può essere precedente al giorno attuale',
      };
      isValid = false;
    }
    if (!isValid) {
      throw new ApolloError(
        VALIDATION_ERROR.message,
        VALIDATION_ERROR.code,
        { data: validation },
      );
    }
  }
  /**
   * The setter method for merchant info
   * @param {object} merchant the merchant param
   */
  setMerchant(merchant){
    if (merchant) {
      this.validateMerchant(merchant);
      this.merchant = merchant;
    }
  }
  /**
   * The setter method for others info
   * @param {object} othersInfo the othersInfo param
   */
  setOthersInfo(othersInfo){
    if (othersInfo) {
      this.validateOthersInfo(othersInfo);
      this.othersInfo = othersInfo;
    }
  }
  /**
   * the validation method for the json othersInfo
   * @param {object} othersInfo the othersInfo param
   */
  validateOthersInfo(othersInfo) {
    if(!this.validation){
      return;
    }
    const facebook = ValidationForm.validateUrl(othersInfo.facebookLink);
    const youtube = ValidationForm.validateUrl(othersInfo.youtubeLink);
    const instagram = ValidationForm.validateUrl(othersInfo.instagramLink);
    const twitter = ValidationForm.validateUrl(othersInfo.twitterLink);

   
    const validation = { };
    const labels = { };
    const tip = { };
    let isValid = true;
    if(!facebook){
      validation.facebook = othersInfo.facebookLink;
      tip.facebook = TIPS_ERROR.URL;
      labels.facebook = 'facebook link';
      isValid = false;
    }
    if(!youtube){
      validation.youtube = othersInfo.youtubeLink;
      tip.youtube = TIPS_ERROR.URL;
      labels.youtube = 'youtube link';
      isValid = false;
    }
    if(!instagram){
      validation.instagram = othersInfo.instagramLink;
      tip.instagram = TIPS_ERROR.URL;
      labels.instagram = 'instagram link';
      isValid = false;
    }
    if(!twitter){
      validation.twitter = othersInfo.twitterLink;
      tip.twitter = TIPS_ERROR.URL;
      labels.twitter = 'twitter link';
      isValid = false;
    }
    if (!isValid) {
      throw new ApolloError(VALIDATION_ERROR.message, VALIDATION_ERROR.code, {
        data: {
          section: 'Logo, allegati e web',
          values: Object.values(validation).join(''),
          field: Object.values(labels).join(', '),
          tip: Object.values(tip).join(''),
        },
      });
    }
  }
  /**
   * the validation method for the json contactPerson
   * @param {object} contactPerson the contact person param
   */
  validateContactPerson(contactPerson) {
    if(!this.validation){
      return;
    }
    const email = ValidationForm.validateEmail(contactPerson.email);
    const secEmail = ValidationForm.validateEmail(contactPerson.secondaryEmail);
    // const phone = ValidationForm.validatePhoneNumber(contactPerson.phoneNumber);
    // const secPhone = ValidationForm.validatePhoneNumber(contactPerson.secondaryPhoneNumber);
    const validation = { };
    const labels = { };
    const tip = { };
    let isValid = true;
    // if(!secPhone){
    //   validation.secPhone = contactPerson.secondaryPhoneNumber;
    //   tip.secPhone = TIPS_ERROR.PHONE;
    //   labels.secPhone = 'telefono secondario';
    //   isValid = false;
    // }
    if(!email){
      validation.email = contactPerson.email;
      tip.email = TIPS_ERROR.EMAIL;
      labels.email = 'e-mail primaria';
      isValid = false;
    }
    if(!secEmail){
      validation.secEmail = contactPerson.secondaryEmail;
      tip.secEmail = TIPS_ERROR.EMAIL;
      labels.secEmail = 'e-mail secondaria';
      isValid = false;
    }
    // if(!phone){
    //   validation.phone = contactPerson.phoneNumber;
    //   tip.phone = TIPS_ERROR.PHONE;
    //   labels.phone = 'telefono primario';
    //   isValid = false;
    // }
    if (!isValid) {
      if(Object.values(validation) > 1) {
        throw new ApolloError(MULTIPLE_VALIDATION_ERROR.message, MULTIPLE_VALIDATION_ERROR.code, {
          data: {
            section: 'Contatti del referente dell\'ente per il portale WeMi',
            values: Object.values(validation).join(''),
            field: Object.values(labels).join(', '),
            tip: Object.values(tip).join(''),
          },
        });
      }
      throw new ApolloError(VALIDATION_ERROR.message, VALIDATION_ERROR.code, {
        data: {
          section: 'Contatti del referente dell\'ente per il portale WeMi',
          values: Object.values(validation).join(''),
          field: Object.values(labels).join(''),
          tip: Object.values(tip).join(''),
        },
      });
    }
  }
  /**
   * the validation method for the json paymentInfo
   * @param {object} paymentInfo the paymento info param
   */
  validatePaymentInfo(paymentInfo) {
    if(!this.validation){
      return;
    }
    const iban = ValidationForm.validateIban(paymentInfo.iban);
    const validation = { };
    const labels = { };
    const tip = { };
    let isValid = true;
    if(!iban){
      validation.iban = paymentInfo.iban;
      tip.iban = TIPS_ERROR.IBAN;
      labels.iban = 'IBAN';
      isValid = false;
    }
    if (!isValid) {
      if(Object.values(validation) > 1) {
        throw new ApolloError(MULTIPLE_VALIDATION_ERROR.message, MULTIPLE_VALIDATION_ERROR.code, {
          data: {
            section: 'Dati per pagamenti',
            values: Object.values(validation).join(''),
            field: Object.values(labels).join(', '),
            tip: Object.values(tip).join(''),
          },
        });
      }
      throw new ApolloError(VALIDATION_ERROR.message, VALIDATION_ERROR.code, {
        data: {
          section: 'Dati per pagamenti',
          values: Object.values(validation).join(''),
          field: Object.values(labels).join(''),
          tip: Object.values(tip).join(''),
        },
      });
    }
  }
  /**
   * The setter method for others info
   * @param {object} contactPerson the contact person param
   */
  setContactPerson(contactPerson) {
    if (contactPerson) {
      this.validateContactPerson(contactPerson);
      this.contactPerson = contactPerson;
    }
  }
   /**
    * The setter method for others info
    * @param {object} paymentInfo the payment info param
    */
  setPaymentInfo(paymentInfo) {
    if (paymentInfo) {
      this.validatePaymentInfo(paymentInfo);
      this.paymentInfo = paymentInfo;
    }
  }
  /**
   * the validation method for the json contactPerson
   * @param {object} citizenAvailability the contact person param
   */
  validateCitizenAvailability(citizenAvailability) {
    if(!this.validation){
      return;
    }
    const email = ValidationForm.validateEmail(citizenAvailability.email);
    // const phone = ValidationForm.validatePhoneNumber(citizenAvailability.phoneNumber);

    const validation = { };
    const labels = { };
    const tip = {};
    let isValid = true;
    
    if(!email){
      validation.email = citizenAvailability.email;
      labels.email = 'email';
      tip.email = TIPS_ERROR.EMAIL;
      isValid = false;
    }
   
    // if(!phone){
    //   validation.phone = citizenAvailability.phoneNumber;
    //   labels.phone = 'telefono';
    //   tip.phone = TIPS_ERROR.PHONE;
    //   isValid = false;
    // }
    if (!isValid) {
      if(Object.values(validation) > 1) {
        throw new ApolloError(MULTIPLE_VALIDATION_ERROR.message, MULTIPLE_VALIDATION_ERROR.code, {
          data: {
            section: 'Reperibilità per i cittadini',
            values: Object.values(validation).join(''),
            field: Object.values(labels).join(', '),
            tip: Object.values(tip).join(''),
          },
        });
      }
      throw new ApolloError(VALIDATION_ERROR.message, VALIDATION_ERROR.code, {
        data: {
          section: 'Reperibilità per i cittadini',
          values: Object.values(validation).join(''),
          field: Object.values(labels).join(''),
          tip: Object.values(tip).join(''),
        },
      });
    }
  }
  /**
   * The setter method for others info
   * @param {object} citizenAvailability the contact person param
   */
  setCitizenAvailability(citizenAvailability) {
    if (citizenAvailability) {
      this.validateCitizenAvailability(citizenAvailability);
      this.citizenAvailability = citizenAvailability;
    }
  }
  /**
   * The getter method for institution id
   * @returns {number} the identifier of the institution
   */
  getId() {
    return this.id;
  }
  /**
   * The getter method for institution full name
   * @returns {string} the full name of the institution
   */
  getFullname() {
    return this.fullname;
  }
  /**
   * The getter method for institution name
   * @returns {string} the name of the institution
   */
  getName() {
    return this.name;
  }
  /**
   * The getter method for institution vat number
   * @returns {string} the vat number of the institution
   */
  getVATNumber() {
    return this.vatNumber;
  }
  /**
   * The getter method for institution wemi spaces managed
   * @returns {object} the wemi spaces managed of the institution
   */
  getWeMiSpaces() {
    return this.weMiSpaces;
  }
  /**
   * The getter method for institution vat number
   * @returns {string} the vat number of the institution
   */
  getAdministratorEmail() {
    return this.administratorEmail;
  }
  /**
   * The getter method for institution state description
   * @returns {string} the state description of the institution
   */
  getStateDescription() {
    return this.stateDescription;
  }
  /**
   * The getter method for institution accreditation categories
   * @returns {object[]} the accreditation categories of the institution
   */
  getAccreditationCategories() {
    return this.accreditationCategories;
  }
  /**
   * The getter method for institution authorized operators
   * @returns {object[]} the authorized operators of the institution
   */
  getAuthorizedOperators() {
    return this.authorizedOperators;
  }
  /**
   * The getter method for institution authorized operators emails
   * @returns {string[]} the authorized operators of the institution emails
   */
  getAuthorizedOperatorsEmails() {
    return this.authorizedOperators.map(operator => operator.email);
  }
  /**
   * The setter method for institution authorized operators
   * @param {object[]} authorizedOperators array email operators
   * @param {string} authorizedOperators.email the email of the operator
   * @param {number} authorizedOperators.id the id of the operator (undefined if not present)
   */
  setAuthorizedOperators(authorizedOperators) {
    const copiedAuthorizedOperators = authorizedOperators || [];
    const newAuthorizedOperators = copiedAuthorizedOperators.slice();
    const errors = [];
    const mappedAuthorizedOperators = newAuthorizedOperators.map(operator => {
      const { email } = operator;
      const { id } = operator;
      if(this.validation){
        const emailValidation = ValidationForm.validateEmail(email);
        if(!emailValidation){
          errors.push({ email, id, message: 'Errore di validazione email operatore' });
        }
      }
      return ({
        ...operator,
        id: operator.id,
        email,
      });
    });
    if(errors.length > 0 ){
      const label = 'email';
      const tip = TIPS_ERROR.EMAIL;
      throw new ApolloError(VALIDATION_ERROR.message, VALIDATION_ERROR.code, { 
        data: {
          errors,
          field: label,
          tip,
          section: 'Operatori abilitati WeMi',
        },
      });
    }
    this.authorizedOperators = mappedAuthorizedOperators;
  }
  /**
   * The getter method for institution authorized operators to delete
   * @returns {object[]} the authorized operators of the institution to delete
   */
  getDeletedOperators() {
    return this.deletedOperators || [];
  }
  /**
   * The getter method for institution authorized operators to update
   * @returns {object[]} the authorized operators of the institution to update
   */
  getUpdatedOperators() {
    return this.updatedOperators || [];
  }
  /**
   * The getter method for institution merchant
   * @returns {object} the authorized operators of the institution to update
   */
  getMerchant() {
    return this.merchant;
  }
  /**
   * The getter method for institution primary office
   * @returns {object} the primary office
   */
  getPrimaryOffice() {
    return this.principalLocation || {};
  }
  /**
   * The getter method for institution secondary offices
   * @returns {object} the secondary offices
   */
  getSecondaryOffices() {
    return this.locations || [];
  }
  /**
   * Maps the secondary locations info to db
   * @returns {object} the json to save in db
   */
  mapSecondaryOffices() {
    if(!this.locations){
      return [];
    }
    const secondaryOffices = this.locations.map((location) => {
      if (!location.address) {
        return location;
      }
      const mappedLocation = location;
      const { address } = location;
      mappedLocation.address = {
        txCAP: address.cap,
        txCitta: address.citta,
        txProvincia: address.provincia,
        txIndirizzo: address.indirizzo,
      };
      return mappedLocation;
    });
    return secondaryOffices;
  }
  /**
   * Maps the others info to db
   * @returns {object} the json to save in db
   */
  mapOthersInfo(){
    if(this.othersInfo){
      return {
        fgDisponibileVolontari: this.othersInfo.volunteerAvailability,
        fgDisponibileWelfare: this.othersInfo.welfareAvailability,
        txFacebook: this.othersInfo.facebookLink,
        txWeb: this.othersInfo.webLink,
        txYoutube: this.othersInfo.youtubeLink,
        txInstagram: this.othersInfo.instagramLink,
        txTwitter: this.othersInfo.twitterLink,
      };
    }
  }
  /**
   * Maps the description to db
   * @returns {object} the json to save in db
   */
  mapDescription(){
    if(this.description){
      return {
        it: this.description,
      };
    }
  }
  /**
   * Maps the contactPerson to db
   * @returns {object} the json to save in db
   */
  mapContactPerson(){
    if(this.contactPerson){
      return {
        txReferente: this.contactPerson.name,
        txEmail: this.contactPerson.email,
        txEmailSecondaria: this.contactPerson.secondaryEmail,
        txTelefono: this.contactPerson.phoneNumber,
        txTelefonoSecondario: this.contactPerson.secondaryPhoneNumber,
      };
    }
  }
  /**
   * Maps the citizenAvailability to db
   * @returns {object} the json to save in db
   */
  mapCitizenAvailability(){
    if(this.citizenAvailability){
      return {
        txEmail: this.citizenAvailability.email,
        txTelefono: this.citizenAvailability.phoneNumber,
        disponibilitaDiContatto: this.citizenAvailability.contactAvailability,
      };
    }
  }
  /**
   * Maps the paymentInfo to db
   * @returns {object} the json to save in db
   */
  mapPaymentInfo(){
    if(this.paymentInfo){
      return {
        cdIBAN: this.paymentInfo.iban,
        txIntestatarioConto: this.paymentInfo.accountHolder,
        txBanca: this.paymentInfo.bankName,
        txFiliale: this.paymentInfo.branchDescription,
      };
    }
  }

}