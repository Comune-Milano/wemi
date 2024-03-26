import yup from 'libs/Form/validation/yup';
import { STRING_MAX_VALIDATION } from 'libs/Form/errors';
const schema = yup.object().shape({
  altriAnimaliTextArea: yup.string()
    .when('altriAnimali', {
      is: true,
      then: yup.string().max(STRING_MAX_VALIDATION.value, STRING_MAX_VALIDATION.message).required(),
      otherwise: yup.string().max(STRING_MAX_VALIDATION.value, STRING_MAX_VALIDATION.message),
    }),
  altroAlimentari: yup.string()
    .when('alimentari', {
      is: true,
      then: yup.string().max(STRING_MAX_VALIDATION.value, STRING_MAX_VALIDATION.message).required(),
      otherwise: yup.string().max(STRING_MAX_VALIDATION.value, STRING_MAX_VALIDATION.message),
    }),
  altroTextArea: yup.string()
    .when('altro', {
      is: true,
      then: yup.string().max(STRING_MAX_VALIDATION.value, STRING_MAX_VALIDATION.message).required(),
      otherwise: yup.string().max(STRING_MAX_VALIDATION.value, STRING_MAX_VALIDATION.message),
    }),
  altroInteressi: yup.string()
  .when('interessi', {
    is: (value) => value.includes(0),
    then: yup.string().max(STRING_MAX_VALIDATION.value, STRING_MAX_VALIDATION.message).required(),
    otherwise: yup.string().max(STRING_MAX_VALIDATION.value, STRING_MAX_VALIDATION.message),
  }),
  altroCarattere: yup.string()
  .when('carattere', {
    is: (value) => value.includes(0),
    then: yup.string().max(STRING_MAX_VALIDATION.value, STRING_MAX_VALIDATION.message).required(),
    otherwise: yup.string().max(STRING_MAX_VALIDATION.value, STRING_MAX_VALIDATION.message),
  }),

});
export default schema;
