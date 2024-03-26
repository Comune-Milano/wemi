import fs from "fs";
import path from "path";
import { isNull } from "util";
import { logger } from "utility/logger/getInstance";
import { __TEST__ } from 'environment';

/**
 * 
 * @param {String} htmlPath path to the file xml 
 * example: ../html/TEMPLATE_FEEDBACK_RIC_ENTE_BODY.html
 */
const readFileHTML = async (htmlPath) => {
    try{
        const rootDir = __TEST__ ? path.resolve("./src") : __dirname;
        const splitHtmlPath = htmlPath.split('/');
        const pathName = path.join(rootDir, ...splitHtmlPath); 
        const risultato = await fs.readFileSync(pathName);
        if(!isNull(risultato)){
            return risultato.toString();
        }
        else {
            logger.error({ htmlPath }, 'Error: cannot find the HTML file for the provided path');
        }
    }
    catch(error) {
        logger.error(error, 'Errore lettura file html');
    }
  
}

export { readFileHTML };