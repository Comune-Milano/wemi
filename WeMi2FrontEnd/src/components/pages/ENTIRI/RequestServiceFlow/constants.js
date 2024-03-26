import * as yup from 'yup';

export const SERVICES_TOKEN_STORAGE_KEY = 'wemiServicesFlowStt';

export const requestServiceFormInitialDataset = (isYoung) => ({
  fromDay: new Date(),
  toDay: new Date(),
  messaggioAgliEnti: '',
  infoDisp: isYoung ? 2 : 1,
});

export const requestServiceFormValidationSchema = yup.object().shape({
  fromDay: yup
    .date()
    .typeError('Formato errato')
    .required(),
  infoDisp: yup
    .number()
    .typeError('Formato errato')
    .required('Inserire un numero')
    .positive('Inserire un numero positivo')
    .integer('Inserire un numero'),
  messaggioAgliEnti: yup
    .string().when('infoDisp', {
      is: 2,
      then: yup.string().required('Inserire un messaggio'),
      otherwise: yup.string(),
    }),
  toDay: yup.date()
    // .min(yup.ref('fromDay'),'Inserire una data più grande')
    .typeError('Formato errato')
    .required()
    .when(
      'fromDay',
      (fromDay, formvalidationSchema) => (fromDay && formvalidationSchema.min(fromDay, 'Inserire una data maggiore della precedente'))
    ),
});
