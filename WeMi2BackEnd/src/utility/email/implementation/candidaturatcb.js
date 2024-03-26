import { SendEmail } from "../sendemail";
import { EmailSender } from "../emailsender";
import EmailWeMiDAO from "dao/emailwemi/emailwemiDAO";
import { FRONTEND } from "constants/constants";
import { TEMPLATE_STAFF_WEMI_WITH_BUTTON } from "constants/templates/template_name";
import { findTemplateInfo } from "sql/emailwemi/selezione";
import { isNumber } from "util";
import { logger } from "utility/logger/getInstance";

export class EmailSenderCandidatura extends SendEmail {
  /**
   * 
   * @param {Int} idLavoratore 
   * @param {String} template 
   * @param {String} buttonValue 
   * @param {String} relativeUrl 
   */
  async sendEmailFromStaffWeMiWithButton(idLavoratore, template = '', buttonValue = 'Vedi Candidatura', relativeUrl = '') {
    const database = this.db;

    const dati = {};
    const emailWeMiDAO = new EmailWeMiDAO(database);

    const datiWeMi = await emailWeMiDAO.findWeMiBaseInfo();
    const logoNavbar = await emailWeMiDAO.findLogoHeaderEmail();
    logger.trace("logoNavbar", logoNavbar);
    const datiUtente = await emailWeMiDAO.findUserInfo(idLavoratore);

    const logoFileWeMi = await emailWeMiDAO.findLogoFileWeMi();
    logger.trace("logoFileWeMi", logoFileWeMi);
    datiUtente.nomeDestinatario = datiUtente.nome;
    datiUtente.cognomeDestinatario = datiUtente.cognome;

    const dbTemplateKeys = this.mapTemplate(template);
    const contatti = await emailWeMiDAO.findContatti();
    logger.trace("contatti", contatti);
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
    dati.idRichiesta = idLavoratore;
    dati.idCandidatura = idLavoratore;


    let serviziCandidati;
    if (isNumber(idLavoratore)) {
      serviziCandidati = await emailWeMiDAO.findServiziCandidatoByIdLavoratore(idLavoratore);
      const serviziCorretti = serviziCandidati.map(ele => {
        if (ele.toUpperCase() === 'TATA') {
          return 'Baby-Sitter';
        } else {
          return ele;
        }
      });
      dati.nomeServizio = serviziCorretti.join(', ');
    }

    const fileHtml = 'html/' + TEMPLATE_STAFF_WEMI_WITH_BUTTON + '.html';

    const senderEmail = new EmailSender({ ...logoNavbar, ...dati, ...datiUtente, ...datiWeMi, ...logoFileWeMi, ...contatti }, fileHtml, template, { templatesDBValues: risultato, templatesHTMLKeys: this.replaceTemplate });

    return await senderEmail.send(datiWeMi.emailWeMi, datiUtente.ptxEmail);
  }

}