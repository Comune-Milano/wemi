import { GENERATE_PDF_ERROR, ASSOCIA_LAVORATORE_ERROR, NOT_BLOCKING_SEND_EMAIL_ERROR } from "errors/errors";
import { SendEmail } from "utility/email/sendemail";
import { TEMPLATE_SUCCESS_ASSOCIATION_TCB } from "constants/templates/database_template";
import { BackofficeTcbDAO } from "dao/backofficeTcb/backofficeTcbDAO";
import { ApolloError } from "apollo-server";
import { generatePdfByIdLavoratore } from "utility/pdf/generatePdfByIdLavoratore";
import { EMAIL_TYPE } from 'constants/templates/type_email';
import { SingletonFactoryEmail } from 'utility/email/factoryemail';
/**
 * Class to calculate information on the user
 */

class BackOfficeTcbDomain {
    constructor(context) {
        this.context = context;
    }
    async generatePdf(codiceLavoratore, idServizio) {
        try {
            if (!codiceLavoratore || !idServizio) {
                throw new Error('errore generazione pdf');
            }
            return await generatePdfByIdLavoratore(
                codiceLavoratore, idServizio, '#77BC1F', false, true);
        }
        catch (error) {
            this.context.logger.error(error, "Errore generazione pdf error");
            throw new ApolloError(GENERATE_PDF_ERROR.message, GENERATE_PDF_ERROR.code);
        }
    }

    async associaLavoratoreDomandaTcb(args) {
        const resultPdf = await this.generatePdf(args.input.codiceLavoratore, args.input.idServizio);
        try {
            if (!resultPdf) {
                throw new Error('errore associazione pdf');
            }
            return await this.context.db.tx(async t => {
                const backofficeTcbDao = new BackofficeTcbDAO(this.context, args, t);
                return await backofficeTcbDao.associaLavoratoreDomandaTcb(resultPdf);
            });
        }
        catch (error) {
            this.context.logger.error(error, "Errore associaLavoratoreDomandaTcb");
            throw new ApolloError(ASSOCIA_LAVORATORE_ERROR.message, ASSOCIA_LAVORATORE_ERROR.code);
        }
    }

    async sendEmailForLavoratore(codiceRichiesta) {
        try {
        }
        catch (error) {
        }

    }

}

export default BackOfficeTcbDomain;
