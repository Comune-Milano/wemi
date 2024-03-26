import { isUndefined } from 'util';
import moment from 'moment';
import { logger } from 'utility/logger/getInstance';
import { isYoung } from 'utility/isYoung';

/**
 * Class to define User Profile to return to the client 
 * 
 */
class User {
  /**
   * The constructor of the class
   * @param {object} dbUser the user from db
   * @param {number} dbUser.id_utente the id of the user
   * @param {string} dbUser.cd_profilo_utente the id of the user
   * @param {boolean} dbUser.fg_accettazione_privacy_wemi the id of the user
   * @param {string} dbUser.ptx_codice_fiscale the id of the user
   * @param {string} dbUser.ptx_username the id of the user
   * @param {string} dbUser.ptx_codana the id of the user
   * @param {string} dbUser.ty_operatore_ente the id of the user
   * @param {string} dbUser.fg_lavoratore the id of the user
   * @param {string} dbUser.ptx_email the id of the user
   * @param {string} dbUser.tx_nome_utente the id of the user
   * @param {string} dbUser.tx_cognome_utente the id of the user
   * @param {string} dbUser.cd_sesso_utente the id of the user
   * @param {Date} dbUser.dt_nascita the id of the user
   * @param {object} dbUser.js_anagrafica_residenza the id of the user
   */
  constructor(dbUser = {}) {
    const {
      id_utente,
      cd_profilo_utente,
      fg_accettazione_privacy_wemi,
      ptx_codice_fiscale,
      ptx_username,
      ptx_codana,
      ty_operatore_ente,
      fg_lavoratore,
      ptx_email,
      tx_nome_utente,
      tx_cognome_utente,
      dt_nascita,
      // cd_sesso_utente,
      js_anagrafica_residenza,
    } = dbUser;

    this.setIdUtente(id_utente);
    this.setProfile(cd_profilo_utente);
    this.setPrivacy(fg_accettazione_privacy_wemi);
    this.setFiscalCode(ptx_codice_fiscale);
    this.setUsername(ptx_username);
    this.setCodana(ptx_codana);
    this.setOperatoreEnte(ty_operatore_ente);
    this.setFlagLavoratore(fg_lavoratore);
    this.setEmail(ptx_email);
    this.setName(tx_nome_utente);
    this.setSurname(tx_cognome_utente);
    // this.setGender(cd_sesso_utente);
    this.setBirthday(dt_nascita);
    this.setPersonalData(js_anagrafica_residenza);
  }
  /**
   * The getter for codana
   * @returns {string} the codana
   */
  getCodana() {
    return this.codana;
  }
  /**
   * The setter for codana
   * @param {string} codana the codana
   */
  setCodana(codana) {
    this.codana = codana;
  }
  /**
   * The getter for group
   * @returns {object[]} the group
   */
  getGroup() {
    return this.group;
  }
  /**
   * The setter for group
   * @param {object} group the group
   */
  setGroup(group) {
    this.group = group;
  }
  /**
   * The getter for idEnte
   * @returns {number} the idEnte
   */
  getIdEnte() {
    return this.idEnte;
  }
  /**
   * The setter for id ente
   * @param {number} idEnte the id ente
   */
  setIdEnte(idEnte) {
    this.idEnte = idEnte;
  }
  /**
   * The getter for token
   * @returns {string} the token
   */
  getToken() {
    return this.personalData.token;
  }
  /**
   * The setter for token
   * @param {string} token the token
   */
  setToken(token) {
    if (isUndefined(this.personalData)) {
      this.personalData = {};
    }
    this.personalData.token = token;
  }
  /**
   * The getter for profile
   * @returns {string} the profile
   */
  getProfile() {
    return this.profile;
  }
  /**
   * The setter for profile
   * @param {string} profile the profile
   */
  setProfile(profile = '') {
    this.profile = profile;
  }
  /**
   * The getter for user id
   * @returns {number} the user id
   */
  getIdUtente() {
    return this.idUtente;
  }
  /**
   * The setter for idUtente
   * @param {number} idUtente the idUtente
   */
  setIdUtente(idUtente) {
    if (typeof idUtente !== 'number') {
      try {
        this.idUtente = parseInt(idUtente);
      }
      catch (error) {
        logger.error({ idUtente }, 'setIdUtente - Cannot set user id since it is not a number');
      }
    }
    else {
      this.idUtente = idUtente;
    }
  }
  /**
   * The getter for privacy
   * @returns {boolean} the privacy
   */
  getPrivacy() {
    return this.privacy;
  }
  /**
   * The setter for privacy
   * @param {boolean} privacy the privacy
   */
  setPrivacy(privacy) {
    this.privacy = privacy;
  }
  /**
   * The getter for personal data
   * @returns {object} the personal data
   */
  getPersonalData() {
    return this.personalData;
  }
  /**
   * The setter for personalData
   * @param {object} personalData the personalData
   */
  setPersonalData(personalData) {
    this.personalData = personalData;
  }
  /**
   * The getter for birthday
   * @returns {Date} the birthday
   */
  getBirthday() {
    return this.birthday;
  }
  /**
   * The setter for birthday
   * @param {Date} birthday the birthday
   */
  setBirthday(birthday) {
    const birthdayMoment = birthday ? moment(birthday) : undefined;
    this.birthday = birthdayMoment;
    this.isYoung = isYoung(birthday);
    // new Date(birthday.replace(
    //   /^(\d{4})(\d\d)(\d\d)(\d\d)(\d\d)(\d\d)$/,
    //   '$4:$5:$6 $2/$3/$1'
    // ));
  }
  /**
   * The getter for type of user
   * @returns {string} the type of user
   */
  getOperatoreEnte() {
    return this.operatoreEnte;
  }

  /**
   * The setter for operator Ente
   * @param {string} opEnte the operator Ente
   */
  setOperatoreEnte(opEnte) {
    this.operatoreEnte = opEnte;
  }
  /**
   * The getter for gender
   * @returns {string} the gender
   */
  getGender() {
    return this.gender;
  }
  /**
   * The setter for gender
   * @param {string} gender the gender
   */
  setGender(gender) {
    if (gender === 1) {
      //Female
      this.gender = 1;
    }
    else if (gender === 2) {
      this.gender = 2;
    }
    return;    
  }
  /**
   * The getter for email
   * @returns {string} the email
   */
  getEmail() {
    return this.email;
  }
  /**
   * The setter for email
   * @param {string} email the email
   */
  setEmail(email = '') {
    this.email = email;
  }
  /**
   * The getter for username
   * @returns {string} the username
   */
  getUsername() {
    return this.username;
  }
  /**
   * The setter for username
   * @param {string} username the username
   */
  setUsername(username = '') {
    this.username = username;
  }
  /**
   * The getter for name
   * @returns {string} the name
   */
  getName() {
    return this.name;
  }
  /**
   * The setter for name
   * @param {string} name the name
   */
  setName(name = '') {
    this.name = name;
  }
  /**
   * The getter for surname
   * @returns {string} the surname
   */
  getSurname() {
    return this.surname;
  }
  /**
   * The setter for surname
   * @param {string} surname the surname
   */
  setSurname(surname = '') {
    this.surname = surname;
  }
  /**
   * The getter for fiscal code
   * @returns {string} the fiscal code
   */
  getFiscalCode() {
    return this.fiscalCode;
  }
  /**
   * The setter for fiscal Code
   * @param {string} fiscalCode the fiscal Code
   */
  setFiscalCode(fiscalCode = '') {
    this.fiscalCode = fiscalCode;
  }
  /**
   * The getter for address
   * @returns {string} the address
   */
  getAddress() {
    return this.address;
  }
  /**
   * The setter for address
   * @param {string} address the address
   */
  setAddress(address) {
    this.address = address;
  }
  /**
   * The getter for flag lavoratore
   * @returns {string} the flag lavoratore
   */
  getFlagLavoratore() {
    return this.flag;
  }
  /**
   * The setter for flag lavoratore
   * @param {string} flag the flag lavoratore
   */
  setFlagLavoratore(flag) {
    this.flag = flag;
  }
}

export default User;
