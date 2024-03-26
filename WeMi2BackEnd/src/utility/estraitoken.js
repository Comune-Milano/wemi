import { logger } from "utility/logger/getInstance";

/**
 * 
 * @deprecated 
 */
const estraiToken = (context) =>{
    try{
        const token = context.user.authToken;
        return token;
    }
    catch(error){
        logger.error(error, 'Errore estrazione token');
        //throw dell'errore
    }
}

export default estraiToken;