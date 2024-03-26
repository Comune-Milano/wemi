import yup from 'libs/Form/validation/yup';
import moment from 'moment';

//Form validation

export const validationSchema = yup.object().shape({
  fineValiditaInputValue: yup.string()
    .typeError('Formato errato')
    .nullable(),
  inizioValiditaInputValue: yup.string()
    .typeError('Formato errato')
    .nullable(),
  fineValidita: yup.date()
    .typeError('Formato errato')
    .when(
      'inizioValidita', (inizioValidita, schema) => {
        if (inizioValidita) {
          return schema.min(inizioValidita, "La data fine non può precedere la data inizio.");
        }
        return schema.nullable();
      }
    )
    .nullable()
    .when('fineValiditaInputValue', (fineValiditaInputValue, schema) => {
      if (fineValiditaInputValue && !moment(fineValiditaInputValue, "DD/MM/YYYY", true).isValid()) {
        return schema.required('Formato errato')
      }
      return schema.nullable();
    }),
  inizioValidita: yup.date()
    .typeError('Formato errato')
    .nullable()
    .when(['inizioValiditaInputValue'], (inizioValiditaInputValue) => {
      if (inizioValiditaInputValue && !moment(inizioValiditaInputValue, "DD/MM/YYYY", true).isValid()) {
        return yup.date().required('Formato errato')
      }
      return yup.date().nullable();
    }),
});

//Initial item for select authorizations
export const EMPTY_SELECT_ITEM = { id: undefined, value: '' };