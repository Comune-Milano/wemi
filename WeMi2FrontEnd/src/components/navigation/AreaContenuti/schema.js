import yup from 'libs/Form/validation/yup';

export default yup.object().shape({
  code: yup.string().notRequired().nullable().max(10, 'Il campo è al massimo di 10 caratteri'),
  order: yup.number().required('Il campo è obbligatorio'),
  title: yup.string().required('Il campo è obbligatorio'),
});
