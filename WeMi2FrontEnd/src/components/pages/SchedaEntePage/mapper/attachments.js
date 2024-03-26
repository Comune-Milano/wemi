
export const parseAttachmentsSection = (response) => {
  if (!response) {
    return {};
  }
  const files = response.documents || [];
  const documents = { };
  const filesRequired = [
    'CONDIZIONI_UTILIZZO',
    'PRIVACY_POLICY',
    'MODULO_RECESSO',
  ];
  files.forEach((file, index) => {
    let isRequired = false;
    if (filesRequired.indexOf(file.domain) > -1) {
      isRequired = true;
    }
    if (!file.fieldName) {
      const fieldName = `Documento ${(index + 1).toString()}`;
      documents[fieldName] = {
        ...file,
        fieldName,
        isRequired,
        file: file.storagePath,
      };
    } else {
      documents[file.fieldName] = {
        ...file,
        isRequired,
        file: file.storagePath,
      };
    }
  });
  return {
    ...response.socials,
    note4: response.note4,
    documents,
    logo: {
      ...response.logo,
      file: response.logo?.storagePath,
    },
  };
};
