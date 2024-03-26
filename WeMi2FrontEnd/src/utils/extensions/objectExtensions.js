
export function getObjectValue(obj, path, defaultValue) {
  if ((!obj || typeof obj !== 'object' || Array.isArray(obj)) && path.length > 0) {
    return defaultValue;
  }

  const props = path.split('.');
  const [field, ...rest] = props;
  const fieldValue = obj[field];

  if (rest.length === 0) {
    return (fieldValue !== null && fieldValue !== undefined) ? fieldValue : defaultValue;
  }
  return getObjectValue(fieldValue, rest.join('.'), defaultValue);
}

//prende in input un json e restituisce true se vuoto

export const  isObjectEmpty =(obj)=> {
  return Object.keys(obj).length === 0;
};