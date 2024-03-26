import parse from "xml-parser";

/**
 * 
 * @param {String} xmlString an xml Soap string
 * 
 */

export const parseXMLSync = (xmlString) => {
    try {
        const xmlDoc = parse(xmlString);
        return xmlDoc;
    }
    catch (error) {
        console.log(error, 'errore parsing xml');
    }

}
