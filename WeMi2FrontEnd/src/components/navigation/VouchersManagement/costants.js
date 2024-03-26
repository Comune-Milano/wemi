import yup from 'libs/Form/validation/yup';

// Form
export const initialDataset = {
  startValidDate: undefined,
  endValidDate: undefined,
  stateVoucher: undefined,
  codeVoucher: undefined,
  cfIntestatario: undefined,
  cfMinore: undefined,
  totalImport: undefined,
  remainingImport: undefined,
  countedImport: undefined,
  riferimentoBando: undefined,
  nonUtilizzato: false,
};

export const validationSchema = yup.object().shape({
  fineValidita: yup.date()
    .typeError('Formato errato')
    .nullable()
    .when(
      'inizioValidita',
      (inizioValidita, formvalidationSchema) => (inizioValidita ? formvalidationSchema.min(inizioValidita, 'La data fine non può precedere la data inizio.') : formvalidationSchema.nullable())
    ),
  inizioValidita: yup.date()
    .typeError('Formato errato')
    .nullable(),
});

export const NUMBER_ITEMS_TABLE = 10;

export const columnsTable = [
  'INIZIO VALIDITÀ',
  'FINE VALIDITÀ',
  'STATO',
  'RIFERIMENTO BANDO',
  'CODICE',
  'CF INTESTATARIO',
  'CF MINORE',
  'IMPORTO TOTALE',
  'IMPORTO RESIDUO',
  'IMPORTO CONTABILIZZATO',
  'AZIONI',
];
