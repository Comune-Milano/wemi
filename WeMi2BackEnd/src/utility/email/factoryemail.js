import { VALIDATOR_UNDEFINED } from "errors/authorization";
import { ApolloError } from "apollo-server";
import { EMAIL_TYPE } from "constants/templates/type_email";


export class SingletonFactoryEmail {
    /**
     * 
     * @param {String} type to generate the right validator
     * @param {String} transaction to call
     *  
     */
    static create(type, transaction) {
        const emailTypesObject = EMAIL_TYPE;
        const constantTypeEmail = Object.values(emailTypesObject);
        for (const typeEmail of constantTypeEmail) {
            if (type === typeEmail.code) {
                const classEmail = typeEmail.class;
                return new classEmail(transaction);
            }
        }
        throw new ApolloError(VALIDATOR_UNDEFINED.message, VALIDATOR_UNDEFINED.code);
    }
}