import yup from 'libs/Form/validation/yup';
import { emailRegex, numberRegex } from 'libs/Form/validation/regex';

const validationSchema = yup.object().shape({
  emailEnte: yup
    .string()
    .required()
    .matches(emailRegex, 'Inserisci un indirizzo e-mail valido'),
  nomeEnte: yup
    .string()
    .required(),
  partitaIva: yup
    .string()
    .required()
    .matches(numberRegex, 'Inserisci una Partita IVA valida')
    .max(11, 'Superata lunghezza massima consentita 11'),
  ragioneSociale: yup
    .string()
    .required(),
  stato: yup
    .object()
    .shape({
      id: yup.number().required(),
      value: yup.string().required(),
    }),
});

export default validationSchema;
