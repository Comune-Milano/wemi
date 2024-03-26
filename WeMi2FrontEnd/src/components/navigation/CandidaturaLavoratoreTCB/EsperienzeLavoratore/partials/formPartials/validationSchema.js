import yup from 'libs/Form/validation/yup';
import { telefonoRegex, emailRegex } from 'libs/Form/validation/regex';
import moment from 'moment';
import { STRING_MAX_VALIDATION } from 'libs/Form/errors';

export const formValidationSchema = yup.object().shape({
  serviziPrestati: yup
    .array().of(yup.number().integer()).required(),
  inCorsoFlag: yup
    .boolean(),
  inizioPeriodo: yup
    .date()
    .required(),
  finePeriodo: yup
    .date()
    .typeError('Selezionare la data di fine della prestazione.')
    .when('inCorsoFlag', {
      is: (value) => !value,
      then: fp => fp.required(),
      otherwise: fp => fp.nullable(),
    }),
  sedeLavoroProvincia: yup
    .string()
    .max(STRING_MAX_VALIDATION.value, STRING_MAX_VALIDATION.message)
    .nullable(),
  sedeLavoroComune: yup
    .string()
    .nullable()
    .max(STRING_MAX_VALIDATION.value, STRING_MAX_VALIDATION.message)
    .required(),
  emailFamiglia: yup
    .string()
    .nullable()
    .max(STRING_MAX_VALIDATION.value, STRING_MAX_VALIDATION.message)
    .matches(emailRegex, 'Formato email non valido'),
  telefonoFamiglia: yup
    .string()
    .matches(telefonoRegex, 'Numero di telefono non valido')
    .max(STRING_MAX_VALIDATION.value, STRING_MAX_VALIDATION.message)
    .nullable(),
  descrizioneEsp: yup
    .string()
    .nullable()
    .max(STRING_MAX_VALIDATION.value, STRING_MAX_VALIDATION.message)
    .required(),
})
.test('testData', 'controllo date', (obj) => {
  if (!obj.inCorsoFlag) {
    if (moment(obj.inizioPeriodo).isAfter(obj.finePeriodo)) {
      return new yup.ValidationError(
        "La data di fine periodo non può essere precedente a quella di inizio",
        'Data non valida', 'finePeriodo'
      );
    }
  }
  return true;
})
