import { DOMParser } from 'xmldom';
import { Constants } from 'samlify';
import readFileXML from 'utility/readFileXML';

const metadataName = process.env.METADATA_IDP || 'metadata-CIAM-collaudo';

export const directoryMetadata = `xml/${metadataName}.xml`;

/**
 * Reads the metadata and parse as string
 * @returns {string} the metadata as string
 */
const readMetadata = () => {
  const fileXml = readFileXML(directoryMetadata);
  const metadataDOM = new DOMParser().parseFromString(fileXml);
  return metadataDOM;
};

/**
 * The entry point url of the identity provider
 * @returns {string} the entryPoint of the idp
 */
export const entryPoint = () => {
  const metadataDOM = readMetadata();
  const attributesKeys = Object.values(metadataDOM.getElementsByTagName('SingleSignOnService'));
  let entryPointString;
  attributesKeys.forEach(value => {
    if(value.hasAttribute && value.hasAttribute('Binding') && value.getAttribute('Binding') === Constants.namespace.binding.post){
      entryPointString = value.getAttribute('Location');
    }
  });
 
  return entryPointString;
}; 
/**
 * The url of the identity provider for logout
 * @returns {string} the entryPoint of the idp
 */
export const logoutUrl =  () =>{ 

  const metadataDOM = readMetadata();
  const attributesKeys = Object.values(metadataDOM.getElementsByTagName('SingleLogoutService'));
  let entryPointString;
  attributesKeys.forEach(value => {
    if(value.hasAttribute && value.hasAttribute('Binding') && value.getAttribute('Binding') === Constants.namespace.binding.post){
      entryPointString = value.getAttribute('Location');
    }
  });
 
  return entryPointString;

};
/**
 * Finds the certificates of the idp
 * @returns {string[]} the certificates
 */
export const findCertificates = () => {

  const metadataDOM = readMetadata();
  const certificateNode = metadataDOM.getElementsByTagName('ds:X509Certificate');
  const arrayResult = [];
  Array.from(certificateNode).forEach(element => {
    if(!element || !element.hasOwnProperty('firstChild') || !(element.firstChild?.nodeValue)){
      throw new Error('Errore lettura nel metadata');
    }
    const certificateString = element.firstChild.nodeValue.replace(/\s/g,'');
    arrayResult.push(certificateString);
  });

  return arrayResult;

};
/**
 * Finds the entity id of the idp
 * @returns {string} the entity id
 */
export const findEntityID = () => {

  const metadataDOM = readMetadata();
  const attributesKeys = Object.values(metadataDOM.documentElement.attributes);
  let entityID;
  attributesKeys.forEach(value => {
    if(value.nodeName === 'entityID'){
      entityID = value.nodeValue;
    }
  });
  return entityID;

};

export const urlLogoutPortal = process.env.LOGOUT_IDP || '';