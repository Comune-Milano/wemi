import yup from 'libs/Form/validation/yup';

export default yup.object().shape({
  code: yup.string().notRequired().nullable().max(10, 'Il campo è al massimo di 10 caratteri'),
  media1: yup.object().shape({
    file: yup.string().nullable().required('Il campo è obbligatorio'),
  }),
  order: yup.number().required('Il campo è obbligatorio'),
  subtitle: yup.string().required('Il campo è obbligatorio'),
  title: yup.string().required('Il campo è obbligatorio'),
});
