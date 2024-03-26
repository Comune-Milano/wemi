import xml2js from "xml2js";
import { logger } from "utility/logger/getInstance";

/**
 * 
 * @param {String} xmlString an xml Soap string
 * 
 */
const processors = [xml2js.processors.stripPrefix, 
    xml2js.processors.parseNumbers, xml2js.processors.parseBooleans,
xml2js.processors.firstCharLowerCase];

const valueProcessors = [
    xml2js.processors.parseNumbers, 
    xml2js.processors.parseBooleans
];
const parseXML = async (xmlString) => {
    try {
        const options = {
            trim: true,
            ignoreAttrs: true,
            explicitArray: false, 
            tagNameProcessors: processors,
            valueProcessors: valueProcessors
        };
        const xmlDoc = await xml2js.parseStringPromise(xmlString, options);
        const response = xmlDoc.envelope.body;
        return response;
    }
    catch (error) {
        logger.error(error, 'Errore parsing xml');
    }

}

export default parseXML;