import { Validator } from "../validator";
import psqlAdapter from "../../helpers/psqlAdapter";
import { ACCESS_DENIED } from "../../errors/authorization";
import { verificaUtenteAdmin } from "sql/utente/selezione";

const { db } = psqlAdapter;

/***
 * Verify if the request belongs to the logged user
 */
export class AdministratorValidator extends Validator {
    /**
     * @param {String} keysToArgs the keys to find the right primary key of the validator
     * @param {Object} argomenti are the parameters of the resolver invoked 
     */
    constructor(keysToArgs, argomenti) {
        super(keysToArgs, argomenti);
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
             * 
             * Validating if the user can access to the determinated request
             * 
             */
            const risultato = await db.one(verificaUtenteAdmin, { idUtente: user.idUtente });
            return risultato;
        }
        catch (error) {
            throw (ACCESS_DENIED);
        }
    }
}