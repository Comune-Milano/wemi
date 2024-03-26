import { EmailSender } from "./emailsender";
import { findUserByIdRequest, findServiceByIdRequestSql } from '../../sql/richiestatcb/selezione';
import RichiestaEnteDAO from "../../dao/richiestaente/richiestaEnteDAO";
import EmailWeMiDAO from "../../dao/emailwemi/emailwemiDAO";
import { FRONTEND } from "../../constants/constants";
import { TEMPLATE_STAFF_WEMI_WITH_BUTTON, TEMPLATE_STAFF_WEMI_WITHOUT_BUTTON, TEMPLATE_ENTE_WITH_BUTTON } from "../../constants/templates/template_name";
import { findEnteInfoEmail } from "../../sql/ente/selezione";
import { findTemplateInfo } from "../../sql/emailwemi/selezione";
import UserDAO from "../../dao/utente/UtenteDAO";
import { findUserInfoByIdWorker } from "sql/utenteoffertalav/selezione";
import { findUserInfoByIdRequestTCB } from "sql/valattributodomanda/selezione";
import { CITTADINO } from "constants/usercode";
import { logger } from "utility/logger/getInstance";

export class SendEmail {
  /**
   * 
   * @param {Object} db 
   */
  constructor(db) {
    this.db = db;
    this.replaceTemplate = ['HEADER', 'BODY', 'SIGN', 'FOOTER', 'SUBJECT'];
  }

  mapTemplate(template) {
    const dbTemplateKeys = [];

    for (const key of this.replaceTemplate) {
      const element = template + '_' + key;
      dbTemplateKeys.push(element);
    }
    return dbTemplateKeys;

  }

  async sendEmailToAdmins(idRichiestaEnte, template = '') {
    const dati = {};
    const richiestaBase = await this.db.one(findUserByIdRequest, { id_richiesta_servizio_ente: idRichiestaEnte });

    dati.idRichiesta = richiestaBase.id_richiesta_servizio_base;
    const database = this.db;
    const emailWeMiDAO = new EmailWeMiDAO(database);
    const datiWeMi = await emailWeMiDAO.findWeMiBaseInfo();
    const richiestaEnteDAO = new RichiestaEnteDAO(database);
    const datiUtente = await richiestaEnteDAO.findUserByIdRichiesta(idRichiestaEnte);
    datiUtente.nomeDestinatario = datiUtente.tx_nome_utente;
    datiUtente.cognomeDestinatario = datiUtente.tx_cognome_utente;
    datiUtente.username = datiUtente.ptx_username;

    const dataAnnullamento = new Date().toLocaleDateString();

    const dbTemplateKeys = this.mapTemplate(template);

    const contatti = await emailWeMiDAO.findContatti();

    /**
     * Searching the right template values with the dao 
     * Spostare in dao parametro generale
     */
    const risultato = await this.db.many(findTemplateInfo, { dbTemplateKeys });
    /**
     * TODO trovare email degli amministratore wemi
     */
    const utenteDao = new UserDAO(database);
    const administrators = await utenteDao.findAllAdminUsers();
    const fileHtmlAdmin = 'html/' + TEMPLATE_STAFF_WEMI_WITHOUT_BUTTON + '.html';
    const senderAdminEmail = new EmailSender({ ...dati, ...datiUtente, ...datiWeMi, dataAnnullamento, ...contatti }, fileHtmlAdmin, template, { templatesDBValues: risultato, templatesHTMLKeys: this.replaceTemplate });
    /**
     * Sending the email to all found administrators
     */
    let invioEmail;
    for (const administrator of administrators) {
      invioEmail = await senderAdminEmail.send(datiWeMi.emailWeMi, administrator.ptx_email);
      if (!invioEmail) {
        break;
      }
    }
    return invioEmail;
  }
  async sendEmailToAdmin(idRichiestaEnte, template = '', senderEmail) {
    const dati = {};
    const richiestaBase = await this.db.one(findUserByIdRequest, { id_richiesta_servizio_ente: idRichiestaEnte });

    dati.idRichiesta = richiestaBase.id_richiesta_servizio_base;
    const database = this.db;
    const emailWeMiDAO = new EmailWeMiDAO(database);
    const datiWeMi = await emailWeMiDAO.findWeMiBaseInfo();
    const richiestaEnteDAO = new RichiestaEnteDAO(database);
    const datiUtente = await richiestaEnteDAO.findUserByIdRichiesta(idRichiestaEnte);
    datiUtente.nomeDestinatario = datiUtente.tx_nome_utente;
    datiUtente.cognomeDestinatario = datiUtente.tx_cognome_utente;
    datiUtente.username = datiUtente.ptx_username;

    const dataAnnullamento = new Date().toLocaleDateString();

    const dbTemplateKeys = this.mapTemplate(template);

    const contatti = await emailWeMiDAO.findContatti();

    /**
     * Searching the right template values with the dao 
     * Spostare in dao parametro generale
     */
    const risultato = await this.db.many(findTemplateInfo, { dbTemplateKeys });
    /**
     * TODO trovare email degli amministratore wemi
     */
    const utenteDao = new UserDAO(database);
    const administrators = await utenteDao.findAllAdminUsers();
    const fileHtmlAdmin = 'html/' + TEMPLATE_STAFF_WEMI_WITHOUT_BUTTON + '.html';
    const senderAdminEmail = new EmailSender({ ...dati, ...datiUtente, ...datiWeMi, dataAnnullamento, ...contatti }, fileHtmlAdmin, template, { templatesDBValues: risultato, templatesHTMLKeys: this.replaceTemplate });
    /**
     * Sending the email to "MAIL_WEMI" from "senderEmail" 
     */

    const invioEmail = await senderAdminEmail.send(senderEmail, datiWeMi.emailWeMi);

    return invioEmail;
  }
  /**
    * It sends an email to the user from wemi staff with button
    * @param {Int} idRichiestaEnte 
    * @param {String} template 
    * @param {String} buttonValue the value of the button in the email
    * @param {String} relativeUrl the path to link the user on the WeMi app relative
    */
  async sendEmailFromStaffWeMi(idRichiestaEnte, template = '', buttonValue = 'Vedi Richiesta', relativeUrl = '/r/idRequestsIndex', role = CITTADINO) {
    const database = this.db;
    let dati = {};

    const richiestaBase = await this.db.one(findUserByIdRequest, { id_richiesta_servizio_ente: idRichiestaEnte });
    const servizio = await this.db.oneOrNone(findServiceByIdRequestSql, { id_richiesta_servizio_ente: idRichiestaEnte });
    dati.idRichiesta = richiestaBase.id_richiesta_servizio_base;
    dati.nomeServizio = servizio.tx_tags_ricerca;

    if (dati.nomeServizio.toUpperCase() === 'TATA') {
      dati.nomeServizio = 'Baby-Sitter';
    };

    const emailWeMiDAO = new EmailWeMiDAO(database);
    const datiWeMi = await emailWeMiDAO.findWeMiBaseInfo();
    const richiestaEnteDAO = new RichiestaEnteDAO(database);
    let datiUtente;
    if (role === CITTADINO) {
      datiUtente = await richiestaEnteDAO.findUserByIdRichiesta(idRichiestaEnte);
      datiUtente.nomeDestinatario = datiUtente.tx_nome_utente;
      datiUtente.cognomeDestinatario = datiUtente.tx_cognome_utente;
      datiUtente.username = datiUtente.ptx_username;
    }

    else {
      datiUtente = await richiestaEnteDAO.findEnteInfoByIdRichiesta(idRichiestaEnte);
      datiUtente.nomeDestinatario = datiUtente.tx_nome_utente;
      datiUtente.cognomeDestinatario = datiUtente.tx_cognome_utente;
      datiUtente.username = datiUtente.ptx_username;
      datiUtente.ptx_email = datiUtente.email;
    }

    const contatti = await emailWeMiDAO.findContatti();
    const dbTemplateKeys = this.mapTemplate(template);
    /**
     * Searching the right template values with the dao 
     * Spostare in dao parametro generale
     */
    const risultato = await this.db.many(findTemplateInfo, { dbTemplateKeys });

    /**
     * Sending the email to the user
     */

    dati.nomeBottone = buttonValue;
    dati.urlLinkFunzionale = FRONTEND + relativeUrl;

    const fileHtml = 'html/' + TEMPLATE_STAFF_WEMI_WITH_BUTTON + '.html';
    const senderEmail = new EmailSender({ ...dati, ...datiUtente, ...datiWeMi, ...contatti }, fileHtml, template, { templatesDBValues: risultato, templatesHTMLKeys: this.replaceTemplate });
    return await senderEmail.send(datiWeMi.emailWeMi, datiUtente.ptx_email);
  }

  /**
   * It sends an email to the user from ente with button
   * @param {Int} idRichiestaEnte 
   * @param {String} template 
   * @param {String} buttonValue the value of the button in the email
   * @param {String} relativeUrl the path to link the user on the WeMi app relative
   */
  async sendEmailFromEnte(idRichiestaEnte, template = '', buttonValue = 'Vedi Richiesta', relativeUrl = '/r/idRequestsIndex') {
    const database = this.db;
    let dati = {};
    const emailWeMiDAO = new EmailWeMiDAO(database);
    const datiWeMi = await emailWeMiDAO.findWeMiBaseInfo();
    const richiestaEnteDAO = new RichiestaEnteDAO(database);
    const datiUtente = await richiestaEnteDAO.findUserByIdRichiesta(idRichiestaEnte);
    datiUtente.nomeDestinatario = datiUtente.tx_nome_utente;
    datiUtente.cognomeDestinatario = datiUtente.tx_cognome_utente;
    datiUtente.username = datiUtente.ptx_username;

    const dbTemplateKeys = this.mapTemplate(template);

    /**
     * Nei dao
     */

    const risultatoEnte = await this.db.one(findEnteInfoEmail, { idRichiestaEnte });
    logger.trace("risultatoEnte", risultatoEnte)
    dati.idRichiesta = risultatoEnte.idRichiestaBase;
    
    const logoFileEnte= await emailWeMiDAO.findLogoFileEnte(risultatoEnte.id_ente);
    logger.trace("logoFileEnte", logoFileEnte)
    /**
     * Searching the right template values with the dao 
     * Spostare in dao parametro generale
     */

    const risultato = await this.db.many(findTemplateInfo, { dbTemplateKeys });

    /**
     * Sending the email to the user
     */

    dati.nomeBottone = buttonValue;
    dati.urlLinkFunzionale = FRONTEND + relativeUrl;

    const fileHtml = 'html/' + TEMPLATE_ENTE_WITH_BUTTON + '.html';
    const senderEmail = new EmailSender({ ...dati, ...datiUtente, ...datiWeMi, ...risultatoEnte, ...logoFileEnte }, fileHtml, template, { templatesDBValues: risultato, templatesHTMLKeys: this.replaceTemplate });
    return await senderEmail.send(datiWeMi.emailWeMi, datiUtente.ptx_email);
  }

  async sendEmailForCandidacyRequest(idLavoratore, template = '', buttonValue = 'Vedi Richiesta', relativeUrl = '') {

    const database = this.db;
    const dati = {};
    const emailWeMiDAO = new EmailWeMiDAO(database);

    const datiWeMi = await emailWeMiDAO.findWeMiBaseInfo();

    const datiUtente = await database.one(findUserInfoByIdWorker, { idLavoratore });

    datiUtente.nomeDestinatario = datiUtente.nome;
    datiUtente.cognomeDestinatario = datiUtente.cognome;
    datiUtente.username = datiUtente.ptx_username;

    const dbTemplateKeys = this.mapTemplate(template);
    const contatti = await emailWeMiDAO.findContatti();
    /**
     * Searching the right template values with the dao 
     * Spostare in dao parametro generale
     */
    const risultato = await this.db.many(findTemplateInfo, { dbTemplateKeys });

    /**
     * Sending the email to the user
     */

    dati.nomeBottone = buttonValue;
    dati.urlLinkFunzionale = FRONTEND + relativeUrl;

    const fileHtml = 'html/' + TEMPLATE_STAFF_WEMI_WITH_BUTTON + '.html';
    const senderEmail = new EmailSender({ ...dati, ...datiUtente, ...datiWeMi, ...contatti }, fileHtml, template, { templatesDBValues: risultato, templatesHTMLKeys: this.replaceTemplate });
    return await senderEmail.send(datiWeMi.emailWeMi, datiUtente.ptxEmail);
  }

  async sendEmailForRequestTCB(idRichiestaTcb, template = '', buttonValue = 'Vedi Richiesta', relativeUrl = ''){
    
    const database = this.db;
    let dati = {};
    const richiestaBase = await this.db.one( findUserByIdRequest, { id_richiesta_servizio_ente: idRichiestaTcb} );

    dati.idRichiesta = richiestaBase.id_richiesta_servizio_base;
    const emailWeMiDAO = new EmailWeMiDAO(database);
    const datiWeMi = await emailWeMiDAO.findWeMiBaseInfo();
    const datiUtente = await database.one(findUserInfoByIdRequestTCB, { idRichiestaTcb });

    datiUtente.nomeDestinatario = datiUtente.nome;
    datiUtente.cognomeDestinatario = datiUtente.cognome;
    datiUtente.username = datiUtente.ptx_username;

    const dbTemplateKeys = this.mapTemplate(template);
    const contatti= await emailWeMiDAO.findContatti();
    /**
     * Searching the right template values with the dao 
     * Spostare in dao parametro generale
     */
    const risultato = await this.db.many(findTemplateInfo, { dbTemplateKeys });
    logger.trace(risultato);

    /**
     * Sending the email to the user
     */
    
    dati.nomeBottone = buttonValue;
    dati.urlLinkFunzionale = FRONTEND + relativeUrl;

    
    const fileHtml = 'html/'+ TEMPLATE_STAFF_WEMI_WITH_BUTTON +'.html';
    const senderEmail = new EmailSender({ ...dati, ...datiUtente, ...datiWeMi, ...contatti }, fileHtml, template, { templatesDBValues: risultato, templatesHTMLKeys: this.replaceTemplate  });
    return await senderEmail.send(datiWeMi.emailWeMi, datiUtente.ptxEmail);
  }
}