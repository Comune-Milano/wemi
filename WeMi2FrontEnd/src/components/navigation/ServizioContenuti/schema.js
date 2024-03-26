import yup from 'libs/Form/validation/yup';

export default yup.object().shape({
  accreditationCategory: yup.number().required('Il campo è obbligatorio'),
  code: yup.string().notRequired().nullable().max(10, 'Il campo è al massimo di 10 caratteri'),
  description: yup.string().notRequired(),
  order: yup.number().required('Il campo è obbligatorio'),
  priceUnit: yup.number().required('Il campo è obbligatorio'),
  title: yup.string().required('Il campo è obbligatorio'),
});
