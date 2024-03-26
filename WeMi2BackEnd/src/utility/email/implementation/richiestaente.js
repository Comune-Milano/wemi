import { SendEmail } from "../sendemail";
import { EmailSender } from "../emailsender";
import EmailWeMiDAO from "dao/emailwemi/emailwemiDAO";
import RichiestaEnteDAO from "dao/richiestaente/richiestaEnteDAO";
import { FRONTEND } from "constants/constants";
import { TEMPLATE_STAFF_WEMI_WITH_BUTTON, TEMPLATE_ENTE_WITH_BUTTON, TEMPLATE_STAFF_WEMI_WITH_BUTTON_WITHOUT_CONTATTI } from "constants/templates/template_name";
import { findTemplateInfo } from "sql/emailwemi/selezione";
import { findEnteInfoEmail } from "sql/ente/selezione";
import { findUserByIdRequest } from "sql/richiestatcb/selezione";
import { logger } from "utility/logger/getInstance";

export class EmailSenderRichiestaEnte extends SendEmail {
  /**
 * It sends an email to the user from ente with button
 * @param {Int} idRichiestaEnte
 * @param {String} template 
 * @param {String} buttonValue the value of the button in the email
 * @param {String} relativeUrl the path to link the user on the WeMi app relative
 */
  async sendEmailEnteWithButton(idRichiestaEnte, template = '', buttonValue = 'Vedi Richiesta', relativeUrl = '/r/idRequestsIndex') {
    const database = this.db;

    let dati = {};
    const emailWeMiDAO = new EmailWeMiDAO(database);
    const datiWeMi = await emailWeMiDAO.findWeMiBaseInfo();
    const logoNavbar = await emailWeMiDAO.findLogoHeaderEmail();
    const richiestaEnteDAO = new RichiestaEnteDAO(database);
    const datiUtente = await richiestaEnteDAO.findUserByIdRichiesta(idRichiestaEnte);
    datiUtente.nomeDestinatario = datiUtente.tx_nome_utente;
    datiUtente.cognomeDestinatario = datiUtente.tx_cognome_utente;
    datiUtente.username = datiUtente.ptx_username;

    //const idServizio = await richiestaEnteDAO.findIdServizioByIdRichiesta(idRichiestaEnte);
    //dati.idServizio= idServizio.id_servizio_riferimento;
    const idRichiestaBase = await richiestaEnteDAO.findIdRichiestaBase(idRichiestaEnte);
    dati.idServizio = idRichiestaBase.id_richiesta_servizio_base;

    const dbTemplateKeys = this.mapTemplate(template);

    /**
     * Nei dao
     */

    const risultatoEnte = await this.db.one(findEnteInfoEmail, { idRichiestaEnte });
    logger.trace("risultatoEnte", risultatoEnte);
    dati.idRichiesta = risultatoEnte.idRichiestaBase;

    const logoFileEnte= await emailWeMiDAO.findLogoFileEnte(risultatoEnte.id_ente);
    logger.trace("logoFileEnte", logoFileEnte);
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
    const jsonParameters = { ...logoNavbar, ...dati, ...datiUtente, ...datiWeMi, ...risultatoEnte, ...logoFileEnte };
    logger.trace(jsonParameters, 'json parameters');
    const senderEmail = new EmailSender(jsonParameters, fileHtml, template, { templatesDBValues: risultato, templatesHTMLKeys: this.replaceTemplate });
    return await senderEmail.send(datiWeMi.emailWeMi, datiUtente.ptx_email);
  }

  /**
   * It sends an email to the user from wemi staff with button
   * @param {Int} idRichiestaEnte 
   * @param {String} template 
   * @param {String} buttonValue the value of the button in the email
   * @param {String} relativeUrl the path to link the user on the WeMi app relative
   */
  async sendEmailFromStaffWeMiWithButton(idRichiestaEnte, template = '', buttonValue = 'Vedi Richiesta', relativeUrl = '/r/idRequestsIndex') {
    const database = this.db;
    let dati = {};
    const richiestaBase = await this.db.one(findUserByIdRequest, { id_richiesta_servizio_ente: idRichiestaEnte });

    dati.idRichiesta = richiestaBase.id_richiesta_servizio_base;
    const emailWeMiDAO = new EmailWeMiDAO(database);
    const datiWeMi = await emailWeMiDAO.findWeMiBaseInfo();
    const logoNavbar = await emailWeMiDAO.findLogoHeaderEmail();
    const richiestaEnteDAO = new RichiestaEnteDAO(database);
    const datiUtente = await richiestaEnteDAO.findUserByIdRichiesta(idRichiestaEnte);
    datiUtente.nomeDestinatario = datiUtente.tx_nome_utente;
    datiUtente.cognomeDestinatario = datiUtente.tx_cognome_utente;

    const dbTemplateKeys = this.mapTemplate(template);

    const LogoFileWeMi = await emailWeMiDAO.findLogoFileWeMi();
    logger.trace("LogoFileWeMi", LogoFileWeMi)
    const contatti= await emailWeMiDAO.findContatti();

    const nomeServizio = await richiestaEnteDAO.findNomeServizioByIdRichiesta(idRichiestaEnte);
    dati.nomeServizio = nomeServizio ? nomeServizio.tl_testo_1.it : null;

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

    const  fileHtml = 'html/' + TEMPLATE_STAFF_WEMI_WITH_BUTTON + '.html';
  
    const senderEmail = new EmailSender({ ...logoNavbar, ...dati, ...datiUtente, ...datiWeMi, ...LogoFileWeMi, ...contatti }, fileHtml, template, { templatesDBValues: risultato, templatesHTMLKeys: this.replaceTemplate });
    return await senderEmail.send(datiWeMi.emailWeMi, datiUtente.ptx_email);
  }

  async sendEmailFromStaffWeMiWithButtonWithoutContatti(idRichiestaEnte, template = '', buttonValue = 'Vedi Richiesta', relativeUrl = '/r/idRequestsIndex', WITHOUT_CONTATTI) {
    const database = this.db;
    let dati = {};
    const richiestaBase = await this.db.one(findUserByIdRequest, { id_richiesta_servizio_ente: idRichiestaEnte });

    dati.idRichiesta = richiestaBase.id_richiesta_servizio_base;
    const emailWeMiDAO = new EmailWeMiDAO(database);
    const datiWeMi = await emailWeMiDAO.findWeMiBaseInfo();
    const logoNavbar = await emailWeMiDAO.findLogoHeaderEmail();
    logger.trace("logoNavbar", logoNavbar)
    const richiestaEnteDAO = new RichiestaEnteDAO(database);
    const datiUtente = await richiestaEnteDAO.findUserByIdRichiesta(idRichiestaEnte);
    datiUtente.nomeDestinatario = datiUtente.tx_nome_utente;
    datiUtente.cognomeDestinatario = datiUtente.tx_cognome_utente;

    const dbTemplateKeys = this.mapTemplate(template);

    const LogoFileWeMi = await emailWeMiDAO.findLogoFileWeMi();
    logger.trace("LogoFileWeMi", LogoFileWeMi)
    const nomeServizio = await richiestaEnteDAO.findNomeServizioByIdRichiesta(idRichiestaEnte);
    dati.nomeServizio = nomeServizio ? nomeServizio.tl_testo_1.it : null;

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

     const fileHtml = 'html/' + TEMPLATE_STAFF_WEMI_WITH_BUTTON_WITHOUT_CONTATTI + '.html';
  
    const senderEmail = new EmailSender({ ...logoNavbar, ...dati, ...datiUtente, ...datiWeMi, ...LogoFileWeMi }, fileHtml, template, { templatesDBValues: risultato, templatesHTMLKeys: this.replaceTemplate });
    return await senderEmail.send(datiWeMi.emailWeMi, datiUtente.ptx_email);
  }

}
