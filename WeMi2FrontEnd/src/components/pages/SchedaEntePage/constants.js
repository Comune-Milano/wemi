import { LUNEDI, MARTEDI, MERCOLEDI, GIOVEDI, VENERDI, SABATO, DOMENICA } from 'components/ui2/WeekCalendarTimePicker/utils/constants';
import yup from 'libs/Form/validation/yup';
import {
  emailRegex,
  regexUrl,
  capRegex,
  ibanRegex,
} from 'libs/Form/validation/regex';

export const keysSection = {
  institutionSection: 'institutionSection',
  operatorsSection: 'operatorsSection',
  descriptionSection: 'descriptionSection',
  attachmentsSection: 'attachmentsSection',
  primaryOfficeSection: 'primaryOfficeSection',
  secondaryOfficesSection: 'secondaryOfficesSection',
  contactPersonSection: 'contactPersonSection',
  citizenAvailabilitySection: 'citizenAvailabilitySection',
  othersInfoSection: 'othersInfoSection',
  merchantSection: 'merchantSection',
  paymentInfoSection: 'paymentInfoSection',
};

export const defaultCalendar = {
  [LUNEDI.value]: [],
  [MARTEDI.value]: [],
  [MERCOLEDI.value]: [],
  [GIOVEDI.value]: [],
  [VENERDI.value]: [],
  [SABATO.value]: [],
  [DOMENICA.value]: [],
};

export const isIban = (iban) => {
  if (iban) {
    const newString = iban.substring(4, iban.length) + iban.substring(0, 4);
    const numeric = Array.from(newString).map(c => (Number.isNaN(parseInt(c, 10)) ? (c.charCodeAt(0) - 55).toString() : c)).join('');
    const remainder = Array.from(numeric).map(c => parseInt(c, 10)).reduce((remainder, value) => (remainder * 10 + value) % 97, 0);

    return remainder === 1;
  } return true;
};

export const isEmpty = (value) => value && !(value.trim() === '');

export const attachmentsSectionSchema = {
  facebookLink: yup.string()
    .nullable()
    .notRequired()
    .test('facebookLink', 'Inserisci un link valido.', (value) => {
      if (value) {
        const schema = yup.string().matches(regexUrl);
        return schema.isValidSync(value);
      }
      return true;
    }),
  instagramLink: yup.string()
    .nullable()
    .notRequired()
    .test('instagramLink', 'Inserisci un link valido.', (value) => {
      if (value) {
        const schema = yup.string().matches(regexUrl);
        return schema.isValidSync(value);
      }
      return true;
    }),
  logo: yup.object().shape({
    file: yup.string()
      .nullable()
      .required('Il campo è obbligatorio'),
    name: yup.string()
      .nullable()
      .required(),
    type: yup.string()
      .nullable()
      .required(),
  }),
  twitterLink: yup.string()
    .nullable()
    .notRequired()
    .test('twitterLink', 'Inserisci un link valido.', (value) => {
      if (value) {
        const schema = yup.string().matches(regexUrl);
        return schema.isValidSync(value);
      }
      return true;
    }),
  webLink: yup.string()
    .nullable()
    .notRequired()
    .test('webLink', 'Inserisci un link valido.', (value) => {
      if (value) {
        const schema = yup.string().matches(regexUrl);
        return schema.isValidSync(value);
      }
      return true;
    }),
  youtubeLink: yup.string()
    .nullable()
    .notRequired()
    .test('youtubeLink', 'Inserisci un link valido.', (value) => {
      if (value) {
        const schema = yup.string().matches(regexUrl);
        return schema.isValidSync(value);
      }
      return true;
    }),
};

export const fixedSchema = {
  attachmentsSection: yup.object().shape({
    facebookLink: yup.string()
      .nullable()
      .notRequired()
      .test('facebookLink', 'Inserisci un link valido.', (value) => {
        if (value) {
          const schema = yup.string().matches(regexUrl);
          return schema.isValidSync(value);
        }
        return true;
      }),
    instagramLink: yup.string()
      .nullable()
      .notRequired()
      .test('instagramLink', 'Inserisci un link valido.', (value) => {
        if (value) {
          const schema = yup.string().matches(regexUrl);
          return schema.isValidSync(value);
        }
        return true;
      }),
    twitterLink: yup.string()
      .nullable()
      .notRequired()
      .test('twitterLink', 'Inserisci un link valido.', (value) => {
        if (value) {
          const schema = yup.string().matches(regexUrl);
          return schema.isValidSync(value);
        }
        return true;
      }),
    webLink: yup.string()
      .nullable()
      .notRequired()
      .test('webLink', 'Inserisci un link valido.', (value) => {
        if (value) {
          const schema = yup.string().matches(regexUrl);
          return schema.isValidSync(value);
        }
        return true;
      }),
    youtubeLink: yup.string()
      .nullable()
      .notRequired()
      .test('youtubeLink', 'Inserisci un link valido.', (value) => {
        if (value) {
          const schema = yup.string().matches(regexUrl);
          return schema.isValidSync(value);
        }
        return true;
      }),
  }),
  citizenAvailabilitySection: yup.object().shape({
    citizenAvailability: yup.object().shape({
      calendario: yup.object()
        .test('calendario', 'Selezionare almeno una fascia oraria.', (value) => {
          const calendar = value || [];
          const arrayCalendar = Object.values(calendar);
          let validCalendar = false;
          arrayCalendar.forEach(element => {
            if (element.length > 0) {
              validCalendar = true;
            }
          });
          return validCalendar;
        }),
      email: yup.string()
        .nullable()
        .required()
        .test('email', 'Inserisci un indirizzo e-mail valido.', (value) => {
          if (value) {
            const schema = yup.string().matches(emailRegex);
            return schema.isValidSync(value);
          }
          return true;
        }),
      phoneNumber: yup.string()
        .nullable()
        .required(),
    }),
  }),
  contactPersonSection: yup.object().shape({
    contactPerson: yup.object().shape({
      email: yup.string()
        .nullable()
        .required()
        .test('email', 'Inserisci un indirizzo e-mail valido.', (value) => {
          if (value) {
            const schema = yup.string().matches(emailRegex);
            return schema.isValidSync(value);
          }
          return true;
        }),
      name: yup.string()
        .nullable()
        .required(),
      phoneNumber: yup.string()
        .nullable()
        .required(),
      secondaryEmail: yup.string()
        .nullable()
        .test('email', 'Inserisci un indirizzo e-mail valido.', (value) => {
          if (value) {
            const schema = yup.string().matches(emailRegex);
            return schema.isValidSync(value);
          }
          return true;
        }),
      secondaryPhoneNumber: yup.string()
        .nullable(),
    }),

  }),
  descriptionSection: yup.object().shape({
    description: yup.string()
      .nullable()
      .required(),
  }),
  operatorsSection: yup.object().shape({
    email: yup.string()
      .notRequired()
      .test('email', 'Inserisci un indirizzo e-mail valido.', (value) => {
        if (value) {
          const schema = yup.string().matches(emailRegex);
          return schema.isValidSync(value);
        }
        return true;
      }),
  }),
  othersInfoSection: yup.object().shape({
    othersInfo: yup.object().shape({
      volunteerAvailability: yup.bool()
        .nullable(),
      welfareAvailability: yup.bool()
        .nullable(),
    }),
  }),
  primaryOfficeSection: yup.object().shape({
    address: yup.object()
      .shape({
        txCAP: yup.string()
          .nullable()
          .required()
          .matches(capRegex, 'Il campo è composto da 5 numeri.'),
        txCitta: yup.string()
          .required()
          .nullable(),
        txIndirizzo: yup.string()
          .required()
          .nullable(),
        txProvincia: yup.string()
          .required()
          .nullable(),
          // .min(2, 'Il campo è composto da 2 caratteri.')
          // .max(2, 'Il campo è composto da 2 caratteri.'),
      }),
  }),
  secondaryOfficesSection: yup.object().shape({
    name: yup.string(),
    secondaryLocations: yup.array(
      yup.object().shape({
        address: yup.object()
          .shape({
            txCAP: yup.string()
              .required()
              .nullable()
              .matches(capRegex, 'Il campo è composto da 5 numeri.'),
            txCitta: yup.string()
              .required()
              .nullable(),
            txIndirizzo: yup.string()
              .required()
              .nullable(),
            txProvincia: yup.string()
              .required()
              .nullable(),
              // .min(2, 'Il campo è composto da 2 caratteri.')
              // .max(2, 'Il campo è composto da 2 caratteri.'),
          }),
      })
    ),
  }),
  paymentInfoSection: yup.object().shape({
    paymentInfo: yup.object().shape({
      accountHolder: yup.string().nullable()
      .when(['iban', 'bankName', 'branchDescription'], {
        is: (iban, bankName, branchDescription) => isEmpty(iban) || isEmpty(bankName) || isEmpty(branchDescription),
        then: yup.string().test('accountHolder', 'Inserire nome del proprietario del conto', (value) => isEmpty(value)).required('Inserire nome del proprietario del conto'),
      }),
      bankName: yup.string().nullable()
      .when(['iban', 'accountHolder', 'branchDescription'], {
        is: (iban, accountHolder, branchDescription) => isEmpty(iban) || isEmpty(accountHolder) || isEmpty(branchDescription),
        then: yup.string().test('bankName', 'Inserire nome della banca', (value) => isEmpty(value)).required('Inserire nome della banca'),
      }),
      branchDescription: yup.string().nullable()
      .when(['iban', 'accountHolder', 'bankName'], {
        is: (iban, accountHolder, bankName) => isEmpty(iban) || isEmpty(accountHolder) || isEmpty(bankName),
        then: yup.string().test('branchDescription', 'Inserire descrizione della banca', (value) => isEmpty(value)).required('Inserire descrizione della banca'),
      }),
      iban: yup.string().nullable()
      .test('iban', 'Inserisci un IBAN valido', (value) => {
        if (value) {
          const schema = yup.string().matches(ibanRegex);
          return schema.isValidSync(value);
        }
        return true;
      })
      .test('iban', 'Inserisci un IBAN valido', (value) => isIban(value))
      .when(['accountHolder', 'bankName', 'branchDescription'], {
        is: (accountHolder, bankName, branchDescription) => isEmpty(accountHolder) || isEmpty(bankName) || isEmpty(branchDescription),
        then: yup.string().required('Inserisci un IBAN valido')
        .test('iban', 'Inserisci un IBAN valido', (value) => isEmpty(value)),
      }),
    }, [
     ['accountHolder', 'bankName'],
     ['accountHolder', 'iban'],
     ['accountHolder', 'branchDescription'],
     ['bankName', 'iban'],
     ['bankName', 'branchDescription'],
     ['branchDescription', 'iban']]),
  }),
};
