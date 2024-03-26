import { isNullOrUndefined, isNull } from "util";
import { selezionaByToken } from "../sql/utente/selezione";
import btoa from "btoa";
import { logger } from "utility/logger/getInstance";

/**
 * @deprecated
 * @param {String} authToken the authorization token
 * @param {Object} db the connection object to database
 * Check the validity of the token
 * the function returns true if it's valid
 * false if it's not valid
 * 
 */
const checkToken = async (authToken, db) =>{
    let check = null;
    const token = authToken;
    if(isNullOrUndefined(token)){
       check=null;
       logger.info('Ho verificato il token è falso', token);
    }
    else{
        try{
            const cryptoToken = btoa(token);
            //Controlla validità del token su WebSeal
            const risultato = await db.oneOrNone(selezionaByToken, { token: cryptoToken });
            if(!isNull(risultato)){
                check=risultato;
                logger.info('Ho verificato il token è vero', token);
            }
            else{
                check = null; 
            }
        }
        catch(error){
            logger.error(error, 'Errore comunicazione di validazione token')
        }
        
    }
    return check;
}

export default checkToken;
