import { Validator } from "../validator";
import psqlAdapter from "../../helpers/psqlAdapter";
import { ACCESS_DENIED } from "../../errors/authorization";
import { verificaUtente, verificaUtenteCittadino } from "../../sql/richiestaente/verificautente";
import { CITTADINO, LAVORATORE, OPERATORE_ENTE, AMMINISTRATORE_ENTE } from "constants/usercode";

const { db } = psqlAdapter;

/***
 * Verify if the request belongs to the logged user
 */
export class RichiestaEnteValidator extends Validator {
    /**
     * @param {String} keysToArgs the keys to find the right primary key of the validator
     * @param {Object} argomenti are the parameters of the resolver invoked 
     */
    constructor(keysToArgs, argomenti) {
        super(keysToArgs, argomenti);
        this.idRichiestaEnte = super.findArgs();
    }
    /**
     * 
     * @param {User} user to validate the access of the user to the result of the resource
     *  
     */
    async validate(user) {
        try {
            /**
             * Invoke the method of the interface to validate the parameters
             */
            super.validate(user);
            
             /**
             * Read the user profile
             */
            const { profile } = user;

             /**
             * Validating the user profile C and L
             */

            if(profile === CITTADINO || profile === LAVORATORE) {
                /**
                 * Validating if the user can access to the determinated request
                 */
                const risultato = await db.one(verificaUtenteCittadino, { idUtente: user.idUtente, idRichiestaEnte: this.idRichiestaEnte });
                return risultato;
            }

             /**
             * Validating the user profile E and AE
             */
            if(profile === OPERATORE_ENTE || profile === AMMINISTRATORE_ENTE) {
                /**
                 * Validating if the user can access to the determinated request
                 */
                const risultato = await db.one(verificaUtente, { idUtente: user.idUtente, idRichiestaEnte: this.idRichiestaEnte });
                return risultato;
            }


        }
        catch (error) {
            throw (ACCESS_DENIED);
        }
    }
}