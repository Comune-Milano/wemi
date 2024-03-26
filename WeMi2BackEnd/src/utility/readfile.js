import fs from "fs";
import path from "path";
import { isNull } from "util";
import { logger } from "utility/logger/getInstance";

/**
 * 
 * @param {String} filePath path to the file 
 * example: ../html/TEMPLATE_FEEDBACK_RIC_ENTE_BODY.html
 */
const readFile = (filePath) => {
    try{
        const splitPath = filePath.split('/');
        const pathName = path.join(__dirname, ...splitPath); 
        const risultato = fs.readFileSync(pathName, 'utf-8');
        if(!isNull(risultato)){
            return risultato;
        }
        else{
            logger.error({ filePath }, 'Error: cannot find the file for the provided path');
        }
    }
    catch(error) {
        logger.error(error, 'Errore lettura file');
        return null;
    }
  
}

export { readFile };