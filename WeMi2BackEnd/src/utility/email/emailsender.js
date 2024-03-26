import { readFileHTML } from "../readFileHTML";
import { htmlEncode } from "htmlencode";

export class EmailSender {
    /**
     * 
     * @param {Object} parameters 
     * @param {String} templatePath
     * @param {String} templateType
     * @param {Object} db
     *
     */
    constructor(parameters = {}, templatePath = '', templateType = '', templateParams = { templatesDBValues: [], templatesHTMLKeys: [] }) {
        this.parameters = parameters;
        this.templatePath = templatePath;
        this.templateType = templateType;
        this.templatesDBValues = templateParams.templatesDBValues;
        this.templatesHTMLKeys = templateParams.templatesHTMLKeys;
    }
    /**
     * Method to substitute the parameters of the email to the html template
     * 
     */
    async prepareTemplate() {

        let template = await readFileHTML(this.templatePath);


        /**
         * Extracting the SUBJECT from the result
         */
        for (const templateValues of this.templatesDBValues) {
            if (templateValues.nomeParametro.includes('SUBJECT')) {
                this.subject = templateValues.valoreParametro;
            }
        }
        /**
         * Mapping results of the dao to replace the placeholder of the template HEADER, BODY, FOOTER, SIGN, SUBJECT
         */
        Object.values(this.templatesDBValues).map(value1 => {
            Object.values(this.templatesHTMLKeys).forEach(value2 => {
                if (value1.nomeParametro.includes(value2)) {
                    const stringToReplace = '${' + value2 + '}';
                    const parameter = htmlEncode(value1.valoreParametro);
                    template = template.replaceAll(stringToReplace, parameter);
                    this.subject = this.subject.replaceAll(stringToReplace, parameter);
                }
            });
        });
        // converte l'entità html rappresentante il carattere new line in 
        // un tag <br> per motivi di compatibilità sui client email
        template = template.replaceAll('&#10;', '<br>')
        /**
         * Replacing the parameters of the email like the service name or id request
         */
        Object.keys(this.parameters).map(keyParameter => {

            const stringToReplace = '${' + keyParameter + '}';
            const parameter = this.parameters[keyParameter];
            template = template.replaceAll(stringToReplace, parameter);
            this.subject = this.subject.replaceAll(stringToReplace, parameter);

        });

        return template;

    }

    /**
     * 
     * @param {String} sender 
     * @param {String} receiver
     * @param {String} cc
     * @param {String} bcc
     * Method to send the email. It takes the sender as a String the email.
     * Same thing for the receiver.
     * CC are the address to put in cc
     * BCC are the address to put in bcc
     *  
     */
    async send(sender = '', receiver = '', cc = '', bcc = '') {
        return Promise.resolve();
    }

    /**
     * 
     * @param {String} email
     * Checks if it's a valid email address 
     */

    checkAddress(email = '') {

        const regexEmail = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if (!regexEmail.test(email)) {
            throw new Error('Formato email non corretto');
        }

        return email;

    }
}