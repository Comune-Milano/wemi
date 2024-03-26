import yup from 'libs/Form/validation/yup';
import { STRING_MAX_VALIDATION } from 'libs/Form/errors';
const schema = yup.object().shape({
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
export default schema;
