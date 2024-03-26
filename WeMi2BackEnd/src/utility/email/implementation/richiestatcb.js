import { SendEmail } from "../sendemail";
import { EmailSender } from "../emailsender";
import EmailWeMiDAO from "dao/emailwemi/emailwemiDAO";
import { FRONTEND } from "constants/constants";
import { TEMPLATE_STAFF_WEMI_WITH_BUTTON, TEMPLATE_STAFF_WEMI_WITH_BUTTON_WITHOUT_CONTATTI, TEMPLATE_CITTADINO } from "constants/templates/template_name";
import { findTemplateInfo } from "sql/emailwemi/selezione";
import { findUserByIdRequest } from "sql/richiestatcb/selezione";
import { findUserInfoByIdRequestTCB } from "sql/valattributodomanda/selezione";
import { isNumber } from "util";
import { logger } from "utility/logger/getInstance";

export class EmailSenderRichiestaTcb extends SendEmail {
    /**
     * 
     * @param {Int} idRichiestaTcb 
     * @param {String} template 
     * @param {String} buttonValue 
     * @param {String} relativeUrl 
     */
    async sendEmailFromStaffWeMiWithButton(idRichiestaTcb, template = '', buttonValue = 'Vedi Richiesta', relativeUrl = '', idLavoratore) {

        const database = this.db;
        let dati = {};
        const richiestaBase = await this.db.one(findUserByIdRequest, { id_richiesta_servizio_ente: idRichiestaTcb });

        dati.idRichiesta = richiestaBase.id_richiesta_servizio_base;
        const emailWeMiDAO = new EmailWeMiDAO(database);
        const datiWeMi = await emailWeMiDAO.findWeMiBaseInfo();
        const logoNavbar = await emailWeMiDAO.findLogoHeaderEmail();
        const datiUtente = await database.one(findUserInfoByIdRequestTCB, { idRichiestaTcb });

        datiUtente.nomeDestinatario = datiUtente.nome;
        datiUtente.cognomeDestinatario = datiUtente.cognome;

        const dbTemplateKeys = this.mapTemplate(template);

        const logoFileWeMi = await emailWeMiDAO.findLogoFileWeMi();
        logger.trace("LogoFileWeMi", logoFileWeMi);
        if (isNumber(idLavoratore)) {
            const datiLavoratore = await emailWeMiDAO.findDatiLavoratoreById(idLavoratore);
            dati.nomeLavoratore = datiLavoratore.tx_nome_utente;
            dati.cognomeLavoratore = datiLavoratore.tx_cognome_utente
        }

        const contatti = await emailWeMiDAO.findContatti();
        /**
         * Searching the right template values with the dao 
         * Spostare in dao parametro generale
         */
        const risultato = await this.db.many(findTemplateInfo, { dbTemplateKeys });

        const idServizio = await emailWeMiDAO.findIdServizioByIdRichiesta(idRichiestaTcb);
        dati.idServizio = idServizio.id_servizio_riferimento;

        /**
         * Sending the email to the user
         */

        dati.nomeBottone = buttonValue;
        dati.urlLinkFunzionale = FRONTEND + relativeUrl;

        const link = FRONTEND + relativeUrl;

        const fileHtml = 'html/' + TEMPLATE_STAFF_WEMI_WITH_BUTTON + '.html';

        const senderEmail = new EmailSender({ ...logoNavbar, ...dati, ...datiUtente, ...datiWeMi, ...logoFileWeMi, ...contatti, ...link }, fileHtml, template, { templatesDBValues: risultato, templatesHTMLKeys: this.replaceTemplate });

        return await senderEmail.send(datiWeMi.emailWeMi, datiUtente.ptxEmail);

    }

    async sendEmailFromStaffWeMiWithButtonWithoutContatti(idRichiestaTcb, template = '', buttonValue = 'Vedi Richiesta', relativeUrl = '') {

        const database = this.db;
        let dati = {};
        const richiestaBase = await this.db.one(findUserByIdRequest, { id_richiesta_servizio_ente: idRichiestaTcb });

        dati.idRichiesta = richiestaBase.id_richiesta_servizio_base;
        const emailWeMiDAO = new EmailWeMiDAO(database);
        const datiWeMi = await emailWeMiDAO.findWeMiBaseInfo();
        const logoNavbar = await emailWeMiDAO.findLogoHeaderEmail();
        logger.trace("logoNavbar", logoNavbar);
        const datiUtente = await database.one(findUserInfoByIdRequestTCB, { idRichiestaTcb });

        datiUtente.nomeDestinatario = datiUtente.nome;
        datiUtente.cognomeDestinatario = datiUtente.cognome;

        const dbTemplateKeys = this.mapTemplate(template);

        const logoFileWeMi = await emailWeMiDAO.findLogoFileWeMi();
        logger.trace("LogoFileWeMi", logoFileWeMi);
        const contatti = await emailWeMiDAO.findContatti();
        logger.trace("contatti", contatti);
        /**
         * Searching the right template values with the dao 
         * Spostare in dao parametro generale
         */
        const risultato = await this.db.many(findTemplateInfo, { dbTemplateKeys });

        const idServizio = await emailWeMiDAO.findIdServizioByIdRichiesta(idRichiestaTcb);
        dati.idServizio = idServizio.id_servizio_riferimento;

        /**
         * Sending the email to the user
         */

        dati.nomeBottone = buttonValue;
        dati.urlLinkFunzionale = FRONTEND + relativeUrl;

        const fileHtml = 'html/' + TEMPLATE_STAFF_WEMI_WITH_BUTTON_WITHOUT_CONTATTI + '.html';

        const senderEmail = new EmailSender({ ...logoNavbar, ...dati, ...datiUtente, ...datiWeMi, ...logoFileWeMi, ...contatti }, fileHtml, template, { templatesDBValues: risultato, templatesHTMLKeys: this.replaceTemplate });

        return await senderEmail.send(datiWeMi.emailWeMi, datiUtente.ptxEmail);

    }

    async sendEmailToStaffWeMi(idRichiestaTcb, template = '') {

        const database = this.db;
        let dati = {};
        const richiestaBase = await this.db.one(findUserByIdRequest, { id_richiesta_servizio_ente: idRichiestaTcb });

        dati.idRichiesta = richiestaBase.id_richiesta_servizio_base;
        const emailWeMiDAO = new EmailWeMiDAO(database);
        const datiWeMi = await emailWeMiDAO.findWeMiBaseInfo();
        const logoNavbar = await emailWeMiDAO.findLogoHeaderEmail();
        const datiUtente = await database.one(findUserInfoByIdRequestTCB, { idRichiestaTcb });

        datiUtente.nomeDestinatario = datiUtente.nome;
        datiUtente.cognomeDestinatario = datiUtente.cognome;

        const dbTemplateKeys = this.mapTemplate(template);

        /**
         * Searching the right template values with the dao 
         * Spostare in dao parametro generale
         */
        const risultato = await this.db.many(findTemplateInfo, { dbTemplateKeys });

        const idServizio = await emailWeMiDAO.findIdServizioByIdRichiesta(idRichiestaTcb);
        dati.idServizio = idServizio.id_servizio_riferimento;

        /**
         * Sending the email to the staff WeMi
         */

        const fileHtml = 'html/' + TEMPLATE_CITTADINO + '.html';

        const senderEmail = new EmailSender({ ...logoNavbar, ...dati, ...datiUtente, ...datiWeMi }, fileHtml, template, { templatesDBValues: risultato, templatesHTMLKeys: this.replaceTemplate });

        return await senderEmail.send(datiUtente.ptxEmail, datiWeMi.emailWeMi);

    }

}