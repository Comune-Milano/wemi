import yup from 'libs/Form/validation/yup';
import { DESCRIPTION_PROFILE_AMMINISTRATORE, AMMINISTRATORE } from 'types/userRole';

export const sortingCriteriaIds = {
  cognomeNome: 2,
  profilo: 1
};

export const sortingCriteria = [
  { id: sortingCriteriaIds.cognomeNome, value: "Cognome Nome" },
  { id: sortingCriteriaIds.profilo, value: "Profilo" },
];

//Form
export const initialDataset = {
  nome: undefined,
  cognome: undefined,
  username: undefined,
  email: undefined,
  inizioValidita: undefined,
  fineValidita: undefined,
  ordinamento: undefined,
  codiceProfilo: { id: AMMINISTRATORE, value: DESCRIPTION_PROFILE_AMMINISTRATORE }
};

export const validationSchema = yup.object().shape({
  fineValidita: yup.date()
    .typeError('Formato errato')
    .nullable()
    .when(
      'inizioValidita',
      (inizioValidita, formvalidationSchema) => (inizioValidita ? formvalidationSchema.min(inizioValidita, "La data fine non può precedere la data inizio.") : formvalidationSchema.nullable())
    ),
  inizioValidita: yup.date()
    .typeError('Formato errato')
    .nullable(),
});

export const NUMBER_ITEMS_TABLE = 20;

export const columnsTable = [
  'COGNOME NOME',
  'E-MAIL',
  'USERNAME',
  'PROFILO',
  'INIZIO VALIDITÀ',
  'FINE VALIDITÀ',
  'MODIFICA'
];