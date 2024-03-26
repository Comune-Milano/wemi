import yup from 'libs/Form/validation/yup';
import {
  fixedSchema,
  attachmentsSectionSchema,
} from './constants';

export const createValidationSchema = (dataset = {}) => {
  const { attachmentsSection = {} } = dataset;
  const { documents = {} } = attachmentsSection;
  const validationDocuments = Object.values(documents).map(document => {
    const { isRequired } = document;
    if (isRequired) {
      return {
        fieldName: document.fieldName,
        schema: yup.object().shape({
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
      };
    }
    return {
      fieldName: document.fieldName,
      schema: yup.object().shape({
        file: yup.string()
          .nullable()
          .notRequired(),
        name: yup.string()
          .nullable()
          .notRequired(),
        type: yup.string()
          .nullable()
          .notRequired(),
      }),
    };
  });

  const resultSchema = Object.assign({}, fixedSchema);
  const attachmentsSchema = Object.assign({}, attachmentsSectionSchema);
  const files = {};
  validationDocuments.forEach(documentSchema => {
    files[documentSchema.fieldName] = documentSchema.schema;
  });

  attachmentsSchema.documents = yup.object().shape(files).nullable();

  resultSchema.attachmentsSection = yup.object().shape(attachmentsSchema);

  return yup.object().shape(resultSchema);
};
