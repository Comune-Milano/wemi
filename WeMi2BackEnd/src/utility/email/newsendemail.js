import { EmailSender } from "./emailsender";
import { findUserByIdRequest } from '../../sql/richiestatcb/selezione';
import RichiestaEnteDAO from "../../dao/richiestaente/richiestaEnteDAO";
import EmailWeMiDAO from "../../dao/emailwemi/emailwemiDAO";
import { FRONTEND } from "../../constants/constants";
import { TEMPLATE_STAFF_WEMI_WITH_BUTTON, TEMPLATE_STAFF_WEMI_WITHOUT_BUTTON, TEMPLATE_ENTE_WITH_BUTTON } from "../../constants/templates/template_name";
import { findEnteInfoEmail } from "../../sql/ente/selezione";
import { findTemplateInfo } from "../../sql/emailwemi/selezione";
import UserDAO from "../../dao/utente/UtenteDAO";
import { findUserInfoByIdWorker } from "sql/utenteoffertalav/selezione";
import { findUserInfoByIdRequestTCB } from "sql/valattributodomanda/selezione";

export class SendEmail{
  /**
   * 
   * @param {Object} db 
   */
  constructor(db){
    this.db = db;
    this.replaceTemplate =  ['HEADER', 'BODY', 'SIGN', 'FOOTER', 'SUBJECT'];
  }

  mapTemplate(template){
    const dbTemplateKeys = [];
    
    for(const key of this.replaceTemplate){
        const element =  template + '_' +key;
        dbTemplateKeys.push(element);
    }
    return dbTemplateKeys;

  }

  async sendEmailEnteWithButton(){

  }

  async sendEmailEnteWithoutButton(){

  }

  async sendEmailFromStaffWeMiWithButton(){

  }

  async sendEmailFromStaffWeMiWithoutButton(){

  }
}