import yup from 'libs/Form/validation/yup';

// Form
export const initialDataset = {
  codiceVoucher: undefined,
  state: undefined,
  dataTransazioneDa: undefined,
  dataTransazioneA: undefined,
  dataContabilizzazioneDa: undefined,
  dataContabilizzazioneA: undefined,
  importoTransazioneMin: undefined,
  importoTransazioneMax: undefined,
  cfMinore: undefined,
  cfIntestatario: undefined,
  bando: undefined,
};

export const validationSchema = yup.object().shape({
  dataContabilizzazioneA: yup.date()
    .typeError('Formato errato')
    .nullable()
    .when(
      'dataContabilizzazioneDa',
      (dataContabilizzazioneDa, formvalidationSchema) => (dataContabilizzazioneDa ? formvalidationSchema.min(dataContabilizzazioneDa, 'La data fine non può precedere la data inizio.') : formvalidationSchema.nullable())
    ),
  dataContabilizzazioneDa: yup.date()
    .typeError('Formato errato')
    .nullable(),
  dataTransazioneA: yup.date()
    .typeError('Formato errato')
    .nullable()
    .when(
      'dataTransazioneDa',
      (dataTransazioneDa, formvalidationSchema) => (dataTransazioneDa ? formvalidationSchema.min(dataTransazioneDa, 'La data fine non può precedere la data inizio.') : formvalidationSchema.nullable())
    ),
  dataTransazioneDa: yup.date()
    .typeError('Formato errato')
    .nullable(),
});

export const NUMBER_ITEMS_TABLE = 10;

export const columnsTable = [
  'SELEZIONE',
  'RIFERIMENTO BANDO',
  'CODICE VOUCHER',
  'IMPORTO',
  'STATO',
  'DATA UTILIZZO',
  'DATA CONTABILIZZAZIONE',
  'SERVIZIO ACQUISTATO',
  'ENTE',
  'CODICE RICHIESTA ENTE',
  'AZIONI',
];
