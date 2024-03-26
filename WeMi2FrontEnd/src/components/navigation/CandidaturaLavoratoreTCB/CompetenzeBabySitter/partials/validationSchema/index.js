import { STRING_MAX_VALIDATION } from 'libs/Form/errors';
import yup from 'libs/Form/validation/yup';

export const validationSchema = yup.object().shape({
  candidatura: yup.object().required(),
  mansioniSelezionateTata: yup
    .array()
    .nullable(),
  terapieSpecificate: yup
    .string(),
  altreMansioniTata: yup
    .string()
    .when('mansioniSelezionateTata', (mansioniSelezionateTata) => {
      if (mansioniSelezionateTata.find(el => el.idMans === 0)) {
        return yup.string().max(STRING_MAX_VALIDATION.value, STRING_MAX_VALIDATION.message).required();
      };
      return yup.string();
    }),
  faccendeDomestiche: yup.
    number()
    .integer()
    .required(),
  mansioniSelezionateColf: yup
    .array()
    .nullable(),
  altreMansioniColf: yup
    .string()
    .when(['mansioniSelezionateColf', 'faccendeDomestiche'], (mansioniSelezionateColf, faccendeDomestiche) => {
      if (faccendeDomestiche === 1 && mansioniSelezionateColf.includes(0)) {
        return yup.string().max(STRING_MAX_VALIDATION.value, STRING_MAX_VALIDATION.message).required();
      };
      return yup.string();
    }),
}).when([], (schema, data) => {
  if (data.value.candidatura.radioOptions.find(el => el.id === '1' && el.checked)) {
    return schema;
  }
  return yup.object().shape({
    candidatura: yup.object().required()
      .test(
        'test-candidatura-radio',
        'Devi checkare almeno un\'opzione di candidatura',
        candShape => {
          return candShape.radioOptions
            .some(element => element.checked);
        }
      ),
  });
});