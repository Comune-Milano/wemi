export const transformDocuments = (documents) => {
  if (!documents || !(Object.values(documents).length > 0)) {
    return [];
  }
  const toTransformDoc = Object.assign({}, documents);

  const transformedDocuments = Object.values(toTransformDoc).map(doc => ({
    fieldName: doc.fieldName,
    blob: doc.file,
    name: doc.name,
    mime: doc.type,
    id: doc.id,
    domain: doc.domain,
  }));
  return transformedDocuments;
};
