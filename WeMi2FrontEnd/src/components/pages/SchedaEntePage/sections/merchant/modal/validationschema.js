import yup from 'libs/Form/validation/yup';
import moment from 'moment';

export const validationSchema = yup.object().shape({
  endDate: yup.date()
    .min(
      moment().startOf('day').toDate(),
      'La data non può essere precedente alla giornata attuale'
    )
    .typeError('Il campo deve essere una data.')
    .nullable(),
  id: yup.string()
    .required(),
  privateKey: yup.string()
    .required(),
  publicKey: yup.string()
    .required(),
  startDate: yup
    .date()
    .required()
    .when('endDate', (endDate, schema, startDate) => {
      if (endDate && moment(startDate.value).isSameOrAfter(moment(endDate), 'days')) {
        return schema.test(
          'startDate',
          null,
          () => (new yup.ValidationError(
            'La data di inizio deve essere precedente a quella di fine',
            null,
            'startDate',
          )),
        );
      }
      return schema;
    })
    .typeError('Il campo deve essere una data'),
});
