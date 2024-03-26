import { STRING_MAX_VALIDATION } from 'libs/Form/errors';
import * as yup from 'yup';

export const formValidationSchema = yup.object().shape({
  checkboxesTipologieOrario: yup.array().of(
    yup.object().shape({ id: yup.number(), checked: yup.boolean(), value: yup.string() })
  ),
  // checkboxesTipologieOrario: yup.array().test({
  //   name: 'test',
  //   exclusive: false,
  //   message: 'Selezionare almeno un\'opzione',
  //   test: value => value.some(el => el.checked)
  // }),
  convivenzaMezzaGiornataDiRiposo: yup.array().of(
    yup.object().shape({ id: yup.number(), checked: yup.boolean(), value: yup.string() })
  ),
  convivenzaStipendioProposto: yup.array().of(
    yup.object().shape({ id: yup.number(), checked: yup.boolean(), value: yup.string() })
  ),
  convivenzaSpaziAccettabili: yup.array().of(
    yup.object().shape({ id: yup.number(), checked: yup.boolean(), value: yup.string() })
  ),
  convivenzaTestoSpazioAccettabileAltro: yup.string().when('convivenzaSpaziAccettabili', {
    is: (value) => value.some(el => el.id === 0 && el.checked),
    then: yup.string().max(STRING_MAX_VALIDATION.value, STRING_MAX_VALIDATION.message).required().nullable(),
    otherwise: yup.string().nullable(),
  }),
  convivenzaRidottaTestoSpazioAccettabileAltro: yup.string().when('convivenzaRidottaSpaziAccettabili', {
    is: (value) => value.some(el => el.id === 0 && el.checked),
    then: yup.string().max(STRING_MAX_VALIDATION.value, STRING_MAX_VALIDATION.message).required().nullable(),
    otherwise: yup.string().nullable(),
  }),
});
