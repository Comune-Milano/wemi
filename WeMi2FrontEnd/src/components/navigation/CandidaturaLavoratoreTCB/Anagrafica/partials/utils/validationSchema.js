import { fiscalCodeRegex, telefonoRegex, emailRegex } from 'libs/Form/validation/regex';
import moment from 'moment';
import yup from 'libs/Form/validation/yup';
import { STRING_MAX_VALIDATION } from 'libs/Form/errors';

export const formValidationSchema = yup.object().shape({
  datiAnagrafici: yup
    .object()
    .shape({
      nome: yup
        .string()
        .max(STRING_MAX_VALIDATION.value, STRING_MAX_VALIDATION.message)
        .required(),
      cognome: yup
        .string()
        .max(STRING_MAX_VALIDATION.value, STRING_MAX_VALIDATION.message)
        .required(),
      sesso: yup.number()
        .integer()
        .required(),
      luogoNascita: yup
        .string()
        .max(STRING_MAX_VALIDATION.value, STRING_MAX_VALIDATION.message)
        .required(),
      statoNascita: yup.number()
        .integer()
        .required(),
      dataNascita: yup
        .date()
        .max(moment().startOf('day').toDate(), 'La data di nascita deve precedere la data odierna.')
        .required(),
      codiceFiscale: yup
        .string()
        .typeError('Codice fiscale non valido.')
        .max(STRING_MAX_VALIDATION.value, STRING_MAX_VALIDATION.message)
        .matches(fiscalCodeRegex, 'Codice fiscale non valido.')
        .required(),
      cittadinanza: yup.number()
        .integer()
        .required(),
    }),
  cartaIdentita: yup
    .object()
    .shape({
      checkCarta: yup
      .number()
      .integer(),
      numero: yup
        .string()
        .when('checkCarta', {
          is: 1,
          then: yup.string().required(),
          otherwise: yup.string(),
        }),
      dataRilascio: yup
        .date()
        .when('checkCarta', {
          is: 1,
          then: yup.date().required(),
          otherwise: yup.date(),
        }),
      dataScadenza: yup
        .date()
        .when(
          'dataRilascio',
          (dataRilascio, formvalidationSchema) => (dataRilascio && formvalidationSchema.min(dataRilascio, 'La data non può precedere la data di rilascio.'))
        )
        .when('checkCarta', {
          is: 1,
          then: yup.date().required(),
          otherwise: yup.date(),
        }),
      rilasciatoDa: yup
        .string()
        .when('checkCarta', {
          is: 1,
          then: yup.string().required(),
          otherwise: yup.string(),
        }),
    }),
  passaporto: yup
    .object()
    .shape({
      checkPassaporto: yup
        .number()
        .integer(),
      numero: yup
        .string()
        .when('checkPassaporto', {
          is: 1,
          then: yup.string().required(),
          otherwise: yup.string(),
        }),
      dataRilascio: yup
        .date()
        .when('checkPassaporto', {
          is: 1,
          then: yup.date().required(),
          otherwise: yup.date(),
        }),
      dataScadenza: yup
        .date()
        .when(
          'dataRilascio',
          (dataRilascio, formvalidationSchema) => (dataRilascio && formvalidationSchema.min(dataRilascio, 'La data non può precedere la data di rilascio.'))
        )
        .when('checkPassaporto', {
          is: 1,
          then: yup.date().required(),
          otherwise: yup.date(),
        }),
      rilasciatoDa: yup
        .string()
        .when('checkPassaporto', {
          is: 1,
          then: yup.string().required(),
          otherwise: yup.string(),
        }),
    }),
  permessoSoggiorno: yup
    .object()
    .shape({
      checkRichiestaRinnovo: yup
        .boolean(),
      checkPermessoSoggiorno: yup
        .number()
        .integer(),
      motivo: yup
        .string()
        .when('checkPermessoSoggiorno', {
          is: 1,
          then: yup.string().required(),
          otherwise: yup.string(),
        }),
      numero: yup
        .string()
        .when('checkPermessoSoggiorno', {
          is: 1,
          then: yup.string().required(),
          otherwise: yup.string(),
        }),
      dataRilascio: yup
        .date()
        .when('checkPermessoSoggiorno', {
          is: 1,
          then: yup.date().required(),
          otherwise: yup.date(),
        }),
      dataScadenza: yup
        .date()
        .when(
          'dataRilascio',
          (dataRilascio, formvalidationSchema) => (dataRilascio && formvalidationSchema.min(dataRilascio, 'La data non può precedere la data di rilascio.'))
        )
        .when('checkPermessoSoggiorno', {
          is: 1,
          then: yup.date().required(),
          otherwise: yup.date(),
        }),
      rilasciatoDa: yup
        .string()
        .when('checkPermessoSoggiorno', {
          is: 1,
          then: yup.string().required(),
          otherwise: yup.string(),
        }),
      dataRichiestaRinnovo: yup
        .date()
        .when('checkRichiestaRinnovo', {
          is: true,
          then: yup.date().required(),
          otherwise: yup.date(),
        }),
    }),
  domicilio: yup
    .object()
    .shape({
      indirizzo: yup
        .string()
        .max(STRING_MAX_VALIDATION.value, STRING_MAX_VALIDATION.message)
        .required(),
      comune: yup
        .string()
        .max(STRING_MAX_VALIDATION.value, STRING_MAX_VALIDATION.message)
        .required(),
    }),
  residenza: yup
    .object()
    .shape({
      indirizzo: yup
        .string()
        .max(STRING_MAX_VALIDATION.value, STRING_MAX_VALIDATION.message)
        .required(),
      comune: yup
        .string()
        .max(STRING_MAX_VALIDATION.value, STRING_MAX_VALIDATION.message)
        .required(),
    }),
  contatti: yup
    .object()
    .shape({
      telefono1: yup
        .string()
        .typeError('Numero di telefono non valido.')
        .matches(telefonoRegex, 'Numero di telefono non valido.')
        .required(),
      email: yup
        .string()
        .max(STRING_MAX_VALIDATION.value, STRING_MAX_VALIDATION.message)
        .matches(emailRegex, 'Inserisci un indirizzo e-mail valido.')
        .required(),
      telefono2: yup
        .string()
        .typeError('Numero di telefono non valido.')
        .matches(telefonoRegex, 'Numero di telefono non valido.'),
    }),
})
.test(
  'dataRilascioPermessoSoggiorno',
  null,
  obj => {
    if (obj.permessoSoggiorno.checkPermessoSoggiorno !== 1) {
      return true;
    }
    return moment(obj.permessoSoggiorno.dataRilascio).isSameOrBefore(moment(obj.datiAnagrafici.dataNascita)) ?
      new yup.ValidationError(
        'La data di rilascio non può essere inferiore alla data di nascita.',
        null,
        'permessoSoggiorno.dataRilascio'
      ) : true;
  }
)
.test(
  'dataScadenzaPermessoSoggiorno',
  null,
  obj => (obj.permessoSoggiorno.checkPermessoSoggiorno === 1 && obj.permessoSoggiorno.checkRichiestaRinnovo === false && moment(obj.permessoSoggiorno.dataScadenza).isBefore(moment().startOf('day'))) ?
      new yup.ValidationError(
        'Permesso di soggiorno scaduto.',
        null,
        'permessoSoggiorno.dataScadenza'
      ) : true
)
.test(
  'dataRichiestaRinnovoPermSogg',
  null,
  obj => (obj.permessoSoggiorno.dataRichiestaRinnovo && obj.permessoSoggiorno.checkRichiestaRinnovo === true && moment(obj.permessoSoggiorno.dataRichiestaRinnovo).startOf('day').isAfter(moment().startOf('day'))) ?
      new yup.ValidationError(
        'La data di richiesta del rinnovo non può essere futura',
        null,
        'permessoSoggiorno.dataRichiestaRinnovo'
      ) : true
);
