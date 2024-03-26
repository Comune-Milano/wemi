import yup from 'libs/Form/validation/yup';
import moment from 'moment';
import { STRING_MAX_VALIDATION } from 'libs/Form/errors';

const today = new Date(Date.now());

export const validationSchema = yup.object().shape({
  anniEspTata: yup
    .number()
    .integer()
    .nullable(),
  anniEspColf: yup
    .number()
    .integer()
    .nullable(),
  anniEspBadante: yup
    .number()
    .integer()
    .nullable(),
    dtItaliaDal:yup
    .date()
    .max(today, 'Inserire una data valida')
    .typeError('Inserire una data valida'),
  statoCandidatura: yup
    .number()
    .integer()
    .required('Seleziona lo stato della candidatura'),
  vincoliCandidatura: yup
    .string()
    .max(STRING_MAX_VALIDATION.value, STRING_MAX_VALIDATION.message),
  votoEspTata: yup
    .number()
    .integer()
    .nullable(),
  votoEspColf: yup
    .number()
    .integer()
    .nullable(),
  votoEspBadante: yup
    .number()
    .integer()
    .nullable(),
  notaOperatore: yup
    .string()
    .max(STRING_MAX_VALIDATION.value, STRING_MAX_VALIDATION.message),
});
