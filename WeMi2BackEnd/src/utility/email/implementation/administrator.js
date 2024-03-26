import { SendEmail } from "../sendemail";
import { EmailSender } from "../emailsender";
import EmailWeMiDAO from "dao/emailwemi/emailwemiDAO";
import { findTemplateInfo } from "sql/emailwemi/selezione";
import { findUserByIdRequest } from "sql/richiestatcb/selezione";
import RichiestaEnteDAO from "dao/richiestaente/richiestaEnteDAO";
import { TEMPLATE_STAFF_WEMI_WITHOUT_BUTTON, TEMPLATE_STAFF_WEMI_WITHOUT_BUTTON_WITHOUT_CONDIZIONI } from "constants/templates/template_name";
import { logger } from "utility/logger/getInstance";

export class EmailSenderAdministrator extends SendEmail {
  /**
   * 
   * @param {Int} idRichiestaEnte 
   * @param {String} template 
   */
  async sendEmailFromStaffWeMiWithoutButton(idRichiestaEnte, template = '', sendSecondaryEmail) {
    const dati = {};
    const richiestaBase = await this.db.one(findUserByIdRequest, { id_richiesta_servizio_ente: idRichiestaEnte });

    dati.idRichiesta = richiestaBase.id_richiesta_servizio_base;
    const database = this.db;
    const emailWeMiDAO = new EmailWeMiDAO(database);
    const datiWeMi = await emailWeMiDAO.findWeMiBaseInfo();
    const logoNavbar = await emailWeMiDAO.findLogoHeaderEmail();
    logger.trace("logoNavbar", logoNavbar);
    const richiestaEnteDAO = new RichiestaEnteDAO(database);
    const datiUtente = await richiestaEnteDAO.findUserByIdRichiesta(idRichiestaEnte);
    datiUtente.nomeDestinatario = datiUtente.tx_nome_utente;
    datiUtente.cognomeDestinatario = datiUtente.tx_cognome_utente;
    datiUtente.mailCittadino = datiUtente.ptx_email;
    const dataAnnullamento = new Date().toLocaleDateString();

    const dbTemplateKeys = this.mapTemplate(template);

    const logoFileWeMi = await emailWeMiDAO.findLogoFileWeMi();
    logger.trace("logoFileWeMi", logoFileWeMi);
    const pagamento = await richiestaEnteDAO.findEmailPagamentoByIdRichiesta(idRichiestaEnte);
    if (pagamento) {
      const flEmail = pagamento.js_dati_fatturazione.flEmail;
      dati.fatturaMail = flEmail === 'S' ? 'si' : 'no';
    }

    const idServizio = await richiestaEnteDAO.findIdServizioByIdRichiesta(idRichiestaEnte);
    dati.idServizio = idServizio.id_servizio_riferimento;

    const descrServizio =  await richiestaEnteDAO.findDescrServizioByIdServizio(idServizio.id_servizio_riferimento);
    dati.descrServizio = descrServizio?.descrizioneServizio;

    if (!datiUtente.nomeServizio) {
      //datiUtente estrae nomeServizio TCB quindi per nomi servizio ente viene chiamata nuova query 
      const nomeServizio = await richiestaEnteDAO.findNomeServizioByIdRichiesta(idRichiestaEnte);
      dati.nomeServizio = nomeServizio?.tl_testo_1.it;
    }

    const contatti = await emailWeMiDAO.findContatti();
    /**
     * Searching the right template values with the dao 
     * Spostare in dao parametro generale
     */
    const risultato = await this.db.many(findTemplateInfo, { dbTemplateKeys });

    const ente = await richiestaEnteDAO.findAllEnteByIdRichiesta(idRichiestaEnte);
    dati.nomeEnte = ente.nm_ente;

    const fileHtmlAdmin = 'html/' + TEMPLATE_STAFF_WEMI_WITHOUT_BUTTON + '.html';
    const senderAdminEmail = new EmailSender({ ...logoNavbar, ...dati, ...datiUtente, ...datiWeMi, dataAnnullamento, ...logoFileWeMi, ...contatti }, fileHtmlAdmin, template, { templatesDBValues: risultato, templatesHTMLKeys: this.replaceTemplate });
    /**
     * Sending the email to ente
     */

     if(sendSecondaryEmail && ente.tx_email_secondaria){
      await senderAdminEmail.send(datiWeMi.emailWeMi, ente.tx_email_secondaria);
     }

    return await senderAdminEmail.send(datiWeMi.emailWeMi, ente.ptx_email);

  }

  async sendServiceEmailStaffWeMiWithoutButton(idServizioEnte, template = '') {
    const dati = {};
    const database = this.db;

    const emailWeMiDAO = new EmailWeMiDAO(database);
    const datiWeMi = await emailWeMiDAO.findWeMiBaseInfo();
    const logoNavbar = await emailWeMiDAO.findLogoHeaderEmail();
    logger.trace("logoNavbar", logoNavbar);
   
    const logoFileWeMi = await emailWeMiDAO.findLogoFileWeMi();
    logger.trace("logoFileWeMi", logoFileWeMi);
  
    /**
     * i dati di ristorno sono:
     * nm_ente
     * tl_testo_1 (nome servizio)
     */
    const richiestaEnteDAO = new RichiestaEnteDAO(database);
    const datiPerEmail = await richiestaEnteDAO.findDatiByIdServizioEnte(idServizioEnte);

    // si salvano i dati per il template 
    dati.nomeServizio = datiPerEmail?.tl_testo_1.it;
    dati.nomeEnte = datiPerEmail?.nm_ente;
    dati.idServizio = idServizioEnte;

    const dbTemplateKeys = this.mapTemplate(template);
    const risultato = await this.db.many(findTemplateInfo, { dbTemplateKeys });

    const fileHtmlAdmin = 'html/' + TEMPLATE_STAFF_WEMI_WITHOUT_BUTTON_WITHOUT_CONDIZIONI + '.html';
    const senderAdminEmail = new EmailSender({ ...logoNavbar, ...dati, ...datiWeMi, ...logoFileWeMi }, fileHtmlAdmin, template, { templatesDBValues: risultato, templatesHTMLKeys: this.replaceTemplate });
    
    /**
     * Sending the email
     */
    return await senderAdminEmail.send(datiWeMi.emailWeMi, datiWeMi.emailServizioWeMi);

  }


}