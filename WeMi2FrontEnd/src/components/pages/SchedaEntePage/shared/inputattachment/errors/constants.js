import {
  FILE_LIMIT_EXECEEDED,
  INVALID_TYPE,
} from 'components/ui2/InputFile/utils/errors';

export const BYTE_MEASURE = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
export const BASE_CONVERSION_BYTE = 1024;

export const errorsMap = new Map([
  [
    FILE_LIMIT_EXECEEDED, {
      message: 'Non superare la massima dimensione: {maxDimension}',
      placeholders: ['maxDimension'],
    },
  ],
  [
    INVALID_TYPE, {
      message: 'Il tipo di file inserito non è un valido formato: {accept}',
      placeholders: ['accept'],
    },
  ],
]);


export class UploadFileError extends Error {
  constructor(code, properties = {}) {
    super(code);
    this.code = code;
    this.properties = properties;
    this.map();
  }

  map() {
    if (errorsMap.has(this.code)) {
      const errorClient = errorsMap.get(this.code);
      let errorMessage = errorClient.message;
      errorClient.placeholders.forEach(placeholder => {
        const foundProperty = this.properties[placeholder];
        errorMessage = errorMessage.replace(`{${placeholder}}`, this.transform(foundProperty) || '');
      });
      this.message = errorMessage;
    }
  }

  transform(value) {
    if (typeof value === 'number') {
      return this.transformToByte(value);
    }

    return value;
  }

  transformToByte(value) {
    if (value === 0) return '0 Byte';
    const byteMeasureNumber = parseInt(Math.floor(Math.log(value) / Math.log(BASE_CONVERSION_BYTE)), 10);
    const power = BASE_CONVERSION_BYTE ** byteMeasureNumber;
    return `${Math.round(value / power, 2)} ${BYTE_MEASURE[byteMeasureNumber]}`;
  }
}
