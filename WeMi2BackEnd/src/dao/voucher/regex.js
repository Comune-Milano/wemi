export const fiscalCodeRegex = /^([A-Za-z]{6}[0-9lmnpqrstuvLMNPQRSTUV]{2}[abcdehlmprstABCDEHLMPRST]{1}[0-9lmnpqrstuvLMNPQRSTUV]{2}[A-Za-z]{1}[0-9lmnpqrstuvLMNPQRSTUV]{3}[A-Za-z]{1})$|([0-9]{11})$/;
export const fiscalCodeITRegEx = /^[A-Za-z]{6}[0-9]{2}[abcdehlmprstABCDEHLMPRST]{1}[0-9]{2}[A-Za-z]{1}[0-9]{3}[A-Za-z]{1}$/
export const fiscalCodeITRegEx2 = /^[a-zA-Z]{6}[0-9]{2}[abcdehlmprstABCDEHLMPRST]{1}[0-9]{2}([a-zA-Z]{1}[0-9]{3})[a-zA-Z]{1}$/
                                  
export const telefonoRegex = /^\d+$/;
export const capRegex = /^\d{5}$/;
export const emailRegex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
export const numberRegex = /^[0-9]+$/;
export const regexUrl = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/;
export const phoneNumberRegex = /^\+?\d{2}[- ]?\d{3}[- ]?\d{5}$/;
export const ibanRegex = /^(IT)[0-9]{2}[A-Z][0-9]{10}[0-9A-Z]{12}$/;
