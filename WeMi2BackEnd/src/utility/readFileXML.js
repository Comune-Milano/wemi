import fs from "fs";
import path from "path";
import { isNull } from "util";
import { logger } from "utility/logger/getInstance";

/**
 * 
 * @param {String} xmlPath path to the file xml 
 * example: ../xml/sitGetValueFPoint.xml
 */
const readFileXML = (xmlPath) => {
    try{
        // const splitXmlPath = xmlPath.split('/');
        const pathName = path.resolve(__dirname, xmlPath); 
        const risultato = fs.readFileSync(pathName);
        if(!isNull(risultato)){
            return risultato.toString();
        }
        else {
            logger.error({ xmlPath }, 'Error: cannot find the XML file for the provided path');
        }
    }
    catch(error){
        logger.error(error, 'Error reading xml file');
    }
  
}

export default readFileXML;