import { Validator } from "../validator";
import psqlAdapter from "../../helpers/psqlAdapter";
import { ACCESS_DENIED } from "../../errors/authorization";
import { verificaUtente } from "../../sql/richiestatcb/verificautente";

const { db } = psqlAdapter;

/***
 * Verify if the request belongs to the logged user
 */
export class RichiestaTcbValidator extends Validator {
    /**
     * @param {String} keysToArgs the keys to find the right primary key of the validator
     * @param {Object} argomenti are the parameters of the resolver invoked 
     */
    constructor(keysToArgs, argomenti) {
        super(keysToArgs, argomenti);
        this.idRichiestaTcb = super.findArgs();
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
             * Validating if the user can access to the determinated request
             */
            const risultato = await db.one(verificaUtente, { idUtente: user.idUtente, idRichiestaTcb: this.idRichiestaTcb });
            return risultato;
        }
        catch (error) {
            throw (ACCESS_DENIED);
        }
    }
}